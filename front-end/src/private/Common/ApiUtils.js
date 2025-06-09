import axiosInstance from "./AxiosInstance";
import { isEmpty } from "lodash";
import { handleApiError } from "./ErrorHandler";
import { toastError } from "./ToastContainer";

export const fetchOrgData = async () => {
  try {
    const response = await axiosInstance.get("/users/organization");
    if (!isEmpty(response.data)) {
      return response.data;
    }
    return [];
  } catch (error) {
    const message = handleApiError(error);
    toastError(message);
    return [];
  }
};
