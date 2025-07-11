import { Routes, Route } from 'react-router-dom';
import AdminRoutes from './routes/AdminRoutes';
import UserRoutes from './routes/UserRoutes';
import SignIn from './pages/signin/SignIn';
import './assets/scss/app.scss';
import SocialLoginSuccess from './pages/sociallogin/SocialLoginSuccess';

function App() {
  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/admin/*" element={<AdminRoutes />} />
      <Route path="/*" element={<UserRoutes />} />
      <Route path="/social-login-success" element={<SocialLoginSuccess/>} />
    </Routes>
  );
}

export default App;
