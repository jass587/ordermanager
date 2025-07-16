import axiosInstance from "./axiosInstance";

const CategoryService = {
  getAll: () => axiosInstance.get("/categories"),
  getById: (id) => axiosInstance.get(`/categories/${id}`),
  update: (id, data) => axiosInstance.put(`/categories/${id}`, data),
  delete: (id) => axiosInstance.delete(`/categories/${id}`),
};

export default CategoryService;
