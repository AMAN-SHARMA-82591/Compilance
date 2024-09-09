import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../private/Common/AxiosInstance";

export const fetchLoggedProfile = createAsyncThunk('/users/profile/me', async (data) => {
    const response = await axiosInstance.get('/users/profile/me');
    return response.data;
});

const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        data: {},
        error: null,
        isLoading: false,
    },
    extraReducers(builder) {
        builder.addCase(fetchLoggedProfile.pending, (state) => {
            state.isLoading = true
        });
        builder.addCase(fetchLoggedProfile.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data.profile = action.payload;
        });
        builder.addCase(fetchLoggedProfile.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        });
    }
});

export const profileReducer = profileSlice.reducer;
// export const { reducer: profileReducer } = profileSlice;
// export default profileReducer;
