// client/src/services/api/orderItems.js
import axiosInstance from "./axiosInstance";

const OrderItemService = {
    // Admin usage only
    getAll: (query = "") => axiosInstance.get(`/order-items${query}`),
    getById: (id) => axiosInstance.get(`/order-items/${id}`),
};

export default OrderItemService;
