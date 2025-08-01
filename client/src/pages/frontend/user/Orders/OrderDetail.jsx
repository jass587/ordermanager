import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import OrderService from "@services/api/orderService";
import { Card, Badge, Table, Spinner, Button } from "react-bootstrap";
import {
  CheckCircle,
  XCircle,
  Clock,
  Check2Circle,
  ArrowRepeat,
  ArrowLeft
} from "react-bootstrap-icons";

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchOrderDetail = async () => {
    try {
      const res = await OrderService.getUserOrderById(id);
      setOrder(res.data.result);
    } catch (err) {
      console.error("Failed to fetch order detail:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center p-5">
        <Spinner animation="border" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center p-5 text-muted">
        Order not found or access denied.
      </div>
    );
  }

  const totalAmount = order.OrderItems?.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const renderStatus = (status) => {
    switch (status) {
      case "pending":
        return <><Clock className="text-warning me-1" /> Pending</>;
      case "completed":
        return <><Check2Circle className="text-success me-1" /> Completed</>;
      case "cancelled":
        return <><ArrowRepeat className="text-danger me-1" /> Cancelled</>;
      default:
        return status;
    }
  };

  const renderPaymentBadge = (status) => {
    if (status === "succeeded") {
      return (
        <Badge bg="success" className="d-inline-flex align-items-center gap-1">
          <CheckCircle /> Paid
        </Badge>
      );
    }
    return (
      <Badge bg="danger" className="d-inline-flex align-items-center gap-1">
        <XCircle /> Unpaid
      </Badge>
    );
  };

  return (
    <div className="container py-4">
      {/* Back Button */}
      <div className="mb-3">
        <Button variant="outline-primary" size="sm" onClick={() => navigate("/orders/my-orders")}>
          <ArrowLeft className="me-1" /> Back to Orders
        </Button>
      </div>

      <Card className="shadow rounded-4 p-4">
        <div className="text-center mb-4">
          <h3 className="fw-bold">MyStore</h3>
          <h5 className="text-muted">Invoice</h5>
          <hr />
        </div>

        <div className="row mb-4">
          <div className="col-md-6">
            <p><strong>Order ID:</strong> #{order.id}</p>
            <p><strong>Status:</strong> {renderStatus(order.status)}</p>
            <p><strong>Payment:</strong> {renderPaymentBadge(order.Payments[0]?.status)}</p>
          </div>
          <div className="col-md-6 text-md-end">
            <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
            <p><strong>Total Amount:</strong> ₹{totalAmount.toFixed(2)}</p>
          </div>
        </div>

        <h5 className="mt-4">Items</h5>
        <Table hover responsive bordered className="mt-2">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Product</th>
              <th>Price (₹)</th>
              <th>Qty</th>
              <th>Subtotal (₹)</th>
            </tr>
          </thead>
          <tbody>
            {order.OrderItems?.map((item, idx) => (
              <tr key={item.id}>
                <td>{idx + 1}</td>
                <td>{item.Product?.title || "N/A"}</td>
                <td>{item.price.toFixed(2)}</td>
                <td>{item.quantity}</td>
                <td>{(item.price * item.quantity).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        <div className="text-end pe-2 mt-3">
          <h5><strong>Grand Total:</strong> ₹{totalAmount.toFixed(2)}</h5>
        </div>
      </Card>
    </div>
  );
};

export default OrderDetail;
