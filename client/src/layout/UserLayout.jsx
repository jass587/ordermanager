import { Outlet } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import TopMenu from '../components/frontend/TopMenu';
import Footer from '../pages/common/footer/footer';
import ScrollToTop from '../pages/common/scrolltotop/scrolltotop';
import Search from '../components/frontend/Search/Search';
const Header = lazy(() => import('../components/frontend/Header/Header'));


export default function UserLayout() {
  return (
    <div className="d-flex flex-column min-vh-100 bg-light" style={{ width: '100vw' }}>
      <header className="sticky-top shadow-sm" style={{ marginBottom: "5rem" }}>
        <Header />
        <TopMenu />
      </header>

      <main className="main-outlet flex-grow-1 px-2">
        <Outlet />
      </main>

      <footer className="mt-auto">
        <Footer />
      </footer>
    </div>
  );
}
