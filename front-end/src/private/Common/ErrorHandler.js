export const handleApiError = (error) => {
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
