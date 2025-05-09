import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchOrderById} from '../api/orderAPI';
import PaymentForm from '../Components/PaymentForm';
import LoadingSpinner from '../Components/common/LoadingSpinner';
import ErrorMessage from '../Components/common/ErrorMessage';
import './CheckoutConfirmation.css';
import { Order } from '../api/types';
import OrderSummary from '../Components/OrderSummary';
import CustomerDetails from '../Components/CustomerDetails';






const CheckoutConfirmation: React.FC = () => {
    const { orderId } = useParams<{ orderId: string }>();
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();


    useEffect(() => {
        if(!orderId){
            setError('Order ID is missing');
            setLoading(false);
            return;
        }


        const loadOrder = async () => {
            try {
                const orderData = await fetchOrderById(orderId);
                setOrder(orderData)
            } catch (error) {
                setError(error instanceof Error ? error.message : 'Failed to load order');
            } finally {
                setLoading(false);
            }
        };
        loadOrder();
    } , [orderId]);

    if (loading) return <LoadingSpinner />;
    if (error) return <ErrorMessage message={error} onRetry={() => window.location.reload()} />;
    if (!order) return <ErrorMessage message="Order not found" />;



    return (
        <div className="checkout-confirmation">
          <header className="confirmation-header">
            <h1>Merci pour votre commande !</h1>
            <p className="order-number">Numéro de commande: {order.id}</p>
            <div className={`status-badge ${order.status}`}>
              {getStatusText(order.status)}
            </div>
          </header>
    
          <div className="confirmation-grid">
            <section className="order-section">
              <h2>Résumé de votre commande</h2>
              <OrderSummary order={order} />
            </section>
    
            <section className="customer-section">
              <h2>Informations client</h2>
              <CustomerDetails user={order.user} />
            </section>
    
            <section className="payment-section">
              <h2>Méthode de paiement</h2>
              <PaymentForm payment={order.payment} />
            </section>
          </div>
    
          <div className="confirmation-actions">
            <button 
              onClick={() => navigate('/')} 
              className="btn-primary"
            >
              Retour à l'accueil
            </button>
            <button 
              onClick={() => navigate(`/orders/${order.id}/invoice`)} 
              className="btn-secondary"
            >
              Télécharger la facture
            </button>
          </div>
        </div>
      );
    };
// Helper function to translate status
const getStatusText = (status: string): string => {
    const statusMap: Record<string, string> = {
      'pending': 'En attente',
      'processing': 'En traitement',
      'completed': 'Terminée',
      'cancelled': 'Annulée'
    };
    return statusMap[status] || status;
  };


export default CheckoutConfirmation;