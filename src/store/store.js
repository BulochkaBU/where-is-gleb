import { configureStore } from "@reduxjs/toolkit";
import locationSliceReducer from "../api/locationSlice";
import { apiSlice } from "../api/apiSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    locations: locationSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
