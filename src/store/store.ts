/** @format */

import { configureStore } from "@reduxjs/toolkit";
import reduxReducer from "./reduxSlice";

const store = configureStore({
  reducer: {
    recipes: reduxReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
