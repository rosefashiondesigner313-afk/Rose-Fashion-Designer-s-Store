'use client';

import { createContext, useContext, useState, useEffect } from 'react';

// Cart Item ka type define kiya
type CartItem = {
  id?: string;
  name: string;
  price: number;
  image: string;
  size: string;
  quantity: number;
};

// Context ke andar kya kya hoga, wo bataya
type CartContextType = {
  cartItems: CartItem[];
  cartCount: number;
  addToCart: (item: CartItem) => void;
  removeFromCart: (index: number) => void;
  getCartTotal: () => number;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

// Baki upar ka code same rahega (imports and types)...

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  // NAYA: Ye track karega ki data load hua ya nahi
  const [isLoaded, setIsLoaded] = useState(false); 

  // 1. Pehle LocalStorage se data laao
  useEffect(() => {
    const storedCart = localStorage.getItem('rose_cart');
    if (storedCart) {
      try {
        setCartItems(JSON.parse(storedCart));
      } catch (e) {}
    }
    setIsLoaded(true); // Data aane ke baad isko true kardo
  }, []);

  // 2. Jab bhi cartItems update ho, save karo (PAR SIRF TAB JAB LOAD HO CHUKA HO)
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('rose_cart', JSON.stringify(cartItems));
    }
  }, [cartItems, isLoaded]);

  const cartCount = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);

  const addToCart = (item: CartItem) => {
    setCartItems((prev) => {
      const existingItemIndex = prev.findIndex(
        (i) => i.name === item.name && i.size === item.size
      );

      if (existingItemIndex > -1) {
        const newCart = [...prev];
        newCart[existingItemIndex].quantity += item.quantity;
        return newCart;
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (indexToRemove: number) => {
    setCartItems((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('rose_cart');
  };

  return (
    <CartContext.Provider value={{ cartItems, cartCount, addToCart, removeFromCart, getCartTotal, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

// ... baki niche ka useCart code same rahega

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}