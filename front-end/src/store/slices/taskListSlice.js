import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../private/Common/AxiosInstance";

export const fetchTaskList = createAsyncThunk('tasks/fetch', async () => {
    const response = await axiosInstance.get('/tasks');
    return response.data;
});

export const createTask = createAsyncThunk('tasks/create', async (data) => {
    const response = await axiosInstance.post('/tasks', data);
    return response.data;
});

export const deleteTask = createAsyncThunk('tasks/delete', async (data) => {
    const response = await axiosInstance.delete(`/tasks/${data._id}`);
    return response.data;
});

export const editTask = createAsyncThunk('tasks/edit', async ({ id, values }) => {
    const response = await axiosInstance.patch(`/tasks/${id}`, values);
    return response.data;
});

const taskListSlice = createSlice({
    name: 'taskList',
    initialState: {
        data: { pageInfo: {}, taskList: [] },
        error: null,
        isLoading: false,
    },
    extraReducers(builder) {
        builder.addCase(fetchTaskList.pending, (state) => {
            state.isLoading = true
        });
        builder.addCase(fetchTaskList.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data.taskList = action.payload.taskList;
        });
        builder.addCase(fetchTaskList.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        });
        builder.addCase(createTask.pending, (state) => {
            state.isLoading = true
        });
        builder.addCase(createTask.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data.taskList.push(action.payload);
        });
        builder.addCase(createTask.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        });
        builder.addCase(deleteTask.pending, (state) => {
            state.isLoading = true
        });
        builder.addCase(deleteTask.fulfilled, (state, action) => {
            const taskIndex = state.data.taskList.indexOf(action.payload);
            state.isLoading = false;
            state.data.taskList.splice(taskIndex, 1);
        });
        builder.addCase(deleteTask.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        });
        builder.addCase(editTask.pending, (state) => {
            state.isLoading = true
        });
        builder.addCase(editTask.fulfilled, (state, action) => {
            const data = action.payload;
            state.data.taskList = state.data.taskList.map((task) => task._id === data._id ? data : task);
            state.isLoading = false;
        });
        builder.addCase(editTask.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        });
    }
});

export const taskListReducer = taskListSlice.reducer;
