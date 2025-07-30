import { Link } from "react-router-dom";

const TopMenu = () => {
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
              <Link className="nav-link" to="/products">Fashion</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/products">Supermarket</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/products">Electronics</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/products">Furniture</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/products">Garden & Outdoors</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/products">Jewellery</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default TopMenu;
