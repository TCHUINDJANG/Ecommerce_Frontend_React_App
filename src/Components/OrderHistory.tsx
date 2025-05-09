import React from 'react';
import './OrderHistory.css';
import { Order } from '../api/types';





interface OrderHistoryProps {
  orders: Order[];
  className?: string; // Ajoutez cette ligne
}

const OrderHistory: React.FC<OrderHistoryProps> = ({ orders, className }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'status-delivered';
      case 'shipped':
        return 'status-shipped';
      case 'processing':
        return 'status-processing';
      case 'pending':
        return 'status-pending';
      case 'cancelled':
        return 'status-cancelled';
      default:
        return 'status-default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'Livré';
      case 'shipped':
        return 'Expédié';
      case 'processing':
        return 'En traitement';
      case 'pending':
        return 'En attente';
      case 'cancelled':
        return 'Annulé';
      default:
        return status;
    }
  };

  const formatPrice = (price: string | number) => {
    const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
    return numericPrice.toFixed(2) + ' €';
  };

  return (
    <div className="order-history">
      <h2>Historique des commandes</h2>
      
      {!orders || orders.length === 0 ? (
        <div className="no-orders">
          <p>Vous n'avez pas encore passé de commande.</p>
        </div>
      ) : (
        <div className="orders-container">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <h3>Commande #{order.id}</h3>
                <div className="order-meta">
                  <span className="order-date">{formatDate(order.created_at)}</span>
                  <span className={`status-badge ${getStatusColor(order.status)}`}>
                    {getStatusText(order.status)}
                  </span>
                </div>
              </div>

              <div className="order-details">
                <div className="detail-row">
                  <span>Total:</span>
                  <span>{formatPrice(order.total)}</span>
                </div>
                
                <div className="detail-row">
                  <span>Méthode de paiement:</span>
                  <span>{order.payment_method || 'Non spécifiée'}</span>
                </div>
                
                <div className="detail-row">
                  <span>Statut paiement:</span>
                  <span>{order.status ? 'Payé' : 'Non payé'}</span>
                </div>
              </div>

              {order.promotion && (
                <div className="promotion-info">
                  <span>Promotion appliquée:</span>
                  <span>{order.promotion.name} (-{order.promotion.discount_value} €)</span>
                </div>
              )}

              <div className="products-section">
                <h4>Produits</h4>
                {order.items && order.items.length > 0 ? (
                  <div className="products-grid">
                    {order.items.map((item, index) => (
                      <div key={index} className="product-item">
                        {item.product ? (
                          <>
                            <img
                              src={item.product.image || '/placeholder-product.png'}
                              alt={item.product.name}
                              className="product-image"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = '/placeholder-product.png';
                              }}
                            />
                            <span className="product-name">{item.product.name}</span>
                          </>
                        ) : (
                          <span>Produit indisponible</span>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="no-products">Aucun produit dans cette commande</p>
                )}
              </div>

              <div className="order-addresses">
                <div className="address">
                  <h4>Adresse de livraison</h4>
                  <p>{order.shipping_address.city || 'Non spécifiée'}</p>
                </div>
                <div className="address">
                  <h4>Adresse de facturation</h4>
                  <p>{order.billing_address.city || 'Non spécifiée'}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;