import axios from "axios";
import { toastError } from "./ToastContainer";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL || "http://localhost:5000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor (for orgId)
axiosInstance.interceptors.request.use(
  (config) => {
    let orgId = null;
    try {
      orgId = localStorage.getItem("selectedOrgId");
    } catch {}
    if (orgId) {
      config.headers["orgid"] = orgId;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// RESPONSE INTERCEPTOR for 401 handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      toastError("Your session has expired. Please log-in again");
      localStorage.removeItem("uid");
      localStorage.removeItem("selectedOrgId");
      setTimeout(() => {
        window.location.href = "/login";
      }, 3000);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
