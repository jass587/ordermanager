// client/src/services/api/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: Attach token
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

// Response Interceptor: Handle errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    switch (status) {
      case 400:
        alert("Bad Request");
        Navigate("/home")
        break;
      case 401:
        localStorage.removeItem("token");
        window.location.href = "/signin"; // force redirect
        break;
      case 403:
        window.location.href = "/forbidden";
        break;
      case 404:
        window.location.href = "/not-found";
        break;
      case 500:
        window.location.href = "/server-error";
        break;
      default:
        window.location.href = "/default-error";
        break;
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
