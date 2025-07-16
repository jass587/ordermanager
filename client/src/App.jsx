import { Routes, Route } from 'react-router-dom';
import AdminRoutes from './routes/AdminRoutes';
import UserRoutes from './routes/UserRoutes';
import SignIn from './pages/signin/SignIn';
import './assets/scss/app.scss';
import SocialLoginSuccess from './pages/sociallogin/SocialLoginSuccess';
import Forbidden from './pages/errors/Forbidden';
import ServerError from './pages/errors/ServerError';
import NotFound from './pages/errors/NotFound';
import DefaultError from './pages/errors/DefaultError';

function App() {
  return (
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
  );
}

export default App;
