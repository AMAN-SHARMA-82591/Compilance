import { configureStore } from '@reduxjs/toolkit';
import rootReducers from './reducers/index';

export const store = configureStore({
    reducer: rootReducers,
});

export * from './slices/taskListSlice';
export * from './actions/index';