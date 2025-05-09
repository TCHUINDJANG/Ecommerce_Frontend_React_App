import React, { createContext, useContext, useState, useCallback } from 'react';

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface WishlistContextType {
  wishlistItems: WishlistItem[];
  wishlistCount: number;
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: string) => void;
  isInWishlist: (id: string) => boolean;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType>({} as WishlistContextType);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);

  // Ajouter un produit à la wishlist
  const addToWishlist = useCallback((item: WishlistItem) => {
    setWishlistItems(prev => {
      // Vérifie si le produit est déjà dans la wishlist
      if (prev.some(i => i.id === item.id)) {
        return prev;
      }
      return [...prev, item];
    });
  }, []);

  // Retirer un produit de la wishlist
  const removeFromWishlist = useCallback((id: string) => {
    setWishlistItems(prev => prev.filter(item => item.id !== id));
  }, []);

  // Vérifier si un produit est dans la wishlist
  const isInWishlist = useCallback((id: string) => {
    return wishlistItems.some(item => item.id === id);
  }, [wishlistItems]);

  // Vider complètement la wishlist
  const clearWishlist = useCallback(() => {
    setWishlistItems([]);
  }, []);

  const wishlistCount = wishlistItems.length;

  return (
    <WishlistContext.Provider value={{
      wishlistItems,
      wishlistCount,
      addToWishlist,
      removeFromWishlist,
      isInWishlist,
      clearWishlist
    }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};