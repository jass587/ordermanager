import axiosInstance from "./axiosInstance";

const ProductService = {
  getAll: async () => {
    const res = await axiosInstance.get("/products");
    return res.data.result;
  },

  getById: async (id) => {
    const res = await axiosInstance.get(`/products/${id}`);
    return res.data.result[0]; // single product
  },

  update: async (id, data) => {
    const res = await axiosInstance.put(`/products/${id}`, data);
    return res.data.result[0]; // updated product
  },

  delete: async (id) => {
    const res = await axiosInstance.delete(`/products/${id}`);
    return res.data; // might include just message/status
  },
};

export default ProductService;
