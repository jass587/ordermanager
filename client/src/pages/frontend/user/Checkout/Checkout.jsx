const CheckoutView = () => {
  return (
    <div className="bg-light py-5">
      <div className="container">
        <div className="row mb-4">
          <div className="col-md-12">
            <h2 className="fw-bold mb-3">Checkout</h2>
            <hr />
          </div>
        </div>

        <div className="row">
          {/* LEFT SECTION */}
          <div className="col-md-8">
            {/* Contact Info */}
            <div className="card mb-4 shadow-sm">
              <div className="card-header bg-white fw-semibold">
                <i className="bi bi-envelope me-2"></i> Contact Info
              </div>
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-md-6">
                    <input type="email" className="form-control" placeholder="Email Address" required />
                  </div>
                  <div className="col-md-6">
                    <input type="tel" className="form-control" placeholder="Mobile No" required />
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping Info */}
            <div className="card mb-4 shadow-sm">
              <div className="card-header bg-white fw-semibold">
                <i className="bi bi-truck me-2"></i> Shipping Information
              </div>
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-md-12">
                    <input type="text" className="form-control" placeholder="Name" required />
                  </div>
                  <div className="col-md-6">
                    <input type="text" className="form-control" placeholder="Address" required />
                  </div>
                  <div className="col-md-6">
                    <input type="text" className="form-control" placeholder="Address 2 (Optional)" />
                  </div>
                  <div className="col-md-4">
                    <select className="form-select" required>
                      <option value="">-- Country --</option>
                      <option>United States</option>
                    </select>
                  </div>
                  <div className="col-md-4">
                    <select className="form-select" required>
                      <option value="">-- State --</option>
                      <option>California</option>
                    </select>
                  </div>
                  <div className="col-md-4">
                    <input type="text" className="form-control" placeholder="Zip" required />
                  </div>
                </div>
              </div>
            </div>

            {/* Billing Info */}
            <div className="card mb-4 shadow-sm">
              <div className="card-header bg-white fw-semibold d-flex justify-content-between align-items-center">
                <span><i className="bi bi-receipt me-2"></i> Billing Information</span>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="sameAddress" />
                  <label className="form-check-label" htmlFor="sameAddress">Same as Shipping Information</label>
                </div>
              </div>
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-md-12">
                    <input type="text" className="form-control" placeholder="Name" required />
                  </div>
                  <div className="col-md-6">
                    <input type="text" className="form-control" placeholder="Address" required />
                  </div>
                  <div className="col-md-6">
                    <input type="text" className="form-control" placeholder="Address 2 (Optional)" />
                  </div>
                  <div className="col-md-4">
                    <select className="form-select" required>
                      <option value="">-- Country --</option>
                      <option>United States</option>
                    </select>
                  </div>
                  <div className="col-md-4">
                    <select className="form-select" required>
                      <option value="">-- State --</option>
                      <option>California</option>
                    </select>
                  </div>
                  <div className="col-md-4">
                    <input type="text" className="form-control" placeholder="Zip" required />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="card mb-4 shadow-sm border-info">
              <div className="card-header bg-info text-white fw-semibold">
                <i className="bi bi-credit-card-2-front me-2"></i> Payment Method
              </div>
              <div className="card-body">
                <div className="row g-3 mb-3 border-bottom pb-3">
                  <div className="col-md-6">
                    <div className="form-check">
                      <input id="credit" name="paymentMethod" type="radio" className="form-check-input" defaultChecked required />
                      <label className="form-check-label" htmlFor="credit">
                        Credit Card
                        <img src="../../images/payment/cards.webp" alt="cards" className="ms-2" height={26} />
                      </label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-check">
                      <input id="paypal" name="paymentMethod" type="radio" className="form-check-input" required />
                      <label className="form-check-label" htmlFor="paypal">
                        PayPal
                        <img src="../../images/payment/paypal_64.webp" alt="paypal" className="ms-2" height={26} />
                      </label>
                    </div>
                  </div>
                </div>
                <div className="row g-3">
                  <div className="col-md-6">
                    <input type="text" className="form-control" placeholder="Name on card" />
                  </div>
                  <div className="col-md-6">
                    <input type="number" className="form-control" placeholder="Card number" />
                  </div>
                  <div className="col-md-4">
                    <input type="number" className="form-control" placeholder="Exp. Month" />
                  </div>
                  <div className="col-md-4">
                    <input type="number" className="form-control" placeholder="Exp. Year" />
                  </div>
                  <div className="col-md-4">
                    <input type="number" className="form-control" placeholder="CVV" />
                  </div>
                </div>
              </div>
              <div className="card-footer bg-transparent border-0">
                <button type="button" className="btn btn-info w-100 py-2 fw-bold">
                  Pay Now <strong>$162</strong>
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT SECTION - CART */}
          <div className="col-md-4">
            <div className="card shadow-sm">
              <div className="card-header d-flex justify-content-between align-items-center">
                <span><i className="bi bi-cart3 me-2"></i>Cart</span>
                <span className="badge bg-secondary rounded-pill">3</span>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between lh-sm">
                  <div>
                    <h6 className="my-0">Product name</h6>
                    <small className="text-muted">Brief description</small>
                  </div>
                  <span className="text-muted">$150</span>
                </li>
                <li className="list-group-item d-flex justify-content-between lh-sm">
                  <div>
                    <h6 className="my-0">Second product</h6>
                    <small className="text-muted">Brief description</small>
                  </div>
                  <span className="text-muted">$12</span>
                </li>
                <li className="list-group-item d-flex justify-content-between lh-sm">
                  <div>
                    <h6 className="my-0">Third item</h6>
                    <small className="text-muted">Brief description</small>
                  </div>
                  <span className="text-muted">$50</span>
                </li>
                <li className="list-group-item d-flex justify-content-between bg-light">
                  <div className="text-success">
                    <h6 className="my-0">Promo code</h6>
                    <small>EXAMPLECODE</small>
                  </div>
                  <span className="text-success">−$50</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <span>Total (USD)</span>
                  <strong>$162</strong>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutView;
