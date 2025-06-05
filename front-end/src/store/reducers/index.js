import { combineReducers } from "@reduxjs/toolkit";
import { taskListReducer } from "../slices/taskListSlice";
import taskFilterReducer from "./taskReducer";
import { profileReducer } from "../slices/profileSlice";
import { organizationListReducer } from "../slices/organizationListSlice";

const rootReducers = combineReducers({
  taskList: taskListReducer,
  taskFilterType: taskFilterReducer,
  basicInformation: profileReducer,
  organizationData: organizationListReducer,
});

export default rootReducers;
