import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user_store/index";

export const store = configureStore({
  reducer: {
    userReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
