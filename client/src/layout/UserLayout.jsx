import { Outlet } from 'react-router-dom';

export default function UserLayout() {
  return (
    <div>
      {/* User header/nav here */}
      <Outlet />
    </div>
  );
}
