import React, {  useState } from "react";
import { CartItem } from "../api/types";
import './CartItemComponent.css';




interface CartItemProps {
    item: CartItem;
    onUpdateQuantity: (itemId: number, quantity: number) => void;
    onRemove: (itemId: number) => void;
}


const CartItemComponent:React.FC<CartItemProps> = ({ item, onUpdateQuantity, onRemove}) => {
    const [quantity, setQuantity] = useState(item.quantity);



    const handleQuantity = (value:number) => {
        if (value > 0) {
            setQuantity(value)
            onUpdateQuantity(item.id , value)
        }
    };

    return (
        <div className="cart-item">
          <img src={item.product.image} alt={item.product.name} className="item-image" />
          <div className="item-details">
            <h3>{item.product.name}</h3>
            <p>€{item.price}</p>
            <div className="quantity-controls">
              <button onClick={() => handleQuantity(quantity - 1)}>-</button>
              <span>{quantity}</span>
              <button onClick={() => handleQuantity(quantity + 1)}>+</button>
            </div>
          </div>
          <button onClick={() => onRemove(item.id)} className="remove-btn">
            ×
          </button>
        </div>
      );
    };


export default CartItemComponent
    


