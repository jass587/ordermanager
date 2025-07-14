import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar/Sidebar';
import Navbar from '../components/Navbar/Navbar';
import './admin.css';

export default function AdminLayout() {
  return (
    <div className="admin-layout">
      <Sidebar/>
      <div className="main-content">
        <Navbar />
        <div className="page-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
