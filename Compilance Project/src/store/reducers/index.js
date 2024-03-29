import { combineReducers } from "@reduxjs/toolkit";
import { taskListReducer } from "../slices/taskListSlice";
import taskFilterReducer from "./taskReducer";

const rootReducers = combineReducers({
    taskList: taskListReducer,
    taskFilterType: taskFilterReducer,
});

export default rootReducers;