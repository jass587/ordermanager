import { Routes, Route, Navigate } from 'react-router-dom';
import UserLayout from '../layout/UserLayout';
import Dashboard from '../pages/frontend/user/Dashboard/Dashboard';
import EditProfile from '../pages/common/editprofile/editprofile';
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
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="edit-profile" element={<EditProfile />} />
        {/* Add more user-specific routes here */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
