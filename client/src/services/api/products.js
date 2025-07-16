import axiosInstance from "./axiosInstance";

const ProductService = {
  getAll: () => axiosInstance.get("/products"),
  getById: (id) => axiosInstance.get(`/products/${id}`),
  update: (id, data) => axiosInstance.put(`/products/${id}`, data),
  delete: (id) => axiosInstance.delete(`/products/${id}`),
};

export default ProductService;
