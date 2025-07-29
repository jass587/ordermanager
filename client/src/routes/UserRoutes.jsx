import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

const UserLayout = lazy(() => import('@layout/UserLayout'));
const Dashboard = lazy(() => import('@pages/frontend/user/Dashboard/Dashboard'));
const EditProfile = lazy(() => import('@pages/common/editprofile/editprofile'));
const Home = lazy(() => import('@pages/frontend/user/Home/Home'));
const ProductsList = lazy(() => import('@pages/frontend/user/Products/ProductsList'));
const ProductDetail = lazy(() => import('@pages/frontend/user/Products/ProductDetail'));
const Cart = lazy(() => import('@pages/frontend/user/Cart/Cart'));
const ProtectedRoute = lazy(() => import('./ProtectedRoute'));
const NotFound = lazy(() => import('@pages/common/errors/NotFound'));
const Orders = lazy(() => import('@pages/frontend/user/Orders/Orders'));
const Checkout = lazy(() => import('@pages/frontend/user/Checkout/Checkout'));
const OrderSuccess = lazy(() => import('@pages/common/success/ordersuccess'));
const OrderDetail = lazy(() => import('@pages/frontend/user/Orders/OrderDetail'));

export default function UserRoutes() {
  return (
    <Suspense fallback={<div className="text-center py-5">Loading...</div>}>
      <Routes>
        {/* Public Routes (No Sign-In Required) */}
        <Route element={<UserLayout />}>
          <Route index element={<Navigate to="home" replace />} />
          <Route path="home" element={<Home />} />
          <Route path="products" element={<ProductsList />} />
          <Route path="product/:id" element={<ProductDetail />} />
          <Route path="cart" element={<Cart />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>

        {/* Protected Routes (Requires Sign-In) */}
        <Route
          element={
            <ProtectedRoute allowedRoles={['user']}>
              <UserLayout />
            </ProtectedRoute>
          }
        >
          <Route path="edit-profile" element={<EditProfile />} />
          <Route path="/orders/my-orders" element={<Orders />} />
          <Route path="/orders/my-orders/:id" element={<OrderDetail />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="order-success" element={<OrderSuccess />} />
        </Route>

        {/* Catch-All */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
