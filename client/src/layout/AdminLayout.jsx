import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import LogoutButton from '../components/LogoutButton/LogoutButton';
import './admin.css';

export default function AdminLayout() {
  return (
    <div className="admin-layout d-flex">
      {/* Sidebar on the left */}
      <Sidebar />

      {/* Main content area */}
      <div className="main-content flex-grow-1">
        {/* Header with logout on the right */}
        <div className="d-flex justify-content-between align-items-center p-3 border-bottom bg-white shadow-sm">
          <Header />
          <LogoutButton />
        </div>

        {/* Page content */}
        <div className="page-content p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
