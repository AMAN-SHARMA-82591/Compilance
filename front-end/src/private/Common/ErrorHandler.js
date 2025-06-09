import axiosInstance from "./AxiosInstance";
import { toastError } from "./ToastContainer";

export const handleApiError = async (error) => {
  if (error.response.status === 401) {
    toastError("Your sesion has expired. Please log-in again");
    await axiosInstance.post("/auth/logout");
    localStorage.removeItem("token");
    setTimeout(() => {
      window.location.href = "/login";
    }, 3000);
  }
  if (error.response) {
    const { status, data } = error.response;
    return {
      success: false,
      status,
      message: data?.message || "An error occurred on the server.",
    };
  } else if (error.request) {
    return {
      success: false,
      status: null,
      message: "No response from the server. Please check your connection.",
    };
  } else {
    return {
      success: false,
      status: null,
      message: error.message || "An unexpected error occurred.",
    };
  }
};
