import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Lazy load all route-based pages
const AdminRoutes = lazy(() => import('./routes/AdminRoutes'));
const UserRoutes = lazy(() => import('./routes/UserRoutes'));
const SignIn = lazy(() => import('@pages/common/signin/SignIn'));
const SocialLoginSuccess = lazy(() => import('@pages/common/sociallogin/SocialLoginSuccess'));
const Forbidden = lazy(() => import('@pages/common/errors/Forbidden'));
const ServerError = lazy(() => import('@pages/common/errors/ServerError'));
const NotFound = lazy(() => import('@pages/common/errors/NotFound'));
const DefaultError = lazy(() => import('@pages/common/errors/DefaultError'));

function App() {
  return (
    <>
      <Suspense fallback={<div className="text-center py-5">Loading...</div>}>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
          <Route path="/social-login-success" element={<SocialLoginSuccess />} />

          {/* Error pages */}
          <Route path="/not-found" element={<NotFound />} />
          <Route path="/server-error" element={<ServerError />} />
          <Route path="/forbidden" element={<Forbidden />} />
          <Route path="/default-error" element={<DefaultError />} />

          {/* User routes */}
          <Route path="/*" element={<UserRoutes />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>

      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </>
  );
}

export default App;
