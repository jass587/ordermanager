import { useEffect, useState } from "react";
import ETable from "../../../components/backend/Tables/Common/eTable";
import PaymentService from "../../../services/api/paymentService";
import PaymentModal from "../Modals/PaymentModal";

export const PaymentsTable = () => {
  const [payments, setPayments] = useState([]);
  const [selectedPaymentId, setSelectedPaymentId] = useState(null);
  const [selectedSerialNumber, setSelectedSerialNumber] = useState(null);
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

  const handleView = (paymentId, serial) => {
    setSelectedPaymentId(paymentId);
    setSelectedSerialNumber(serial);
    setModalMode("view");
    setShowModal(true);
  };

  return (
    <>
      <PaymentModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        paymentId={selectedPaymentId}
        serialNumber={selectedSerialNumber}
        mode={modalMode}
      />

      <ETable
        title="Payments"
        data={payments}
        columns={[
          {
            label: "#",
            key: "serial",
            render: (_, __, index) => index + 1,
          },
          {
            label: "User Name",
            key: "Order.User.name",
            render: (_, row) => row.Order?.User?.name || "N/A",
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
                className={`badge bg-${val === "succeeded" ? "success" : "danger"}`}
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
        onView={(payment) => {
          const index = payments.findIndex(p => p.id === payment.id);
          handleView(payment.id, index + 1);
        }}

      />
    </>
  );
};
