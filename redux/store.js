import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "@/redux/reducers/themeSlice";
import selectorSlice from "@/redux/reducers/selectorSlice";
import projectPreviewSlice from "@/redux/reducers/projectPreviewSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      theme: themeSlice,
      selector: selectorSlice,
      projectPreview: projectPreviewSlice,
    },
  });
};
