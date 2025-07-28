import { useEffect, useState } from "react";
import ETable from "../../../components/backend/Tables/Common/eTable";
import OrderService from "../../../services/api/orderService";
import OrderModal from "../Modals/OrderModal";

export const OrdersTable = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("view");

  const fetchOrders = async () => {
    try {
      const res = await OrderService.getAll();
      setOrders(res.data.result);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleView = (id) => {
    setSelectedOrderId(id);
    setModalMode("view");
    setShowModal(true);
  };

  return (
    <>
      <OrderModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        orderId={selectedOrderId}
        mode={modalMode}
      />

      <ETable
        title="Orders"
        data={orders}
        columns={[
          { label: "ID", key: "id" },
          { label: "User ID", key: "userId" },
          { label: "Total Amount", key: "totalAmount" },
          {
            label: "Status",
            key: "status",
            render: (val) => (
              <span
                className={`badge bg-${
                  val === "completed" ? "success" : val === "pending" ? "warning" : "secondary"
                }`}
              >
                {val}
              </span>
            ),
          },
          {
            label: "Created At",
            key: "createdAt",
            render: (val) => new Date(val).toLocaleString(),
          },
        ]}
        onView={handleView}
      />
    </>
  );
};