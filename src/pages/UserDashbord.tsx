import React, { useState, useEffect } from 'react';
import { getOrdersResponse } from '../api/orderAPI';
import { fetchUserProfile } from '../api/authAPI';
import { User, OrdersResponse } from '../api/types';
import UserProfile from '../Components/UserProfile';
import OrderHistory from '../Components/OrderHistory';
import './UserDashboard.css';
import { useNavigate } from 'react-router-dom';

const UserDashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [ordersResponse, setOrdersResponse] = useState<OrdersResponse | null>(null);
  const [activeTab, setActiveTab] = useState<'profile' | 'orders'>('profile');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem('access_token');
        if (!token) {
          navigate('/login');
          return;
        }

        const [userData, ordersData] = await Promise.all([
          fetchUserProfile().catch(err => {
            throw new Error(`Failed to fetch user profile: ${err.message}`);
          }),
          getOrdersResponse().catch(err => {
            throw new Error(`Failed to fetch orders: ${err.message}`);
          })
        ]);

        if (!userData) {
          throw new Error('User data not found');
        }

        setUser(userData);
        setOrdersResponse(ordersData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        if (err instanceof Error && err.message.includes('authentication')) {
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const renderContent = () => {
    if (loading) {
      return <div className="dashboard-loading">Loading...</div>;
    }

    if (error) {
      return <div className="dashboard-error">{error}</div>;
    }

    if (!user) {
      return <div className="dashboard-error">User not found</div>;
    }

    return (
      <>    
        <div className="dashboard-header">
          <h1>Mon Tableau de Bord</h1>
          <p>Bienvenue, {user?.user.first_name || 'Utilisateur'} ! Voici votre activité récente.</p>
        </div>

        <div className="dashboard-tabs">
          <button
            onClick={() => setActiveTab('profile')}
            className={activeTab === 'profile' ? 'active' : ''}
          >
            Profil
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={activeTab === 'orders' ? 'active' : ''}
          >
            Mes Commandes ({ordersResponse?.results?.length || 0})
          </button>
        </div>


        <div className="dashboard-content">
        <UserProfile user={user} onUpdate={setUser} />
        {activeTab === 'profile' && <OrderHistory orders={ordersResponse?.results || []} />}
</div>
      </>
    );
  };

  return (
    <div className="user-dashboard">
      <div className="dashboard-container">
        {renderContent()}
      </div>
    </div>
  );
};

export default UserDashboard;