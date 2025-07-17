import { Routes, Route, Navigate } from 'react-router-dom';
import AdminRoutes from './routes/AdminRoutes';
import UserRoutes from './routes/UserRoutes';
import SignIn from './pages/common/signin/SignIn';
import './assets/scss/app.scss';
import SocialLoginSuccess from './pages/common/sociallogin/SocialLoginSuccess';
import Forbidden from './pages/common/errors/Forbidden';
import ServerError from './pages/common/errors/ServerError';
import NotFound from './pages/common/errors/NotFound';
import DefaultError from './pages/common/errors/DefaultError';

function App() {
  return (
    <Routes>
       <Route path="/" element={<Navigate to="/signin" replace />} />

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
  );
}

export default App;
