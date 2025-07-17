import { Outlet } from 'react-router-dom';
import Sidebar from '../components/backend/Sidebar/Sidebar';
import Navbar from '../components/backend/Navbar/Navbar';
import './user.css'; 

export default function UserLayout() {
  return (
    <div className="user-layout d-flex">
      <Sidebar/>

      <div className="main-content flex-grow-1">
          <Navbar />
        <div className="page-content p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
