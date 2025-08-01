import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  updateQuantity,
  removeItem,
} from "../../../../redux/store/cartSlice";

// Import react-bootstrap-icons
import {
  Plus,
  Dash,
  Trash,
  ChevronLeft,
  ChevronRight,
  Truck,
  CreditCard2BackFill,
  CreditCardFill,
  CreditCard,
} from "react-bootstrap-icons";

const CartView = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.quantity * item.productInfo?.price,
    0
  );
  const discount = 0;
  const couponDiscount = 0;

  const handleQuantityChange = (item, type) => {
    const { productId, quantity } = item;
    const newQty = type === "inc" ? quantity + 1 : quantity - 1;
    if (newQty >= 1) {
      dispatch(updateQuantity({ productId, quantity: newQty }));
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="container py-5 text-center">
        <img
          src="/images/empty_cart.png"
          alt="Empty Cart"
          className="mb-4"
          style={{ maxWidth: "100px" }}
        />
        <h3 className="fw-bold mb-3">Your cart is empty</h3>
        <p className="text-muted mb-4">
          Looks like you haven’t added anything to your cart yet.
        </p>
        <Link to="/products" className="btn btn-primary">
          Start Shopping <ChevronRight className="ms-1" />
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h2 className="fw-bold mb-3 border-bottom pb-2">Shopping Cart</h2>
      <div className="row">
        {/* Cart Items */}
        <div className="col-lg-9">
          <div
            className="card shadow-sm mb-4"
            style={{ maxHeight: "250px", overflowY: "auto" }}
          >
            <div className="table-responsive">
              <table className="table align-middle mb-0">
                <thead className="text-muted border-bottom">
                  <tr>
                    <th>Product</th>
                    <th style={{ width: "140px" }}>Quantity</th>
                    <th style={{ width: "150px" }} className="text-end">
                      Price
                    </th>
                    <th className="text-end">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems
                    .filter((item) => item.productInfo)
                    .map((item) => (
                      <tr key={item.productId}>
                        <td>
                          <div className="d-flex align-items-center">
                            <img
                              src={item.productInfo.image}
                              alt={item.productInfo.title}
                              width="70"
                              className="me-3 rounded shadow-sm"
                            />
                            <div>
                              <Link
                                to={`/product/${item.productId}`}
                                className="text-decoration-none fw-semibold text-dark"
                              >
                                {item.productInfo.title}
                              </Link>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="input-group input-group-sm">
                            <button
                              className="btn btn-outline-secondary"
                              onClick={() => handleQuantityChange(item, "dec")}
                            >
                              <Dash />
                            </button>
                            <input
                              type="text"
                              className="form-control text-center"
                              value={item.quantity}
                              readOnly
                            />
                            <button
                              className="btn btn-outline-secondary"
                              onClick={() => handleQuantityChange(item, "inc")}
                            >
                              <Plus />
                            </button>
                          </div>
                        </td>
                        <td className="text-end">
                          <div className="fw-bold fs-6 text-primary">
                            ₹
                            {(
                              item.quantity * item.productInfo.price
                            ).toFixed(2)}
                          </div>
                          <small className="text-muted d-block">
                            ₹{item.productInfo.price} each
                          </small>
                        </td>
                        <td className="text-end">
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => dispatch(removeItem(item.productId))}
                          >
                            <Trash />
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="d-flex justify-content-between">
            <Link to="/products" className="btn btn-outline-primary">
              <ChevronLeft /> Continue Shopping
            </Link>
            <Link to="/checkout" className="btn btn-primary">
              Make Purchase <ChevronRight />
            </Link>
          </div>

          {/* Free Delivery Banner */}
          <div className="alert alert-success mt-4">
            <Truck className="me-2" /> Free Delivery within 1–2 weeks
          </div>
        </div>

        {/* Order Summary */}
        <div className="col-lg-3">
          <div className="card shadow-sm">
            <div className="card-body">
              <h6 className="border-bottom pb-2 mb-3 fw-semibold">
                Order Summary
              </h6>
              <dl className="row mb-0">
                <dt className="col-6">Total price:</dt>
                <dd className="col-6 text-end">₹{totalPrice.toFixed(2)}</dd>

                <dt className="col-6 text-success">Discount:</dt>
                <dd className="col-6 text-success text-end">-₹{discount}</dd>

                <dt className="col-6 text-success">Coupon:</dt>
                <dd className="col-6 text-success text-end">
                  -₹{couponDiscount}
                </dd>

                <hr className="my-2" />

                <dt className="col-6">Total:</dt>
                <dd className="col-6 text-end fw-bold fs-5">
                  ₹{(totalPrice - discount - couponDiscount).toFixed(2)}
                </dd>
              </dl>

              <hr />
              <div className="text-center mt-3">
                <img
                  src="/images/payments/payments.webp"
                  alt="Payment Methods"
                  style={{ width : "100vh", height: "32px", objectFit: "cover" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Text */}
      <div className="bg-light border-top p-4 mt-4">
        <h6>Payment and refund policy</h6>
        <p className="mb-0">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua...
        </p>
      </div>
    </div>
  );
};

export default CartView;
