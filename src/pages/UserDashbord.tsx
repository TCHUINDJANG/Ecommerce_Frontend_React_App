import React, { useState, useEffect } from 'react';
import { getOrders } from '../api/orderAPI';
import { fetchUserProfile } from '../api/authAPI';
// import { fetchStatsApi } from '../api/StatsApi';
import { User , Order } from '../api/types';


import UserProfile from '../Components/UserProfile';
import OrderHistory from '../Components/OrderHistory';
// import DashboardCard from '../Components/DashbordCard';
import './UserDashboard.css';

const UserDashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
//   const [stats, setStats] = useState<DashbordStats | null>(null);
  const [activeTab, setActiveTab] = useState<'profile' | 'orders'>('profile');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [userData, ordersData] = await Promise.all([
            fetchUserProfile(),
          getOrders(),
        //   fetchStatsApi()
        ]);
        
        setUser(userData);
        setOrders(ordersData);
        // setStats(statsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="dashboard-loading">Loading...</div>;
  if (error) return <div className="dashboard-error">{error}</div>;
  if (!user) return <div className="dashboard-error">User not found</div>;

  return (
    <div className="user-dashboard">
      <div className="dashboard-container">
        {/* Header */}
        <div className="dashboard-header">
          <h1>Mon Tableau de Bord</h1>
          <p>Bienvenue, {user.first_name} ! Voici votre activité récente.</p>
        </div>

        {/* Stats Cards */}
        {/* {stats && (
          <div className="dashboard-stats">
            <DashboardCard 
              title="Commandes totales" 
              value={stats.totalOrders.toString()} 
              icon="📦"
            />
            <DashboardCard 
              title="Commandes en cours" 
              value={stats.pendingOrders.toString()} 
              icon="⏳"
            />
            <DashboardCard 
              title="Total dépensé" 
              value={`${stats.totalSpent.toFixed(2)} €`} 
              icon="💶"
            />
            <DashboardCard 
              title="Catégorie préférée" 
              value={stats.favoriteCategory || "N/A"} 
              icon="❤️"
            />
          </div>
        )} */}

        {/* Navigation */}
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
            Mes Commandes ({orders.length})
          </button>
        </div>

        {/* Content */}
        <div className="dashboard-content">
          {activeTab === 'profile' ? (
            <UserProfile user={user} onUpdate={setUser} />
          ) : (
            <OrderHistory orders={orders} />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;