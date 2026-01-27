import { useNavigate } from 'react-router-dom';

const TopMenu = ({ onItemClick }) => {
  const navigate = useNavigate();

  const handleClick = (path) => {
    // 1️⃣ Close offcanvas (animated)
    onItemClick?.();

    // 2️⃣ Navigate AFTER close trigger
    navigate(path);
  };

  return (
    <nav className="navbar navbar-dark bg-dark py-1">
      <div className="container-fluid">
        <ul className="navbar-nav d-flex flex-column flex-md-row gap-3">
          <li className="nav-item">
            <button
              className="nav-link btn btn-link text-start text-white"
              onClick={() => handleClick('/products')}
            >
              Fashion
            </button>
          </li>
          <li className="nav-item">
            <button
              className="nav-link btn btn-link text-start text-white"
              onClick={() => handleClick('/products')}
            >
              Supermarket
            </button>
          </li>
          <li className="nav-item">
            <button
              className="nav-link btn btn-link text-start text-white"
              onClick={() => handleClick('/products')}
            >
              Electronics
            </button>
          </li>
          <li className="nav-item">
            <button
              className="nav-link btn btn-link text-start text-white"
              onClick={() => handleClick('/products')}
            >
              Furniture
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default TopMenu;
