import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { incrementQty, decrementQty, removeFromCart } from "../../../../store/cartSlice";

const CartView = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.qty * item.price,
    0
  );
  const discount = 0;
  const couponDiscount = 0;

  return (
    <div className="container py-4 mt-80" >
      <h2 className="fw-bold mb-3 border-bottom pb-2">Shopping Cart</h2>
      <div className="row">
        <div className="col-lg-9">
          <div className="card shadow-sm mb-4" style={{ maxHeight: "250px", overflowY: "auto" }}>
            <div className="table-responsive">
              <table className="table align-middle mb-0">
                <thead className="text-muted border-bottom">
                  <tr>
                    <th>Product</th>
                    <th style={{ width: "140px" }}>Quantity</th>
                    <th style={{ width: "150px" }} className="text-end">Price</th>
                    <th className="text-end">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <div className="d-flex align-items-center">
                          <img src={item.image} alt={item.title} width="70" className="me-3 rounded shadow-sm" />
                          <div>
                            <Link to={`/product/${item.id}`} className="text-decoration-none fw-semibold text-dark">
                              {item.title}
                            </Link>
                            <p className="small text-muted mb-0">Size: XL, Color: Blue, Brand: H&M</p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="input-group input-group-sm">
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => dispatch(decrementQty(item.id))}
                          >
                            <i className="bi bi-dash"></i>
                          </button>
                          <input
                            type="text"
                            className="form-control text-center"
                            value={item.qty}
                            readOnly
                          />
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => dispatch(incrementQty(item.id))}
                          >
                            <i className="bi bi-plus"></i>
                          </button>
                        </div>
                      </td>
                      <td className="text-end">
                        <div className="fw-bold fs-6" style={{ color: '#007bff' }}>
                          ${(item.qty * item.price).toFixed(2)}
                        </div>
                        <small className="text-muted d-block">
                          ${item.price} each
                        </small>
                      </td>
                      <td className="text-end">
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => dispatch(removeFromCart(item.id))}
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="d-flex justify-content-between">
            <Link to="/products" className="btn btn-outline-primary">
              <i className="bi bi-chevron-left"></i> Continue Shopping
            </Link>
            <Link to="/checkout" className="btn btn-primary">
              Make Purchase <i className="bi bi-chevron-right"></i>
            </Link>
          </div>

          <div className="alert alert-success mt-4">
            <i className="bi bi-truck"></i> Free Delivery within 1–2 weeks
          </div>
        </div>

        <div className="col-lg-3">
          <div className="card shadow-sm">
            <div className="card-body">
              <h6 className="border-bottom pb-2 mb-3 fw-semibold">Order Summary</h6>
              <dl className="row mb-0">
                <dt className="col-6">Total price:</dt>
                <dd className="col-6 text-end">${totalPrice.toFixed(2)}</dd>

                <dt className="col-6 text-success">Discount:</dt>
                <dd className="col-6 text-success text-end">-${discount}</dd>

                <dt className="col-6 text-success">Coupon:</dt>
                <dd className="col-6 text-success text-end">-${couponDiscount}</dd>

                <hr className="my-2" />

                <dt className="col-6">Total:</dt>
                <dd className="col-6 text-end fw-bold fs-5">
                  ${(totalPrice - discount - couponDiscount).toFixed(2)}
                </dd>
              </dl>

              <hr />
              <div className="text-center">
                <img src="/images/payment/payments.webp" alt="Payments" height={26} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-light border-top p-4 mt-4">
        <h6>Payment and refund policy</h6>
        <p className="mb-0">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...
        </p>
      </div>
    </div>
  );
};

export default CartView;
