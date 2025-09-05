import { configureStore } from "@reduxjs/toolkit";
import themeSlice, { ThemeState } from "@/redux/reducers/themeSlice";
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

export type RootState = {
  theme: ThemeState;
  selector: any;
  projectPreview: any;
};

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];
