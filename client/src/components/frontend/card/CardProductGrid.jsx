import { Link } from "react-router-dom";

const CardProductGrid = ({ data }) => {
    const {
        id,
        image,
        isNew,
        isHot,
        discountPercentage,
        discountPrice,
        name,
        link,
        price,
        originPrice,
        star,
    } = data;

    return (
        <div className="card h-100 shadow-sm position-relative d-flex justify-content-between">
            {/* Product Image */}
            <img
                src={image}
                className="card-img-top"
                alt={name}
                style={{ objectFit: "cover" }}
                onError={(e) => (e.target.src = "/fallback-image.webp")}
            />



            {/* Card Body */}
            <div className="card-body d-flex flex-column p-2" style={{ minHeight: "150px" }}>
                {/* Title */}
                <h6 className="card-subtitle mb-1 text-truncate">
                    <Link to={`/product/${id}`} className="text-decoration-none text-dark">
                        {name}
                    </Link>
                </h6>

                {/* Price */}
                <div className="d-flex flex-wrap align-items-center gap-1 mb-1">
                    <span className="fw-bold small">${price}</span>
                </div>

                {/* Stars */}
                <div
                    className="mb-2"
                    style={{
                        fontSize: "14px",
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    {Array.from({ length: star }, (_, i) => (
                        <i key={i} className="bi bi-star-fill text-warning me-1" />
                    ))}
                </div>

                {/* Spacer to absorb free space */}
                <div className="flex-grow-1"></div>

                {/* Buttons */}
                <div>
                    <div className="btn-group d-flex" role="group" style={{ height: "36px" }}>
                        <button
                            type="button"
                            className="btn btn-sm btn-primary d-flex align-items-center justify-content-center"
                            title="Add to cart"
                        >
                            <i className="bi bi-cart-plus" />
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default CardProductGrid;
