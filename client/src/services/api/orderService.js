// client/src/services/api/orders.js
import axiosInstance from "@services/api/axiosInstance";

const OrderService = {
  create: (data) => axiosInstance.post("/orders", data),
  getById: (id) => axiosInstance.get(`/orders/${id}`),//Admin view
  getAll: () => axiosInstance.get("/orders"), // Admin view
  getUserOrders: () => axiosInstance.get("/orders/my-orders"),
  getUserOrderById: (id) => axiosInstance.get(`/orders/my-orders/${id}`)
};

export default OrderService;
