// client/src/services/api/orders.js
import axiosInstance from "./axiosInstance";

const OrderService = {
  create: (data) => axiosInstance.post("/orders", data),
  getById: (id) => axiosInstance.get(`/orders/${id}`),
  getAll: () => axiosInstance.get("/orders"), // Admin view
};

export default OrderService;
