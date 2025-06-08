import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../private/Common/AxiosInstance";

export const fetchOrganizationList = createAsyncThunk(
  "organization/fetch",
  async () => {
    const response = await axiosInstance.get("/users/organization");
    if (!localStorage.getItem("selectedOrgId")) {
      localStorage.setItem("selectedOrgId", response.data.data[0]._id);
    }

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
      state.isLoading = false;
      state.data = action.payload.data;
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
    });
    builder.addCase(deleteOrganization.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const { setSelectedOrgId } = organizationListSlice.actions;
export const organizationListReducer = organizationListSlice.reducer;
