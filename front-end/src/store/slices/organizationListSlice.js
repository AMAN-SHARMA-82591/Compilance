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
  },
  extraReducers(builder) {
    builder.addCase(fetchOrganizationList.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchOrganizationList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload.organization;
    });
    builder.addCase(fetchOrganizationList.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
    builder.addCase(createOrganization.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createOrganization.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data.push(action.payload.orgData);
    });
    builder.addCase(createOrganization.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
    builder.addCase(deleteOrganization.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteOrganization.fulfilled, (state, action) => {
      const taskIndex = state.data.indexOf(action.payload);
      state.isLoading = false;
      state.data.splice(taskIndex, 1);
    });
    builder.addCase(deleteOrganization.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const organizationListReducer = organizationListSlice.reducer;
