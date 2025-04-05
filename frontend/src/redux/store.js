import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/useSlice";
import taskReducer from "./task/taskSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    task: taskReducer,
  },
});
