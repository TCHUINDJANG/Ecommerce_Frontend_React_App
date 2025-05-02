import React from 'react';
import { useCart } from '../../contexts/CartContext';
import styles from './CartDropdown.module.css';

const CartDropdown = () => {
  const { cartItems } = useCart();

  return (
    <div className="dropdown">
      <h3>Votre Panier</h3>
      {cartItems.length === 0 ? (
        <p>Votre panier est vide</p>
      ) : (
        <ul className="itemsList">
          {cartItems.map((item) => (
            <li key={item.product.id} className="item">
              <img 
                src={item.product.image} 
                alt={item.product.name} 
                className={styles.itemImage}
              />
              <div className="itemDetails">
                <span>{item.product.name}</span>
                <span>
                  {item.quantity} × ${item.product.current_price}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
      <button className="checkoutButton">Passer la commande</button>
    </div>
  );
};

export default CartDropdown;