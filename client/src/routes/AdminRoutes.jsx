import { Routes, Route, Navigate } from 'react-router-dom';

import AdminLayout from '@layout/AdminLayout';
import EditProfile from '@pages/common/editprofile/editprofile';
import ProtectedRoute from './ProtectedRoute';

// ✅ FIXED: Correct relative paths based on actual folder structure
import Categories from '@pages/backend/admin/Categories/Categories';
import Orders from '@pages/backend/admin/Orders/Orders';
import Payments from '@pages/backend/admin/Payments/Payments';
import Products from '@pages/backend/admin/Products/Products';
import Users from '@pages/backend/admin/Users/Users';
import SiteSettings from '@pages/backend/admin/SiteSettings/SiteSettings';

import NotFound from '@pages/common/errors/NotFound';
import Dashboard from '@pages/backend/admin/Dashboard/Dashboard';

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
