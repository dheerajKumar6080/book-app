import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./slices/taskSlice"; // Adjust the path as needed

const store = configureStore({
  reducer: {
    tasks: taskReducer, // Add task slice reducer here
  },
});

export default store;