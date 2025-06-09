import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../private/Common/AxiosInstance";

export const fetchLoggedProfile = createAsyncThunk(
  "/profile/fetch",
  async () => {
    const response = await axiosInstance.get(`/users/profile/me`);
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
    profile: null,
    error: null,
    isLoading: false,
  },
  reducers: {
    setData: (state, action) => {
      state.profile = action.payload;
    },
    setProfileData: (state, action) => {
      state.profile = action.payload;
    },
    clearData: (state) => {
      state.profile = null;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchLoggedProfile.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchLoggedProfile.fulfilled, (state, action) => {
      state.isLoading = false;
      state.profile = action.payload.profile;
    });
    builder.addCase(fetchLoggedProfile.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const { setData, setProfileData, clearData } = profileSlice.actions;
export const profileReducer = profileSlice.reducer;
