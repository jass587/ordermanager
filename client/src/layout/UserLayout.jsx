import { Outlet } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import TopMenu from '@components/frontend/TopMenu';
import Footer from '@pages/common/footer/footer';

const Header = lazy(() => import('../components/frontend/Header/Header'));

export default function UserLayout() {
  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      {/* Header */}
      <header className="sticky-top bg-white shadow-sm">
        <Suspense fallback={<div className="py-3"></div>}>
          <Header />
        </Suspense>
        <TopMenu />
      </header>

      {/* Main Content */}
      <main className="flex-grow-1 container-fluid px-2 px-md-3 px-lg-4">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="mt-auto">
        <Footer />
      </footer>
    </div>
  );
}
