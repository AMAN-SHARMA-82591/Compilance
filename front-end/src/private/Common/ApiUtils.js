import axiosInstance from "./AxiosInstance";
import { isEmpty } from "lodash";

export const fetchOrgData = async () => {
  try {
    const response = await axiosInstance.get("/users/organization");
    if (!isEmpty(response.data)) {
      return response.data;
    }
    return [];
  } catch (error) {
    console.error("Error fetching organization data:", error);
    return [];
  }
};
