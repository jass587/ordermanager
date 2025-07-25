import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../../../../redux/store/cartSlice";
import { syncCartToBackend } from "../../../../redux/thunks/cartThunks";
import StripeService from "../../../../services/api/stripe";
import OrderService from "../../../../services/api/orderService";
import PaymentService from "../../../../services/api/paymentService";


const CheckoutForm = ({ cartItems }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();

    const [formData, setFormData] = useState({
        shippingName: "",
        shippingAddress: "",
        shippingAddress2: "",
        shippingCountry: "",
        shippingState: "",
        shippingZip: "",
        billingName: "",
        billingAddress: "",
        billingAddress2: "",
        billingCountry: "",
        billingState: "",
        billingZip: "",
    });

    const [sameAsShipping, setSameAsShipping] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    console.log(cartItems)
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (name === "sameAddress") {
            setSameAsShipping(checked);
            if (checked) {
                setFormData((prev) => ({
                    ...prev,
                    billingName: prev.shippingName,
                    billingAddress: prev.shippingAddress,
                    billingAddress2: prev.shippingAddress2,
                    billingCountry: prev.shippingCountry,
                    billingState: prev.shippingState,
                    billingZip: prev.shippingZip,
                }));
            }
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const totalAmount = cartItems.reduce(
        (acc, item) => acc + item.productInfo.price * item.quantity,
        0
    );

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        setLoading(true);
        try {
            // Step 1: Create PaymentIntent
            const clientSecret = await StripeService.createPaymentIntent({
                amount: totalAmount,
                items: cartItems,
            });

            // Step 2: Confirm Stripe Payment
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        name: formData.billingName,
                        email: formData.email,
                    },
                },
                receipt_email: formData.email,
            });

            const paymentIntent = result.paymentIntent;

            // Step 3: Handle result
            if (result.error) {
                setMessage(result.error.message);

                // Log failed payment to DB
                await PaymentService.create({
                    orderId: null,
                    amount: totalAmount,
                    method: "card",
                    status: "failed",
                    transactionId: paymentIntent?.id || "stripe_failed",
                });

            } else if (paymentIntent.status === "succeeded") {
                // Step 4: Create order
                const orderResponse = await OrderService.create({
                    totalAmount,
                    items: cartItems.map((item) => ({
                        productId: item.productId,
                        quantity: item.quantity,
                        price: item.productInfo.price,
                    })),
                });

                const orderId = orderResponse.data.result.orderId;

                // Step 5: Create payment record
                const data = await PaymentService.create({
                    orderId,
                    amount: totalAmount,
                    method: "card",
                    status: "succeeded",
                    transactionId: paymentIntent.id,
                });

                // Step 6: Finalize
                toast.success("Payment successful! 🎉");
                dispatch(clearCart());
                dispatch(syncCartToBackend([]));
                // setTimeout(() => {
                //     navigate("/order-success");
                // }, 2000);

            } else {
                // Optional: Log pending or unknown statuses
                await PaymentService.create({
                    orderId: null,
                    amount: totalAmount,
                    method: "card",
                    status: paymentIntent.status,
                    transactionId: paymentIntent.id,
                });

                toast.error(`Payment ${paymentIntent.status}. Order not placed.`);
            }

        } catch (err) {
            console.error("Stripe error:", err);
            setMessage("Payment failed.");
        } finally {
            setLoading(false);
        }
    };


    return (
        <form onSubmit={handleSubmit}>
            <div className="row">
                {/* LEFT SECTION */}
                <div className="col-md-8">

                    {/* Shipping Info */}
                    <div className="card mb-4 shadow-sm">
                        <div className="card-header bg-white fw-semibold">
                            <i className="bi bi-truck me-2"></i> Shipping Information
                        </div>
                        <div className="card-body row g-3">
                            <div className="col-md-12">
                                <input type="text" name="shippingName" className="form-control" placeholder="Name" value={formData.shippingName} onChange={handleChange} required />
                            </div>
                            <div className="col-md-6">
                                <input type="text" name="shippingAddress" className="form-control" placeholder="Address" value={formData.shippingAddress} onChange={handleChange} required />
                            </div>
                            <div className="col-md-6">
                                <input type="text" name="shippingAddress2" className="form-control" placeholder="Address 2 (Optional)" value={formData.shippingAddress2} onChange={handleChange} />
                            </div>
                            <div className="col-md-4">
                                <select name="shippingCountry" className="form-select" onChange={handleChange} required>
                                    <option value="">-- Country --</option>
                                    <option>United States</option>
                                </select>
                            </div>
                            <div className="col-md-4">
                                <select name="shippingState" className="form-select" onChange={handleChange} required>
                                    <option value="">-- State --</option>
                                    <option>California</option>
                                </select>
                            </div>
                            <div className="col-md-4">
                                <input type="text" name="shippingZip" className="form-control" placeholder="Zip" value={formData.shippingZip} onChange={handleChange} required />
                            </div>
                        </div>
                    </div>

                    {/* Billing Info */}
                    <div className="card mb-4 shadow-sm">
                        <div className="card-header bg-white fw-semibold d-flex justify-content-between align-items-center">
                            <span><i className="bi bi-receipt me-2"></i> Billing Information</span>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="sameAddress" name="sameAddress" checked={sameAsShipping} onChange={handleChange} />
                                <label className="form-check-label" htmlFor="sameAddress">Same as Shipping Information</label>
                            </div>
                        </div>
                        <div className="card-body row g-3">
                            <div className="col-md-12">
                                <input type="text" name="billingName" className="form-control" placeholder="Name" value={formData.billingName} onChange={handleChange} required />
                            </div>
                            <div className="col-md-6">
                                <input type="text" name="billingAddress" className="form-control" placeholder="Address" value={formData.billingAddress} onChange={handleChange} required />
                            </div>
                            <div className="col-md-6">
                                <input type="text" name="billingAddress2" className="form-control" placeholder="Address 2 (Optional)" value={formData.billingAddress2} onChange={handleChange} />
                            </div>
                            <div className="col-md-4">
                                <select name="billingCountry" className="form-select" onChange={handleChange} required>
                                    <option value="">-- Country --</option>
                                    <option>United States</option>
                                </select>
                            </div>
                            <div className="col-md-4">
                                <select name="billingState" className="form-select" onChange={handleChange} required>
                                    <option value="">-- State --</option>
                                    <option>California</option>
                                </select>
                            </div>
                            <div className="col-md-4">
                                <input type="text" name="billingZip" className="form-control" placeholder="Zip" value={formData.billingZip} onChange={handleChange} required />
                            </div>
                        </div>
                    </div>

                    {/* Stripe CardElement + Submit */}
                    <div className="card mb-4 shadow-sm border-info">
                        <div className="card-header bg-info text-white fw-semibold">
                            <i className="bi bi-credit-card-2-front me-2"></i> Payment Method
                        </div>
                        <div className="card-body">
                            <CardElement className="form-control p-3 border" />
                            {message && <div className="text-danger mt-2">{message}</div>}
                        </div>
                        <div className="card-footer bg-transparent border-0">
                            <button type="submit" className="btn btn-info w-100 py-2 fw-bold" disabled={!stripe || loading}>
                                {loading ? "Processing..." : `Pay Now $${totalAmount.toFixed(2)}`}
                            </button>
                        </div>
                    </div>
                </div>

                {/* RIGHT SECTION - CART */}
                <div className="col-md-4">
                    <div className="card shadow-sm">
                        <div className="card-header d-flex justify-content-between align-items-center" style={{ backgroundColor: "#e8f4fd" }}>
                            <span><i className="bi bi-cart3 me-2"></i> Cart</span>
                            <span className="badge bg-secondary rounded-pill">{cartItems.length}</span>
                        </div>
                        <ul className="list-group list-group-flush">
                            {cartItems.map((item, index) => (
                                <li key={index} className="list-group-item d-flex justify-content-between lh-sm">
                                    <div>
                                        <h6 className="my-0">{item.productInfo.title}</h6>
                                        <small className="text-muted">Qty: {item.quantity}</small>
                                    </div>
                                    <span className="text-muted">${(item.productInfo.price * item.quantity).toFixed(2)}</span>
                                </li>
                            ))}
                            <li className="list-group-item d-flex justify-content-between" style={{ backgroundColor: "#e6f4ea" }}>
                                <div className="text-success">
                                    <h6 className="my-0">Promo code</h6>
                                    <small>None</small>
                                </div>
                                <span className="text-success">−$0.00</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between">
                                <span>Total (USD)</span>
                                <strong>${totalAmount.toFixed(2)}</strong>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default CheckoutForm;
