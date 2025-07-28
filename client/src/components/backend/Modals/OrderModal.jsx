import { useEffect, useState } from "react";
import { Modal, Button, Table, Spinner } from "react-bootstrap";
import OrderService from "../../../services/api/orderService";

export default function OrderModal({ show, handleClose, orderId, mode = "view" }) {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const isViewMode = mode === "view";

  useEffect(() => {
    if (orderId && show) {
      setLoading(true);
      OrderService.getById(orderId)
        .then((res) => {
          setOrder(res.data.result);
        })
        .catch((err) => console.error("Failed to fetch order:", err))
        .finally(() => setLoading(false));
    }
  }, [orderId, show]);

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Order #{orderId}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading ? (
          <div className="text-center py-4">
            <Spinner animation="border" />
          </div>
        ) : order ? (
          <>
            <h5>User ID: {order.userId}</h5>
            <p>Status: <strong>{order.status}</strong></p>
            <p>Total: ₹{order.totalAmount}</p>

            <h6 className="mt-4">Items:</h6>
            <Table bordered size="sm">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Qty</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {order.OrderItems?.map((item) => (
                  <tr key={item.id}>
                    <td>{item.productId}</td>
                    <td>{item.quantity}</td>
                    <td>₹{item.price}</td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <h6 className="mt-4">Payment:</h6>
            <p>Status: {order.Payments[0]?.status || "N/A"}</p>
            <p>Method: {order.Payments[0]?.method || "N/A"}</p>
            <p>Transaction ID: {order.Payments[0]?.transactionId || "N/A"}</p>
          </>
        ) : (
          <p>Order not found.</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
