import { Routes, Route, Navigate } from 'react-router-dom';
import UserLayout from '../layout/UserLayout';
import Dashboard from '../pages/frontend/user/Dashboard/Dashboard';
import EditProfile from '../pages/common/editprofile/editprofile';
import Home from '../pages/frontend/user/Home/Home';
import Categories from '../pages/frontend/user/Categories/Categories';
import Products from '../pages/frontend/user/Products/Products';
import ProductDetail from '../pages/frontend/user/ProductDetail/ProductDetail';
import Cart from '../pages/frontend/user/Cart/Cart';
import CartItem from '../pages/frontend/user/Cartitems/CartItems';

import ProtectedRoute from './ProtectedRoute';
import NotFound from '../pages/common/errors/NotFound';

export default function UserRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute allowedRoles={['user']}>
            <UserLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="home" replace />} />
        <Route path="home" element={<Home />} />
        <Route path="category" element={<Categories />} />
        <Route path="products" element={<Products />} />
        <Route path="product/:id" element={<ProductDetail />} />
        <Route path="cart" element={<Cart />} />
        <Route path="cart-items" element={<CartItem />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="edit-profile" element={<EditProfile />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}