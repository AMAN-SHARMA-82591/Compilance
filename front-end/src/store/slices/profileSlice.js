import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../private/Common/AxiosInstance";

export const fetchLoggedProfile = createAsyncThunk(
  "/users/profile/me",
  async (data) => {
    const response = await axiosInstance.get("/users/profile/me");
    return response.data;
  }
);

// export const fetchProfileList = createAsyncThunk(
//   "/users/profile",
//   async (data) => {
//     const response = await axiosInstance.get("/users/profile");
//     return response.data;
//   }
// );

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    data: null,
    error: null,
    isLoading: false,
  },
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
    setProfileData: (state, action) => {
      console.log("SetProfile", action.payload, state.data);
      // state.data.profile = action.payload;
    },
    clearData: (state) => {
      state.data = null;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchLoggedProfile.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchLoggedProfile.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data.profile = action.payload;
    });
    builder.addCase(fetchLoggedProfile.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const { setData, setProfileData, clearData } = profileSlice.actions;
export const profileReducer = profileSlice.reducer;
