import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "@/redux/reducers/themeSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      theme: themeSlice,
    },
  });
};
