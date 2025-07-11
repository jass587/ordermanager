import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from '../layout/AdminLayout';
import Dashboard from '../pages/admin/Dashboard';
import ProtectedRoute from './ProtectedRoute';

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<Navigate to="dashboard" />} />
        <Route
          path="dashboard"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}
