import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { DashLg, PlusLg, CartPlus, Cart3, StarFill } from "react-bootstrap-icons";

import { addItem, updateQuantity } from "../../../../redux/store/cartSlice";
import ProductService from "@services/api/products";
import CardServices from "@components/frontend/card/CardServices";

const ProductDetailView = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const cartItems = useSelector((state) => state.cart.items);
  const cartItem = cartItems.find((item) => item.productId === parseInt(id));

  useEffect(() => {
    const loadProduct = async () => {
      const result = await ProductService.getById(id);
      setProduct(result);
    };
    loadProduct();
  }, [id]);

  const handleQtyChange = (type) => {
    if (cartItem) {
      const newQty = type === "inc" ? cartItem.quantity + 1 : cartItem.quantity - 1;
      if (newQty >= 1) {
        dispatch(updateQuantity({ productId: cartItem.productId, quantity: newQty }));
      }
    } else {
      const newQty = type === "inc" ? quantity + 1 : quantity - 1;
      if (newQty >= 1) {
        setQuantity(newQty);
      }
    }
  };

  const handleAddToCart = () => {
    if (!product) return;

    if (cartItem) {
      toast.info("Product already in cart");
    } else {
      dispatch(addItem({
        productId: product.id,
        quantity,
        productInfo: product,
      }));
      toast.success(`${product.title} added to cart`);
    }
  };

  if (!product) {
    return <div className="text-center py-5">Loading product...</div>;
  }

  const { title, image, price, star = 4, description } = product;

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
              <h1 className="h5 mb-2">{title}</h1>

              <div className="d-flex align-items-center flex-wrap gap-1 mb-3">
                {Array.from({ length: 5 }, (_, i) => (
                  <StarFill
                    key={i}
                    className={`me-1 ${i < star ? "text-warning" : "text-secondary"}`}
                  />
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
                  {description?.includes("|")
                    ? description.split("|").map((d, i) => <li key={i}>{d}</li>)
                    : <li>{description}</li>}
                </ul>
              </div>

              <div className="mb-3 mt-5">
                {/* Quantity Selector */}
                <div className="d-inline float-start me-2">
                  <div className="input-group input-group-sm mw-140">
                    <button
                      className="btn btn-primary text-white"
                      type="button"
                      onClick={() => handleQtyChange("dec")}
                    >
                      <DashLg />
                    </button>

                    <input
                      type="text"
                      className="form-control text-center"
                      value={cartItem?.quantity || quantity}
                      readOnly
                    />

                    <button
                      className="btn btn-primary text-white"
                      type="button"
                      onClick={() => handleQtyChange("inc")}
                    >
                      <PlusLg />
                    </button>
                  </div>
                </div>

                {/* Add to Cart / Buy Now */}
                <button
                  className="btn btn-sm btn-primary me-2"
                  onClick={handleAddToCart}
                >
                  <CartPlus className="me-1" /> Add to cart
                </button>
                <button className="btn btn-sm btn-warning me-2">
                  <Cart3 className="me-1" /> Buy now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="col-md-4">
          <CardServices />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailView;
