import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import {
  fetchCartFromBackend,
  syncCartToBackend,
} from '@redux/thunks/cartThunks';
import { useDispatch, useSelector } from 'react-redux';
import { mergeCarts } from '@utils/mergeCart';
import { setCart } from '@redux/store/cartSlice';
import { toast } from 'react-toastify';

export default function SocialLoginSuccess() {
  const navigate = useNavigate();
  const guestCart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    if (token) {
      try {
        const decoded = jwtDecode(token);
        const role = decoded.role;

        localStorage.setItem('token', token);
        localStorage.setItem('role', role);

        // Delay slightly to ensure localStorage is set
        setTimeout(() => {
          if (role === 'admin') {
            navigate('/admin/dashboard');
          } else {
            navigate('/home');
          }
        }, 100); // adjust if needed
      } catch (err) {
        console.error('Token decoding error:', err);
        navigate('/signin');
      }
    } else {
      navigate('/signin');
    }
  }, [navigate]);

  useEffect(() => {
    const syncCart = async () => {
      try {
        const dbCart = await dispatch(fetchCartFromBackend()).unwrap();

        if (guestCart.length > 0) {
          const merged = mergeCarts(dbCart, guestCart);
          dispatch(syncCartToBackend(merged));
          dispatch(setCart(merged));
        } else {
          dispatch(setCart(dbCart));
        }

        toast.success('Login successful!');
      } catch (err) {
        console.error(err.message || 'Server error');
      }
    };

    if (localStorage.getItem('token')) {
      syncCart();
    }
  }, [dispatch]);

  return <h4 className="text-center mt-5">Signing you in...</h4>;
}
