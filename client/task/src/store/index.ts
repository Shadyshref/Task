import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import { quizReducer } from "./quizReducer";
import { announcementReducer } from "./announcementReducer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    quiz: quizReducer,
    announcement: announcementReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
