import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from '../layout/AdminLayout';
import Dashboard from '../pages/admin/Dashboard';
// import Users from '../pages/admin/Users';

const isAdmin = true; // Replace with real check

const ProtectedRoute = ({ children }) => (
  isAdmin ? children : <Navigate to="/" />
);

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<Navigate to="dashboard" />} />
        <Route path="dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      </Route>
    </Routes>
  );
}
