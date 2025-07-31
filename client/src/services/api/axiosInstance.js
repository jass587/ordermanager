import axios from "axios";
import { toast } from "react-toastify";

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

console.log(import.meta.env.VITE_API_URL);

// ✅ Request Interceptor: Attach token to headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Response Interceptor: Handle errors gracefully
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.message;

    switch (status) {
      case 400:
        toast.error(message || "Bad Request");
        break;

      case 401:
        toast.error("Session expired. Please log in again.");
        localStorage.removeItem("token");

        // Optional: Redirect to signin after a short delay
        setTimeout(() => {
          if (window.location.pathname !== "/signin") {
            window.location.href = "/signin";
          }
        }, 2000);
        break;

      case 403:
        toast.error("You are not authorized to access this resource.");
        break;

      case 404:
        toast.error("Resource not found.");
        break;

      case 500:
        toast.error("Server error. Please try again later.");
        break;

      default:
        toast.error("Something went wrong. Please try again.");
        break;
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
