// client/src/services/api/auth.js
import axiosInstance from "./axiosInstance";
import { jwtDecode } from "jwt-decode";

const AuthService = {
  login: async (email, password) => {
    const res = await axiosInstance.post("/auth/login", { email, password });
    const data = res.data;

    if (data.status === 200 && data.result.length > 0) {
      const token = data.result[0].token;
      localStorage.setItem("token", token);

      const decoded = jwtDecode(token);
      const { role } = decoded;
      localStorage.setItem("role", role);

      return { success: true, role };
    }

    return { success: false, message: data.message || "Login failed." };
  },

  getProfile: async () => {
    const res = await axiosInstance.get("/users");
    return res.data.result[0];
  },

  updateProfile: async (payload) => {
    return axiosInstance.put("/users/update", payload);
  },

  socialRedirect: (provider) => {
    window.location.href = `http://localhost:5000/api/auth/${provider}`;
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/home";
  },
};

export default AuthService;
