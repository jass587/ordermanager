import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "@pages/frontend/user/Checkout/CheckoutForm";
import { useSelector } from "react-redux";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const CheckoutView = () => {
  const cartItems = useSelector((state) => state.cart.items);

  return (
    <div className="checkout-container bg-light py-5">
      <div className="container">
        <div className="row mb-4">
          <div className="col-md-12">
            <h2 className="fw-bold mb-3">Checkout</h2>
            <hr />
          </div>
        </div>
        <Elements stripe={stripePromise}>
          <CheckoutForm cartItems={cartItems} />
        </Elements>
      </div>
    </div>
  );
};

export default CheckoutView;
