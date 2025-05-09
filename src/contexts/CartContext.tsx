import React, { createContext, useContext, useEffect, useState } from 'react';
import { CartResponse, Product } from '../api/types';
import { fetchCart, addCart, removeFormCart, updateCartItem } from '../api/cartAPI';

interface CartItem {
  id: number; 
  product: Product;
  quantity: number;
  price: number; 
}

interface CartContextType {
  cartItems: CartItem[];
  loading: boolean;
  error: string | null;
  addToCart: (product: Product, quantity: number) => Promise<void>;
  removeFromCart: (itemId: number) => Promise<void>;
  updateQuantity: (itemId: number, quantity: number) => Promise<void>;
  refreshCart: () => Promise<void>;
  cartItemsCount: number;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Calcul des dérivés du panier
const cartItemsCount = cartItems?.reduce((sum, item) => sum + item.quantity, 0) || 0;


const cartTotal = cartItems?.reduce((sum, item) => sum + (item.price * item.quantity), 0) || 0;

  const refreshCart = async () => {
    try {
      setLoading(true);
      // const data = await fetchCart();
      // setCartItems(data.items);
      setError(null);
    } catch (err) {
      setError('Failed to load cart');
      console.error('Error refreshing cart:', err);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (product: Product, quantity: number) => {
    try {
      setLoading(true);
      await addCart(product.id, quantity);
      await refreshCart();
    } catch (err) {
      setError('Failed to add item to cart');
      console.error('Error adding to cart:', err);
    }
  };

  const removeFromCart = async (itemId: number) => {
    try {
      setLoading(true);
      await removeFormCart(itemId);
      await refreshCart();
    } catch (err) {
      setError('Failed to remove item from cart');
      console.error('Error removing from cart:', err);
    }
  };

  const updateQuantity = async (itemId: number, quantity: number) => {
    try {
      setLoading(true);
      await updateCartItem(itemId, quantity);
      await refreshCart();
    } catch (err) {
      setError('Failed to update item quantity');
      console.error('Error updating quantity:', err);
    }
  };

  // Chargement initial du panier
  useEffect(() => {
    refreshCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        loading,
        error,
        addToCart,
        removeFromCart,
        updateQuantity,
        refreshCart,
        cartItemsCount,
        cartTotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};