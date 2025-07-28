import { useEffect, useState } from "react";
import ETable from "../../../components/backend/Tables/Common/eTable";
import PaymentService from "../../../services/api/paymentService";
import PaymentModal from "../Modals/PaymentModal";

export const PaymentsTable = () => {
  const [payments, setPayments] = useState([]);
  const [selectedPaymentId, setSelectedPaymentId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("view");

  const fetchPayments = async () => {
    try {
      const res = await PaymentService.getAll();
      setPayments(res.data.result);
    } catch (err) {
      console.error("Failed to fetch payments:", err);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const handleView = (id) => {
    setSelectedPaymentId(id);
    setModalMode("view");
    setShowModal(true);
  };

  return (
    <>
      <PaymentModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        paymentId={selectedPaymentId}
        mode={modalMode}
      />

      <ETable
        title="Payments"
        data={payments}
        columns={[
          { label: "ID", key: "id" },
          {
            label: "Order ID",
            key: "orderId",
            render: (val) => val || "N/A",
          },
          { label: "Amount", key: "amount" },
          {
            label: "Method",
            key: "method",
            render: (val) => val?.toUpperCase() || "N/A",
          },
          {
            label: "Status",
            key: "status",
            render: (val) => (
              <span
                className={`badge bg-${
                  val === "succeeded" ? "success" : "danger"
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