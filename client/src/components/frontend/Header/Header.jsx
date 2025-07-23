import { lazy, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartFromBackend, syncCartToBackend } from "../../../redux/thunks/cartThunks";
import store, { persistor } from "../../../redux/store/store";
import { clearCart } from "../../../redux/store/cartSlice";
import AuthService from "../../../services/api/auth";

const Search = lazy(() => import("../Search/Search"));

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const cartItems = useSelector((state) => state.cart.items);
    const cartCount = cartItems
        .filter((item) => item.productInfo)
        .reduce((acc, item) => acc + item.quantity, 0);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const loggedIn = !!token;
        setIsLoggedIn(loggedIn);

        if (loggedIn) {
            dispatch(fetchCartFromBackend()); // ✅ Load cart once if token exists
        }
    }, [dispatch]);

    const handleLogout = async () => {
        const cartItems = store.getState().cart.items;
        const token = localStorage.getItem("token");

        if (token && cartItems.length > 0) {
            try {
                await dispatch(syncCartToBackend(cartItems));
            } catch (e) {
                console.warn("Failed to sync cart during logout", e);
            }
        }

        dispatch(clearCart());
        persistor.purge();
        setIsLoggedIn(false);

        AuthService.logout(); // Clears localStorage + redirects
    }

    return (
        <header className="p-3 border-bottom bg-white shadow-sm" style={{ minHeight: "65px" }}>
            <div className="container-fluid">
                <div className="row align-items-center">
                    <div className="col-md-3 text-center text-md-start mb-2 mb-md-0">
                        <Link to="/home" className="d-flex align-items-center gap-2 text-decoration-none">
                            <img src="/images/rb_logo.png" alt="Logo" className="img-fluid" style={{ maxHeight: "40px" }} />
                            <span className="fw-bold text-dark fs-5">Ecomm.wired</span>
                        </Link>
                    </div>

                    <div className="col-md-5">
                        <Search />
                    </div>

                    <div className="col-md-4 text-end">
                        <Link to="/cart" className="btn btn-outline-primary position-relative me-3">
                            <i className="bi bi-cart3"></i>
                            {cartCount > 0 && (
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        {isLoggedIn ? (
                            <div className="btn-group">
                                <button
                                    type="button"
                                    className="btn btn-secondary dropdown-toggle"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <i className="bi bi-person-fill"></i>
                                </button>
                                <ul className="dropdown-menu dropdown-menu-end">
                                    <li><Link className="dropdown-item" to="/account/profile"><i className="bi bi-person-square"></i> My Profile</Link></li>
                                    <li><Link className="dropdown-item" to="/account/orders"><i className="bi bi-list-check text-primary"></i> Orders</Link></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><Link className="dropdown-item" to="/account/notification"><i className="bi bi-bell-fill text-primary"></i> Notification</Link></li>
                                    <li><Link className="dropdown-item" to="/support"><i className="bi bi-info-circle-fill text-success"></i> Support</Link></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><button className="dropdown-item text-danger" onClick={handleLogout}><i className="bi bi-door-closed-fill"></i> Logout</button></li>
                                </ul>
                            </div>
                        ) : (
                            <Link to="/signin" className="btn btn-outline-primary">Sign In</Link>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
