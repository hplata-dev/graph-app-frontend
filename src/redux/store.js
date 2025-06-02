import { configureStore } from "@reduxjs/toolkit";
import graphReducer from "./features/graphSlice";
import { graphApi } from "./api/graphApi";
const store = configureStore({
  reducer: {
    [graphApi.reducerPath]: graphApi.reducer,
    graph: graphReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(graphApi.middleware),
});

export default store;
