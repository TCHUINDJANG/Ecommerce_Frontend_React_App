import React from 'react';
import {  User } from '../api/types';

interface CustomerDetailsProps {
  user: User;
}

const CustomerDetails: React.FC<CustomerDetailsProps> = ({ user }) => {
  return (
    <div className="customer-details">
      <div className="detail-group">
        <h3>Informations personnelles</h3>
        <p>{user.first_name} {user.last_name}</p>
        <p>{user.email}</p>
      </div>

      <div className="detail-group">
        <h3>Adresse de livraison</h3>
        <address>
          {user.shipping_address.city}<br />
          {user.shipping_address.country} {user.shipping_address.city}<br />
          {user.shipping_address.city}
        </address>
      </div>

      {user.billing_address && (
        <div className="detail-group">
          <h3>Adresse de facturation</h3>
          <address>
            {user.billing_address.street}<br />
            {user.billing_address.street} {user.billing_address.city}<br />
            {user.billing_address.country}
          </address>
        </div>
      )}
    </div>
  );
};

export default CustomerDetails;