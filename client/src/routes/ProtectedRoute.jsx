// routes/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token || !role) {
    return <Navigate to="/signin" replace />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/forbidden" replace />;
  }

  return children;
};

export default ProtectedRoute;
