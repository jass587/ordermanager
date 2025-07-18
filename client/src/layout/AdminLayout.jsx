import { Outlet } from 'react-router-dom';
import Sidebar from '../components/backend/Sidebar/Sidebar';
import Navbar from '../components/backend/Navbar/Navbar';
import Footer from '../pages/common/footer/footer';
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
