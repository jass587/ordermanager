import { lazy } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Search = lazy(() => import("../Search/Search"));

const Header = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        setIsLoggedIn(false);
        navigate("/signin");
    };

    return (
        <header className="p-3 border-bottom bg-white shadow-sm" style={{ minHeight: "65px" }}>
            <div className="container-fluid">
                <div className="row align-items-center">
                    {/* Logo */}
                    <div className="col-md-3 text-center text-md-start mb-2 mb-md-0">
                        <Link to="/home" className="d-flex align-items-center gap-2 text-decoration-none">
                            <img
                                src="/images/rb_logo.png"
                                alt="Logo"
                                className="img-fluid"
                                style={{ maxHeight: "40px" }}
                            />
                            <span className="fw-bold text-dark fs-5">Ecomm.wired</span>
                        </Link>
                    </div>

                    {/* Search */}
                    <div className="col-md-5">
                        <Search />
                    </div>

                    {/* Cart + Profile/SignIn */}
                    <div className="col-md-4 text-end">
                        <Link to="/cart" className="btn btn-outline-primary position-relative me-3">
                            <i className="bi bi-cart3"></i>
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                2
                            </span>
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
                            <Link to="/account/signin" className="btn btn-outline-primary">Sign In</Link>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
