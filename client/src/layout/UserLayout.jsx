import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar'; // You can use a different one for user
import Header from './Header';
import LogoutButton from '../components/LogoutButton/LogoutButton';
import './user.css'; 

export default function UserLayout() {
  return (
    <div className="user-layout d-flex">
      <Sidebar />

      <div className="main-content flex-grow-1">
        <div className="d-flex justify-content-between align-items-center p-3 border-bottom bg-white shadow-sm">
          <Header />
          <LogoutButton />
        </div>

        <div className="page-content p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
