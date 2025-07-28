import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import OrderService from "../../../../services/api/orderService";
import { getLoggedInUser } from "../../../../utilities/authUtils";
import { Card, Table, Badge } from "@themesberg/react-bootstrap";
import { Spinner } from "react-bootstrap";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { name } = getLoggedInUser();
  const navigate = useNavigate(); // <-- for navigation

  const fetchOrders = async () => {
    try {
      const res = await OrderService.getUserOrders();
      setOrders(res.data.result);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return <Badge bg="warning" text="dark">Pending</Badge>;
      case "completed":
        return <Badge bg="success">Completed</Badge>;
      case "cancelled":
        return <Badge bg="danger">Cancelled</Badge>;
      default:
        return <Badge bg="secondary">{status}</Badge>;
    }
  };

  const getPaymentBadge = (status) => {
    if (status === "succeeded") return <Badge bg="success">Success</Badge>;
    return <Badge bg="danger">Unpaid</Badge>;
  };

  return (
    <div className="container py-4">
      <Card border="light" className="shadow rounded-4">
        <Card.Body>
          <Card.Title className="fs-4 mb-4 fw-semibold text-dark">My Orders</Card.Title>

          {loading ? (
            <div className="text-center py-4">
              <Spinner animation="border" />
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center text-muted py-4">
              You have no orders yet.
            </div>
          ) : (
            <div style={{ maxHeight: "400px", overflowY: "auto" }}>
              <Table hover responsive className="align-items-center text-nowrap mb-0">
                <thead className="table-light">
                  <tr>
                    <th>#Order ID</th>
                    <th>User</th>
                    <th>Total Amount</th>
                    <th>Status</th>
                    <th>Payment</th>
                    <th>Created At</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td className="fw-semibold">#{order.id}</td>
                      <td>{name || "N/A"}</td>
                      <td>₹{order.totalAmount.toFixed(2)}</td>
                      <td>{getStatusBadge(order.status)}</td>
                      <td>{getPaymentBadge(order.Payments[0]?.status)}</td>
                      <td>{new Date(order.createdAt).toLocaleString()}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => navigate(`/orders/my-orders/${order.id}`)}
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};


export default Orders;
