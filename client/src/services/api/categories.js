import axiosInstance from "./axiosInstance";

const CategoryService = {
  getAll: async () => {
    const res = await axiosInstance.get("/categories");
    return res.data.result;
  },

  getById: async (id) => {
    const res = await axiosInstance.get(`/categories/${id}`);
    return res.data.result[0]; // single category
  },

  update: async (id, data) => {
    const res = await axiosInstance.put(`/categories/${id}`, data);
    return res.data.result[0]; // updated category
  },

  delete: async (id) => {
    const res = await axiosInstance.delete(`/categories/${id}`);
    return res.data; // might include message/status only
  },
};

export default CategoryService;
