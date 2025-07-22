import { Link } from "react-router-dom";

const CardProductList = ({ data, onAddToCart }) => {
  const {
    id,
    image,
    title,
    description,
    price,
    star = 4,
  } = data;

  const renderStars = () =>
    Array.from({ length: 5 }, (_, i) => (
      <i
        key={i}
        className={`bi bi-star-fill me-1 ${i < star ? "text-warning" : "text-secondary"}`}
      />
    ));

  const renderDescription = () => {
    if (!description) return null;
    if (description.includes("|")) {
      return (
        <ul className="mt-2">
          {description.split("|").map((line, idx) => (
            <li key={idx}>{line}</li>
          ))}
        </ul>
      );
    }
    return <p className="small mt-2">{description}</p>;
  };

  return (
    <div className="card shadow-sm">
      <div className="row g-0">
        <div className="col-md-3 text-center d-flex align-items-center p-2">
          <img
            src={image}
            className="img-fluid"
            alt={title}
            onError={(e) => (e.target.src = "/fallback-image.webp")}
          />
        </div>

        <div className="col-md-6">
          <div className="card-body">
            <h6 className="card-subtitle me-2 d-inline">
              <Link to={`/product/${id}`} className="text-decoration-none text-dark">
                {title}
              </Link>
            </h6>

            <div className="mt-1">{renderStars()}</div>
            {renderDescription()}
          </div>
        </div>

        <div className="col-md-3">
          <div className="card-body">
            <div className="mb-2">
              <span className="fw-bold h5">${price}</span>
            </div>

            <div className="btn-group d-flex" role="group">
              <button
                type="button"
                className="btn btn-sm btn-primary"
                title="Add to cart"
                onClick={() => onAddToCart(data)}
              >
                <i className="bi bi-cart-plus" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardProductList;
