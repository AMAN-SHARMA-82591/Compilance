import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../private/Common/AxiosInstance";

export const fetchOrganizationList = createAsyncThunk(
  "organization/fetch",
  async () => {
    const response = await axiosInstance.get("/users/organization");
    return response.data;
  }
);

export const createOrganization = createAsyncThunk(
  "organization/create",
  async (data) => {
    const response = await axiosInstance.post("/users/organization", data);
    return response.data;
  }
);

export const deleteOrganization = createAsyncThunk(
  "organization/delete",
  async ({ id }) => {
    const response = await axiosInstance.delete(`/users/organization/${id}`);
    return response.data;
  }
);

const organizationListSlice = createSlice({
  name: "organization",
  initialState: {
    data: [],
    error: null,
    isLoading: false,
    selectedOrgId: "",
  },
  reducers: {
    setSelectedOrgId: (state, action) => {
      state.selectedOrgId = action.payload;
      localStorage.setItem("selectedOrgId", action.payload);
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchOrganizationList.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchOrganizationList.fulfilled, (state, action) => {
      const orgData = action.payload.data;
      state.isLoading = false;
      state.data = orgData;
      if (orgData.length > 0 && !localStorage.getItem("selectedOrgId")) {
        localStorage.setItem("selectedOrgId", orgData[0]._id);
        state.selectedOrgId = orgData[0]._id;
      }
    });
    builder.addCase(fetchOrganizationList.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });

    builder.addCase(createOrganization.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(createOrganization.fulfilled, (state, action) => {
      state.isLoading = false;
      state.selectedOrgId = action.payload.orgData._id;
      state.data = [...state.data, action.payload.orgData];
    });
    builder.addCase(createOrganization.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });

    builder.addCase(deleteOrganization.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(deleteOrganization.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = state.data.filter((org) => org._id !== action.payload._id);
      if (state.data.length > 0) {
        state.selectedOrgId = state.data[0]._id;
      } else {
        state.selectedOrgId = "";
      }
    });
    builder.addCase(deleteOrganization.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const { setSelectedOrgId } = organizationListSlice.actions;
export const organizationListReducer = organizationListSlice.reducer;
