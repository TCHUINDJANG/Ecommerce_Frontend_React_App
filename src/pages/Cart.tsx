import React, {useEffect , useState} from "react";
import { fetchCart , updateCartItem , removeFormCart } from "../../api/cartAPI";
import { CartItem } from '../api/types';
import ErrorMessage from '../Components/common/ErrorMessage';
import CartItemComponent from '../Components/cart/CartItem';
// import CartSummary from '../Components/cart/CartSummary';
import {Link} from 'react-router-dom';
import LoadingSpinner from "../Components/common/LoadingSpinner";




const Cart: React.FC = () => {
    const [cartItems , setCartItems] = useState<CartItem[]>([]);
    const [loading , setLoading] = useState(true);
    const [error , setError] = useState<string | null>(null);


    useEffect(() => {
        const loadCart = async () => {
            try {
                const items = await fetchCart();
                setCartItems(items);
            } catch (error) {
               setError(err instanceof Error ? err.message: 'Failed to load cart'); 
            } finally {
                setLoading(false);
            }
        };

        loadCart();
    } , []);

    
    const handleUpdateQuantity = async (itemId:number , newQuantity:number) => {
        try {
            const updateItem = await updateCartItem(itemId , newQuantity);
            setCartItems(cartItems.map(item => 
                item.id === itemId ? updateItem : item
             ));
        } catch (error) {
            console.error('Error updating cart item' , error);
        }
    };


    const handleRemoveItem = async (itemId : number) => {
        try {
            await removeFormCart(itemId);
            setCartItems(cartItems.filter(item => item.id !== itemId))
        } catch (error) {
            console.error('Error removing cart item' , error);
        }
    };


    if (loading) return <LoadindSpinner />;
    if (error) return <ErrorMessage message={error} />


    return (
        <div className="cart-container">
            <h1 className="cart-title">Votre Panier</h1>

          {cartItems.length === 0 ? (
            <div className="empty-card">
                <p className="text">Your cart is empty</p>
                <Link
                to="/"
                className="text-link">
                    Continuer a ajouter dans le panier
                </Link>
          ) : (
            <div className="card_grid">
                <div className="col_grid">
                    {cartItems.map(item => (
                       <CartItemComponent
                       key={item.id}
                       item={item}
                       onUpdateQuantity={handleUpdateQuantity}
                       onRemove= {handleRemoveItem} />
                    ))}
                </div>
            </div>
            <CartSummary items={cartItems} />
            <Link
            to="/checkout"
            className="checkout">
                Proceded to checkout
            </Link>
            </div>
            
          )}
        </div>
    );
};

export default Cart;

