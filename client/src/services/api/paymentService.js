// client/src/services/api/payments.js
import axiosInstance from "@services/api/axiosInstance";

const PaymentService = {
  create: (data) => axiosInstance.post("/payments", data),
  getById: (id, isAdmin = false) =>
    axiosInstance.get(`/payments/${id}${isAdmin ? "?admin=true" : ""}`),
  getAll: (query = "") => axiosInstance.get(`/payments${query}`),
};

export default PaymentService;
