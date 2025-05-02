import React, { createContext, useContext, useState } from 'react';
import { Cart, Product } from '../api/types';


interface CartItem {
  productId:number;
  quantity:number;
  product:Product;
}

interface CartContextType {
  cartItems: CartItem[]; // Remplacez 'any' par votre type d'article
  addToCart: (product: any , quantity: number) => void;
  removeFromCart: (productId: number) => void;
  refreshCart: () => void; // Ajoutez cette ligne
  cartItemsCount: number;
//   updateQuantity: (productId: number, newQuantity: number) => void;
    cardTotal: number;
  
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<any[]>([]);



  const addToCart = (product: Product , quantity: number) => {
    setCartItems(prevItems => {
        const existingItem = prevItems.find(item =>item.productId ==product.id);

        if(existingItem) {
            return prevItems.map(item => 
                item.productId === product.id ?
                { ...item , quantity: item.quantity + quantity }: item
            );
        } else {
            return [...prevItems , { productId: product.id, quantity, product }];
        }
    });
  };


  const cartItemsCount = cartItems.reduce((total, item) => total +item.quantity , 0);

  const cardTotal = cartItems.reduce(
    (total , item) => total + (item.quantity * item.product.current_price) , 0);
  

  const removeFromCart = (productId: number) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };


  // Ajoutez cette fonction
  const refreshCart = async () => {
    try {
      // Implémentez la logique pour rafraîchir le panier
      // Par exemple :
      // const updatedCart = await fetchCart();
      // setCartItems(updatedCart);
    } catch (error) {
      console.error('Error refreshing cart:', error);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems,  removeFromCart , refreshCart ,cartItemsCount , addToCart , cardTotal}}>
      {children}
    </CartContext.Provider>
  );
};

// Exportez explicitement le hook useCart
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};