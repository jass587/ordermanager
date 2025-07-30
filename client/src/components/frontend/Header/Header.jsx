import { lazy, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartFromBackend, syncCartToBackend } from "../../../redux/thunks/cartThunks";
import store, { persistor } from "../../../redux/store/store";
import { clearCart } from "../../../redux/store/cartSlice";
import AuthService from "@services/api/auth";
import { getLoggedInUser } from "@utils/authUtils";
import { Container, Row, Col, Badge, Dropdown, ButtonGroup } from "react-bootstrap";
import { Cart3 } from "react-bootstrap-icons";

const Search = lazy(() => import("../Search/Search"));

const Header = () => {
  const dispatch = useDispatch();
  const location = useLocation(); // ✅ current route path
  const { name } = getLoggedInUser();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const cartItems = useSelector((state) => state.cart.items);
  const isCartLoaded = useSelector((state) => state.cart.isCartLoaded);

  const cartCount = cartItems
    .filter((item) => item.productInfo)
    .reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsLoggedIn(true);
      if (!isCartLoaded && cartItems.length === 0) {
        dispatch(fetchCartFromBackend());
      }
    } else {
      setIsLoggedIn(false);
    }
  }, [dispatch, isCartLoaded]);

  const handleLogout = async () => {
    const cartItems = store.getState().cart.items;
    const token = localStorage.getItem("token");

    if (token && cartItems.length >= 0) {
      try {
        await dispatch(syncCartToBackend(cartItems));
      } catch (e) {
        console.warn("⚠️ Failed to sync cart during logout:", e);
      }
    }

    dispatch(clearCart());
    await persistor.flush();
    await persistor.purge();

    setIsLoggedIn(false);
    AuthService.logout();
  };

  // ✅ Show Search only on /home or /products
  const showSearch = ["/home", "/products"].some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <header className="p-3 border-bottom bg-white shadow-sm">
      <Container fluid>
        <Row className="align-items-center">
          <Col md={3} className="text-center text-md-start mb-2 mb-md-0">
            <Link to="/home" className="d-flex align-items-center gap-2 text-decoration-none">
              <img
                src="/images/rb_logo.png"
                alt="Logo"
                className="img-fluid"
                style={{ maxHeight: "40px" }}
              />
              <span className="fw-bold text-dark fs-5">Ecomm.wired</span>
            </Link>
          </Col>

          <Col md={5}>
            {showSearch && <Search />}
          </Col>

          <Col md={4} className="text-end">
            <Link to="/cart" className="btn btn-outline-primary position-relative me-3">
              <Cart3 size={20} />
              {cartCount > 0 && (
                <Badge
                  bg="danger"
                  pill
                  className="position-absolute top-0 start-100 translate-middle"
                  style={{
                    fontSize: '0.65rem',
                    padding: '0.35em 0.5em',
                    transform: 'translate(-30%, -40%)',
                    zIndex: 1,
                  }}
                >
                  {cartCount}
                </Badge>
              )}
            </Link>

            {isLoggedIn ? (
              <Dropdown as={ButtonGroup}>
                <Dropdown.Toggle variant="secondary" className="d-flex align-items-center gap-2">
                  {(() => {
                    const parts = name?.trim().split(" ") || [];
                    const firstInitial = parts[0]?.[0]?.toUpperCase() || "";
                    const lastInitial = parts[1]?.[0]?.toUpperCase() || "";
                    return `${firstInitial}${lastInitial}`;
                  })()}
                </Dropdown.Toggle>

                <Dropdown.Menu align="end">
                  <Dropdown.Item as={Link} to="/edit-profile">
                    <i className="bi bi-person-square"></i> My Profile
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/orders/my-orders">
                    <i className="bi bi-list-check text-primary"></i> Orders
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item as={Link} to="/account/notification">
                    <i className="bi bi-bell-fill text-primary"></i> Notification
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/support">
                    <i className="bi bi-info-circle-fill text-success"></i> Support
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleLogout} className="text-danger">
                    <i className="bi bi-door-closed-fill"></i> Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Link to="/signin" className="btn btn-outline-primary">
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
