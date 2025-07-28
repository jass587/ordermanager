import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OrderService from "../../../../services/api/orderService";
import { Card, Badge, Table, Spinner } from "react-bootstrap";

const OrderDetail = () => {
    const { id } = useParams();
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

    return (
        <div className="container py-4">
            <Card className="shadow rounded-4">
                <Card.Body>
                    <h4 className="fw-bold mb-3">Order Detail - #{order.id}</h4>
                    <p><strong>Status:</strong> {order.status}</p>
                    <p><strong>Payment:</strong> <Badge bg={order.Payments[0]?.status === "succeeded" ? "success" : "danger"}>{order.Payments[0]?.status || "Unpaid"}</Badge></p>
                    <p><strong>Total:</strong> ₹{order.totalAmount.toFixed(2)}</p>
                    <p><strong>Created:</strong> {new Date(order.createdAt).toLocaleString()}</p>

                    <h5 className="mt-4">Items</h5>
                    <Table hover responsive bordered className="mt-2">
                        <thead className="table-light">
                            <tr>
                                <th>Product</th>
                                <th>Quantity</th>
                                <th>Price (₹)</th>
                                <th>Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order.OrderItems?.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.Product.title}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.price.toFixed(2)}</td>
                                    <td>{(item.price * item.quantity).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </div>
    );
};

export default OrderDetail;
