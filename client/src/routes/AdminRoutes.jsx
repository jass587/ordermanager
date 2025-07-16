import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from '../layout/AdminLayout';
import Dashboard from '../pages/admin/Dashboard/Dashboard';
import EditProfile from '../pages/editprofile/editprofile';
import ProtectedRoute from './ProtectedRoute';
import Categories from '../pages/admin/Categories/Categories';
import Orders from '../pages/admin/Orders/Orders';
import Payments from '../pages/admin/Payments/Payments';
import Products from '../pages/admin/Products/Products';
import Users from '../pages/admin/Users/Users';
import SiteSettings from '../pages/admin/SiteSettings/SiteSettings';
import NotFound from '../pages/errors/NotFound';

export default function AdminRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="users" element={<Users/>} />
        <Route path="edit-profile" element={<EditProfile />} />
        <Route path="categories" element={<Categories />} />
        <Route path="products" element={<Products />} />
        <Route path="orders" element={<Orders />} />
        <Route path="payments" element={<Payments />} />
        <Route path="site-settings" element={<SiteSettings />} />
        <Route path="*" element={<NotFound fullScreen={false} />} />
      </Route>
    </Routes>
  );
}
