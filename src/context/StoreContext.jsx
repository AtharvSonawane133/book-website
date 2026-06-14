import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const StoreContext = createContext(null);

const LS_KEY = 'granthalaya_store_v1';

function safeParse(json, fallback) {
  try {
    const v = JSON.parse(json);
    return v ?? fallback;
  } catch {
    return fallback;
  }
}

export function StoreProvider({ children }) {
  const [cartItems, setCartItems] = useState([]); // {id, qty}
  const [wishlistItems, setWishlistItems] = useState([]); // {id}
  const [auth, setAuth] = useState(null); // {email, phone, name}
  const [toasts, setToasts] = useState([]); // {id, message}

  useEffect(() => {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return;
    const parsed = safeParse(raw, null);
    if (!parsed) return;
    setCartItems(Array.isArray(parsed.cartItems) ? parsed.cartItems : []);
    setWishlistItems(Array.isArray(parsed.wishlistItems) ? parsed.wishlistItems : []);
    setAuth(parsed.auth ?? null);
  }, []);

  useEffect(() => {
    const payload = { cartItems, wishlistItems, auth };
    localStorage.setItem(LS_KEY, JSON.stringify(payload));
  }, [cartItems, wishlistItems, auth]);

  useEffect(() => {
    if (toasts.length === 0) return;
    const t = setTimeout(() => {
      setToasts((prev) => prev.slice(1));
    }, 2500);
    return () => clearTimeout(t);
  }, [toasts]);

  const cartCount = useMemo(
    () => cartItems.reduce((sum, it) => sum + (it.qty || 0), 0),
    [cartItems],
  );

  const wishlistCount = wishlistItems.length;

  function addToCart(id, qty = 1) {
    setCartItems((prev) => {
      const existing = prev.find((p) => p.id === id);
      if (existing) {
        return prev.map((p) => (p.id === id ? { ...p, qty: p.qty + qty } : p));
      }
      return [...prev, { id, qty }];
    });
    setToasts((t) => [...t, { id: Date.now(), message: 'Added to cart' }]);
  }

  function removeFromCart(id) {
    setCartItems((prev) => prev.filter((p) => p.id !== id));
  }

  function setQty(id, qty) {
    const safeQty = Math.max(0, Number(qty || 0));
    setCartItems((prev) => {
      if (safeQty === 0) return prev.filter((p) => p.id !== id);
      const exists = prev.some((p) => p.id === id);
      if (!exists) return [...prev, { id, qty: safeQty }];
      return prev.map((p) => (p.id === id ? { ...p, qty: safeQty } : p));
    });
  }

  function addToWishlist(id) {
    setWishlistItems((prev) => (prev.some((p) => p.id === id) ? prev : [...prev, { id }]));
    setToasts((t) => [...t, { id: Date.now(), message: 'Added to wishlist' }]);
  }

  function removeFromWishlist(id) {
    setWishlistItems((prev) => prev.filter((p) => p.id !== id));
  }

  function moveWishlistToCart(id) {
    removeFromWishlist(id);
    addToCart(id, 1);
    setToasts((t) => [...t, { id: Date.now(), message: 'Moved to cart' }]);
  }

  function addToast(message) {
    setToasts((t) => [...t, { id: Date.now(), message }]);
  }

  function login({ email, phone, name }) {
    setAuth({ email, phone, name });
  }

  function logout() {
    setAuth(null);
  }

  function signup({ email, phone, name }) {
    setAuth({ email, phone, name });
  }

  const value = {
    cartItems,
    wishlistItems,
    auth,
    cartCount,
    wishlistCount,
    addToCart,
    removeFromCart,
    setQty,
    addToWishlist,
    removeFromWishlist,
    moveWishlistToCart,
    login,
    signup,
    logout,
    toasts,
    addToast,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}

export default StoreProvider;

