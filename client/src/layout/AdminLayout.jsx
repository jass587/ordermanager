import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import LogoutButton from '../components/Logout/LogoutButton';
import Navbar from '../components/Navbar/Navbar';
import './admin.css';

export default function AdminLayout() {
  return (
    <div className="admin-layout d-flex" style={{ width : '100vw'}}>
      <Sidebar />

      <div className="main-content flex-grow-1">
          <Navbar/>
        <div className="page-content p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
