import React from 'react';
import { Order } from '../api/types';

interface OrderSummaryProps {
  order: Order;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ order }) => {
  return (
    <div className="order-summary">
      <ul className="order-items">
        {order.items.map((item) => (
          <li key={item.id} className="order-item">
            <div className="item-image">
              {item.product.image && (
                <img 
                  src={item.product.image} 
                  alt={item.product.name} 
                  width="60" 
                  height="60" 
                />
              )}
            </div>
            <div className="item-details">
              <span className="item-name">{item.product.name}</span>
              <span className="item-quantity">x{item.quantity}</span>
            </div>
            <span className="item-price">€{(item.price * item.quantity).toFixed(2)}</span>
          </li>
        ))}
      </ul>

      <div className="order-totals">
        <div className="total-row">
          <span>Sous-total:</span>
          <span>€{order.subtotal.toFixed(2)}</span>
        </div>
        <div className="total-row">
          <span>Frais de livraison:</span>
          <span>€{order.shipping_cost.toFixed(2)}</span>
        </div>
        <div className="total-row">
          <span>Taxes:</span>
          <span>€{order.tax.toFixed(2)}</span>
        </div>
        <div className="total-row grand-total">
          <span>Total:</span>
          <span>€{order.total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;