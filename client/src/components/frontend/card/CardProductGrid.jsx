import { Link } from "react-router-dom";
import { CartPlus } from "react-bootstrap-icons";

const CardProductGrid = ({ data, onAddToCart }) => {
  const {
    id,
    image,
    title,
    price,
    star = 4,
  } = data;

  return (
    <div className="card h-100 shadow-sm position-relative d-flex justify-content-between">
      <img
        src={image}
        className="card-img-top"
        alt={title}
        style={{
          height: "200px",
          width: "100%",
          objectFit: "contain",
          padding: "1rem",
          backgroundColor: "#f8f9fa",
        }}
        onError={(e) => (e.target.src = "/fallback-image.webp")}
      />

      <div className="card-body d-flex flex-column p-2" style={{ minHeight: "150px" }}>
        <h6 className="card-subtitle mb-1 text-truncate">
          <Link to={`/product/${id}`} className="text-decoration-none text-dark">
            {title}
          </Link>
        </h6>

        <div className="d-flex flex-wrap align-items-center gap-1 mb-1">
          <span className="fw-bold small">${price}</span>
        </div>

        <div className="mb-2 d-flex align-items-center">
          {Array.from({ length: star }, (_, i) => (
            <i key={i} className="bi bi-star-fill text-warning me-1" />
          ))}
        </div>

        <div className="flex-grow-1"></div>

        <div className="btn-group d-flex" role="group" style={{ height: "36px" }}>
          <button
            type="button"
            className="btn btn-sm btn-primary d-flex align-items-center justify-content-center"
            title="Add to cart"
            onClick={() => onAddToCart(data)}
          >
            <CartPlus size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardProductGrid;
