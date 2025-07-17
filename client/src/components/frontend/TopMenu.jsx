import { Link } from "react-router-dom";

const TopMenu = () => {
    const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/signin");
  };
  return (
    <nav className="navbar navbar-expand-lg bg-dark p-0 navbar-text-navajowhite">
      <div className="container-fluid navbar-dark">
        <Link className="navbar-brand" to="/home">
          Ecomm.wired
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon bg-dark" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/category">Fashion</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/category">Supermarket</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/category">Electronics</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/category">Furniture</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/category">Garden & Outdoors</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/category">Jewellery</Link>
            </li>
          </ul>

          {/* Right aligned logout button */}
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link text-danger fw-semibold" onClick={handleLogout}>
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default TopMenu;
