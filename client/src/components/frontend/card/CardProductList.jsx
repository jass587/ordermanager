import { Link } from "react-router-dom";

const CardProductList = ({ data }) => {
  const {
    image,
    link,
    name,
    star,
    description,
    price,
    isFreeShipping,
  } = data;

  const renderStars = () =>
    Array.from({ length: 5 }, (_, i) => (
      <i
        key={i}
        className={`bi bi-star-fill me-1 ${
          i < star ? "text-warning" : "text-secondary"
        }`}
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
        {/* Product Image */}
        <div className="col-md-3 text-center d-flex align-items-center p-2">
          <img src={image} className="img-fluid" alt={name} />
        </div>

        {/* Product Info */}
        <div className="col-md-6">
          <div className="card-body">
            <h6 className="card-subtitle me-2 d-inline">
              <Link to={link} className="text-decoration-none text-dark">
                {name}
              </Link>
            </h6>

            <div className="mt-1">{renderStars()}</div>
            {renderDescription()}
          </div>
        </div>

        {/* Price & Actions */}
        <div className="col-md-3">
          <div className="card-body">
            <div className="mb-2">
              <span className="fw-bold h5">${price}</span>
            </div>

            {isFreeShipping && (
              <p className="text-success small mb-2">
                <i className="bi bi-truck" /> Free shipping
              </p>
            )}

            <div className="btn-group d-flex" role="group">
              <button
                type="button"
                className="btn btn-sm btn-primary"
                title="Add to cart"
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
