import { Link } from "react-router-dom";
// import { CheckCircleFill } from "react-bootstrap-icons";

const OrderSuccess = () => {
  return (
    <div className="container text-center py-5">
      {/* <CheckCircleFill size={72} className="text-success mb-4" /> */}
      <h2 className="text-success fw-bold">Your Order Has Been Placed!</h2>
      <p className="text-muted fs-5 mt-3">Thank you for your purchase. A confirmation email has been sent to you.</p>

      <div className="mt-4">
        <Link to="/" className="btn btn-outline-primary me-3">Continue Shopping</Link>
        <Link to="/orders/my-orders" className="btn btn-primary">View My Orders</Link>
      </div>
    </div>
  );
};

export default OrderSuccess;
