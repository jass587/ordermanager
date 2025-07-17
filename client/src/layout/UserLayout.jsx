import { Outlet } from 'react-router-dom';
import TopMenu from '../components/frontend/TopMenu';
import './user.css';

export default function UserLayout() {
  return (
    <div className="min-vh-100 d-flex flex-column bg-light" style={{ width: '100vw' }}>
      {/* Top Navigation */}
      <header className="sticky-top shadow-sm">
        <TopMenu />
      </header>

      {/* Page Content */}
      <main className="flex-grow-1 py-4" style={{ width: '100%' }}>
        <Outlet />
      </main>

      {/* Optional Footer */}
      <footer className="text-center py-3 border-top">
        © 2025 Ecomm.wired
      </footer>
    </div>
  );
}
