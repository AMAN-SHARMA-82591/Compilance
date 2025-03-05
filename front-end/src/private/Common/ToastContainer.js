import { toast } from "react-toastify";

const baseCloseTime = 4000;

export const toastSuccess = (message) => {
  if (message === undefined) {
    console.debug("can't toast with no message");
    return;
  }
  toast.success(message, {
    autoClose: baseCloseTime,
  });
};

export const toastError = (message) => {
  toast.error(message || "Something Went Wrong!", {
    autoClose: baseCloseTime,
  });
};
