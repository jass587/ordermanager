import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductService from "../../../../services/api/products";
import CardServices from "../../../../components/frontend/card/CardServices";

const ProductDetailView = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      const result = await ProductService.getById(id);
      setProduct(result);
    };
    loadProduct();
  }, [id]);

  if (!product) {
    return <div className="text-center py-5">Loading product...</div>;
  }

  const { title, image, price, star, description } = product;

  return (
    <div className="container-fluid mt-6">
      <div className="row">
        <div className="col-md-8">
          <div className="row mb-4">
            <div className="col-md-5 text-center d-flex flex-column align-items-center">
              <img
                src={image}
                className="img-fluid mb-3"
                alt={title}
                style={{ maxHeight: "300px", objectFit: "contain" }}
              />

            </div>

            <div className="col-md-7">
              <div className="d-flex align-items-center mb-2 flex-wrap gap-2">
                <h1 className="h5 mb-0">{title}</h1>
              </div>

              <div className="d-flex align-items-center flex-wrap gap-1 mb-3">
                {Array.from({ length: 5 }, (_, i) => (
                  <i key={i} className={`bi bi-star-fill ${i < star ? "text-warning" : "text-secondary"}`} />
                ))}
                <span className="text-muted small ms-2">
                  {Math.floor(Math.random() * 100)} ratings and 4 reviews
                </span>
              </div>

              <div className="mb-3 mt-4">
                <span className="fw-bold h5 me-2">${price}</span>
              </div>

              <div>
                <p className="fw-bold small">Product Highlights</p>
                <ul className="small mb-0 mt-0">
                  {description.includes("|")
                    ? description.split("|").map((d, i) => <li key={i}>{d}</li>)
                    : <li>{description}</li>}
                </ul>
              </div>

              <div className="mb-3 mt-5">
                <div className="d-inline float-start me-2">
                  <div className="input-group input-group-sm mw-140">
                    <button className="btn btn-primary text-white" type="button"><i className="bi bi-dash-lg"></i></button>
                    <input type="text" className="form-control text-center" defaultValue="1" />
                    <button className="btn btn-primary text-white" type="button"><i className="bi bi-plus-lg"></i></button>
                  </div>
                </div>
                <button className="btn btn-sm btn-primary me-2"><i className="bi bi-cart-plus me-1" /> Add to cart</button>
                <button className="btn btn-sm btn-warning me-2"><i className="bi bi-cart3 me-1" /> Buy now</button>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <CardServices />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailView;
