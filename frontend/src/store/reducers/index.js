import { combineReducers } from "@reduxjs/toolkit";
import { taskListReducer } from "../slices/taskListSlice";
import taskFilterReducer from "./taskReducer";
import { profileReducer } from "../slices/profileSlice";

const rootReducers = combineReducers({
    taskList: taskListReducer,
    taskFilterType: taskFilterReducer,
    tokenInfo: profileReducer,
});

export default rootReducers;