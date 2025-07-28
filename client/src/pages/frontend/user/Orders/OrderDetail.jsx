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

    const totalAmount = order.OrderItems?.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return (
        <div className="container py-4 order-invoice-wrapper">
            <Card className="shadow rounded-4 p-4">
                <div className="text-center mb-4">
                    <h3 className="fw-bold">MyStore</h3>
                    <h5 className="text-muted">Invoice</h5>
                    <hr />
                </div>

                <div className="row mb-4">
                    <div className="col-md-6">
                        <p><strong>Order ID:</strong> #{order.id}</p>
                        <p><strong>Status:</strong> {order.status}</p>
                        <p><strong>Payment:</strong>{" "}
                            <Badge bg={order.Payments[0]?.status === "succeeded" ? "success" : "danger"}>
                                {order.Payments[0]?.status || "Unpaid"}
                            </Badge>
                        </p>
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
                                <td>{item.Product.title}</td>
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
