import React, { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import RootLayout from './RootLayout.jsx';

const HomePage = lazy(() => import('../pages/HomePage.jsx'));
const ShopPage = lazy(() => import('../pages/ShopPage.jsx'));
const CoursesPage = lazy(() => import('../pages/CoursesPage.jsx'));
const CartPage = lazy(() => import('../pages/CartPage.jsx'));
const WishlistPage = lazy(() => import('../pages/WishlistPage.jsx'));
const LoginPage = lazy(() => import('../pages/LoginPage.jsx'));
const SignupPage = lazy(() => import('../pages/SignupPage.jsx'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage.jsx'));

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route path="shop" element={<ShopPage />} />
        <Route path="courses" element={<CoursesPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="wishlist" element={<WishlistPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      <Route path="/404" element={<Navigate to="*" replace />} />
    </Routes>
  );
}

