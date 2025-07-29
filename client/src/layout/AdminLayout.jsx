import { Outlet } from 'react-router-dom';
import Sidebar from '@components/backend/Sidebar/Sidebar';
import Navbar from '@components/backend/Navbar/Navbar';
import ScrollToTop from '@pages/common/scrolltotop/scrolltotop';
import '@layout/admin.css';

export default function AdminLayout() {
  return (
    <div className="admin-layout">
      <Sidebar/>
      <div className="main-content">
        <Navbar />
        <div className="page-content">
          <ScrollToTop/>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
