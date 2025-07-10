import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import './admin.css'; // optional

export default function AdminLayout() {
  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="page-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
