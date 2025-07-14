import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import LogoutButton from '../components/Logout/LogoutButton';
import Navbar from '../components/Navbar/Navbar';
import './user.css'; 

export default function UserLayout() {
  return (
    <div className="user-layout d-flex">
      <Sidebar />

      <div className="main-content flex-grow-1">
        <div className="d-flex justify-content-end align-items-center p-3 border-bottom bg-white shadow-sm">
          <Navbar />
          <LogoutButton />
        </div>

        <div className="page-content p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
