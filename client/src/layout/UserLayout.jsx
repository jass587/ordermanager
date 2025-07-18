import { Outlet } from 'react-router-dom';
import TopMenu from '../components/frontend/TopMenu';
import Footer from '../pages/common/footer/footer';
import './user.css'; // Ensure this doesn't override layout styling

export default function UserLayout() {
  return (
    <div className="d-flex flex-column min-vh-100 bg-light" style={{ width: '100vw' }}>
      {/* Sticky Header */}
      <header className="sticky-top shadow-sm">
        <TopMenu />
      </header>

      {/* Main Content */}
      <main className="flex-grow-1 py-4 px-2">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="mt-auto">
        <Footer />
      </footer>
    </div>
  );
}
