import { Routes, Route } from 'react-router-dom';
import UserLayout from '../layout/UserLayout';
import Home from '../pages/user/Home';
// import Home from '../pages/user/Home';
// import Cart from '../pages/user/Cart';

export default function UserRoutes() {
  return (
    <Routes>
      <Route path="/" element={<UserLayout />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
}
