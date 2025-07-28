import { useEffect, useState } from "react";
import { Modal, Button, Spinner } from "react-bootstrap";
import PaymentService from "../../../services/api/paymentService";

export default function PaymentModal({ show, handleClose, paymentId, mode = "view" }) {
  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);
  const isViewMode = mode === "view";

  useEffect(() => {
    if (!paymentId || !show) return;

    setLoading(true);
    PaymentService.getById(paymentId)
      .then((res) => {
        console.log("Payment Response:", res.data.result);
        setPayment(res.data?.result || null);
      })
      .catch((err) => {
        console.error("Failed to fetch payment:", err);
        setPayment(null);
      })
      .finally(() => setLoading(false));
  }, [paymentId, show]);

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Payment #{paymentId || "N/A"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading ? (
          <div className="text-center py-4">
            <Spinner animation="border" />
          </div>
        ) : payment ? (
          <>
            <h5>Order ID: {payment.orderId || "N/A"}</h5>
            <p>
              Status:{" "}
              <strong className={`text-${payment.status === "succeeded" ? "success" : "danger"}`}>
                {payment.status}
              </strong>
            </p>
            <p>Amount Paid: ₹{payment.amount}</p>
            <p>Payment Method: {payment.method}</p>
            <p>Transaction ID: {payment.transactionId || "N/A"}</p>
            <p>Created At: {new Date(payment.createdAt).toLocaleString()}</p>
          </>
        ) : (
          <p className="text-danger">Payment not found.</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
