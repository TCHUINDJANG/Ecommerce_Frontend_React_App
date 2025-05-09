import React , { useEffect , useState} from "react";
import { CartItem } from "../api/types";
import { removeFormCart , updateCartItem , fetchCart } from "../api/cartAPI";
import CartItemComponent from "../Components/CartItemComponent";
import { CartResponse } from "../api/types";
import './cart.css';
import { fetchProductById } from "../api/productAPI";





const Cart:React.FC = () => {
  const [cart, setCart] = useState<CartResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    useEffect(()  => {
        const loadCart = async () => {
            try {
                const cartData = await fetchCart();
                console.log("Données du panier reçues:", cartData)

                if (!cartData){
                  setError('Impossible de charger le panier');
                  return ;
                }  


                const itemsWithProducts = await Promise.all(
                  cartData.items.map(async (item) => {
                    const productDetails = await fetchProductById(item.product.id);
                    return {
                      ...item , 
                      product:productDetails,
                      unit_price: productDetails.price
                    };
                  })
                );
                setCart({
                  ...cartData,
                  items:itemsWithProducts
                  
                }); 
            } catch (error) {
                console.error('Failed to load cart', error);
                setError('Failed to load cart. Please try again later.');
            } finally {
                setLoading(false);
            }
        };
        loadCart();
    } , []);




    

    const handleUpdateQuantity = async (itemId: number, quantity: number) => {
      try {
          await updateCartItem(itemId, quantity);
          if (cart) {
              setCart({
                  ...cart,
                  items: cart.items.map(item => 
                      item.id === itemId ? { ...item, quantity } : item
                  )
              });
          }
      } catch (error) {
          console.error('Failed to update item', error);
      }
  };

  const handleRemoveItem = async (itemId: number) => {
    try {
        await removeFormCart(itemId);
        if (cart) {
            setCart({
                ...cart,
                items: cart.items.filter(item => item.id !== itemId)
            });
        }
    } catch (error) {
        console.error('Failed to remove item', error); 
    }
};


    if (loading) return <div className="loading-spinner">Loading cart...</div>; 
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="cart-container">
      <h2>Votre Panier</h2>
      {!cart  ? (
        <p>Votre panier est vide</p>
      ) : (
        <>
          <div className="cart-items">
            {cart.items.map(item => (
              <CartItemComponent
                key={item.id}
                item={item}
                onUpdateQuantity={handleUpdateQuantity}
                onRemove={handleRemoveItem}
              />
            ))}
          </div>
          <div className="cart-summary">
            <h3>
              Total: €{cart.total_price.toFixed(2)}
            </h3>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
    
