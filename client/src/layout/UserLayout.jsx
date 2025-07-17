import { Outlet } from 'react-router-dom';
import Sidebar from '../components/backend/Sidebar/Sidebar';
import Navbar from '../components/backend/Navbar/Navbar';
import './user.css';

export default function UserLayout() {
  return (
    <div className="">
      <Outlet />
    </div>

  );
}
