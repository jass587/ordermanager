import { Outlet } from 'react-router-dom';
import Sidebar from '../components/backend/Sidebar/Sidebar';
import Navbar from '../components/backend/Navbar/Navbar';
import Footer from '../pages/common/footer/footer';
import './admin.css';

export default function AdminLayout() {
  return (
    <div className="d-flex" style={{ minHeight: '100vh', overflowX: 'hidden' }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Section (Navbar + Content + Footer) */}
      <div className="d-flex flex-column flex-grow-1 bg-light">
        <Navbar />

        {/* Page content */}
        <main className="flex-grow-1 px-3 py-4">
          <Outlet />
        </main>

        {/* Footer always at bottom */}
        <footer className="mt-auto">
          <Footer />
        </footer>
      </div>
    </div>
  );
}
