import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import OrderService from '@services/api/orderService';
import { getLoggedInUser } from '@utils/authUtils';

import { Card, Table, Badge, Spinner, Button } from 'react-bootstrap';
import { Eye, BoxArrowLeft } from 'react-bootstrap-icons';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { name } = getLoggedInUser();
  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      const res = await OrderService.getUserOrders();
      setOrders(res.data.result);
    } catch (err) {
      console.error('Failed to fetch orders:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return (
          <Badge bg="warning" text="dark">
            Pending
          </Badge>
        );
      case 'completed':
        return <Badge bg="success">Completed</Badge>;
      case 'cancelled':
        return <Badge bg="danger">Cancelled</Badge>;
      default:
        return <Badge bg="secondary">{status}</Badge>;
    }
  };

  const getPaymentBadge = (status) => {
    return status === 'succeeded' ? (
      <Badge bg="success">Success</Badge>
    ) : (
      <Badge bg="danger">Unpaid</Badge>
    );
  };

  return (
    <div className="container py-4">
      <Card border="light" className="shadow rounded-4">
        <Card.Body>
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-2 mb-4">
            <Card.Title className="fs-4 fw-semibold text-dark mb-0">
              My Orders
            </Card.Title>

            <Link
              to="/products"
              className="btn btn-dark btn-sm fw-semibold rounded-pill shadow-sm align-self-start align-self-md-auto"
            >
              <BoxArrowLeft className="me-1" size={16} /> Keep Shopping
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-4">
              <Spinner animation="border" />
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center text-muted py-4">
              You have no orders yet.
            </div>
          ) : (
            <div className="overflow-auto" style={{ maxHeight: '400px' }}>
              <Table hover responsive className="align-middle text-nowrap mb-0">
                <thead className="table-light">
                  <tr className="d-none d-md-table-row">
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
                      <td className="d-none d-md-table-cell">
                        {name || 'N/A'}
                      </td>
                      <td>₹{order.totalAmount.toFixed(2)}</td>
                      <td>{getStatusBadge(order.status)}</td>
                      <td>{getPaymentBadge(order.Payments[0]?.status)}</td>
                      <td className="d-none d-md-table-cell">
                        {new Date(order.createdAt).toLocaleString()}
                      </td>
                      <td>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() =>
                            navigate(`/orders/my-orders/${order.id}`)
                          }
                          title="View Order"
                        >
                          <Eye className="me-1" size={16} />
                          View
                        </Button>
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
