import { Routes, Route, Navigate } from 'react-router-dom';
import UserLayout from '../layout/UserLayout';
import Dashboard from '../pages/frontend/user/Dashboard/Dashboard';
import EditProfile from '../pages/common/editprofile/editprofile';
import Home from '../pages/frontend/user/Home/Home';
import ProductsList from '../pages/frontend/user/Products/ProductsList';
import ProductDetail from '../pages/frontend/user/Products/ProductDetail';
import Cart from '../pages/frontend/user/Cart/Cart';
import CartItem from '../pages/frontend/user/Cartitems/CartItems';
import ProtectedRoute from './ProtectedRoute';
import NotFound from '../pages/common/errors/NotFound';
import Orders from '../pages/frontend/user/Orders/Orders';
import Checkout from '../pages/frontend/user/Checkout/Checkout';

export default function UserRoutes() {
  return (
    <Routes>
      {/* Public Routes (No Sign-In Required) */}
      <Route element={<UserLayout />}>
        <Route index element={<Navigate to="home" replace />} />
        <Route path="home" element={<Home />} />
        <Route path="products" element={<ProductsList />} />
        <Route path="product/:id" element={<ProductDetail />} />
        <Route path="cart" element={<Cart />} />
        <Route path="cart-items" element={<CartItem />} />
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
        <Route path="orders" element={<Orders />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>

      {/* Catch-All */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
