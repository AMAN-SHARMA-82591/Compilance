import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL || "http://localhost:5000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Get orgId from Redux, Context, or localStorage
    let orgId = null;
    // Example for Redux:
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
export default axiosInstance;
