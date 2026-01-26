import { lazy, useEffect, useState, Suspense } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCartFromBackend,
  syncCartToBackend,
} from '../../../redux/thunks/cartThunks';
import { persistor } from '../../../redux/store/store';
import { clearCart } from '../../../redux/store/cartSlice';
import AuthService from '@services/api/auth';
import { getLoggedInUser } from '@utils/authUtils';
import {
  Container,
  Row,
  Col,
  Badge,
  Dropdown,
  ButtonGroup,
} from 'react-bootstrap';
import { Cart3 } from 'react-bootstrap-icons';

const Search = lazy(() => import('../Search/Search'));

const Header = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { name } = getLoggedInUser();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const cartItems = useSelector((state) => state.cart.items);
  const isCartLoaded = useSelector((state) => state.cart.isCartLoaded);

  const cartCount = cartItems
    .filter((item) => item.productInfo)
    .reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);

    if (token && !isCartLoaded && cartItems.length === 0) {
      dispatch(fetchCartFromBackend());
    }
  }, [dispatch, isCartLoaded, cartItems.length]);

  const handleLogout = async () => {
    try {
      await dispatch(syncCartToBackend(cartItems)).unwrap();
    } catch (e) {
      console.warn('⚠️ Cart sync failed on logout', e);
    }

    await persistor.purge();
    dispatch(clearCart());
    AuthService.logout();
    setIsLoggedIn(false);
  };

  const showSearch = ['/home', '/products'].some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <header className="border-bottom bg-white shadow-sm">
      <Container fluid className="py-2 py-md-3">
        <Row className="align-items-center g-2">
          {/* Logo */}
          <Col xs={6} md={3} className="d-flex align-items-center">
            <Link
              to="/home"
              className="d-flex align-items-center gap-2 text-decoration-none"
            >
              <img
                src="/images/rb_logo.png"
                alt="Logo"
                className="img-fluid"
                style={{ maxHeight: '36px' }}
              />
              <span className="fw-bold text-dark fs-6 fs-md-5">
                Ecomm.wired
              </span>
            </Link>
          </Col>

          {/* Search */}
          <Col xs={12} md={5} className="order-3 order-md-2">
            {showSearch && (
              <Suspense fallback={<div className="py-2"></div>}>
                <Search />
              </Suspense>
            )}
          </Col>

          {/* Cart + User */}
          <Col
            xs={6}
            md={4}
            className="d-flex justify-content-end align-items-center gap-2 order-2 order-md-3"
          >
            {/* Cart */}
            <Link
              to="/cart"
              className="btn btn-outline-primary position-relative"
            >
              <Cart3 size={18} />
              {cartCount > 0 && (
                <Badge
                  bg="danger"
                  pill
                  className="position-absolute top-0 start-100 translate-middle"
                  style={{ fontSize: '0.6rem' }}
                >
                  {cartCount}
                </Badge>
              )}
            </Link>

            {/* User */}
            {isLoggedIn ? (
              <Dropdown as={ButtonGroup}>
                <Dropdown.Toggle
                  variant="secondary"
                  size="sm"
                  className="d-flex align-items-center justify-content-center"
                >
                  {(() => {
                    const parts = name?.trim().split(' ') || [];
                    return `${parts[0]?.[0] || ''}${parts[1]?.[0] || ''}`;
                  })()}
                </Dropdown.Toggle>

                <Dropdown.Menu align="end">
                  <Dropdown.Item as={Link} to="/edit-profile">
                    My Profile
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/orders/my-orders">
                    Orders
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item as={Link} to="/support">
                    Support
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleLogout} className="text-danger">
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Link to="/signin" className="btn btn-outline-primary btn-sm">
                Sign In
              </Link>
            )}
          </Col>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
