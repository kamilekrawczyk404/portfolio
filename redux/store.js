import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "@/redux/reducers/themeSlice";
import selectorSlice from "@/redux/reducers/selectorSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      theme: themeSlice,
      selector: selectorSlice,
    },
  });
};
