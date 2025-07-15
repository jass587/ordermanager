import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from '../layout/AdminLayout';
import Dashboard from '../pages/admin/Dashboard/Dashboard';
import EditProfile from '../pages/editprofile/editprofile';
import ProtectedRoute from './ProtectedRoute';
import Categories from '../pages/admin/Categories/Categories';

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
        <Route path="edit-profile" element={<EditProfile />} />
        <Route path="categories" element={<Categories />} />
        <Route path="*" element={<Navigate to="dashboard" replace />} />
      </Route>
    </Routes>
  );
}
