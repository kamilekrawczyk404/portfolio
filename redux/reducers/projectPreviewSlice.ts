import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ProjectPreview {
  canPreviewBeVisible: boolean;
  isAttachedPreviewContainerVisible: boolean;
}

const initialState: ProjectPreview = {
  canPreviewBeVisible: true,
  isAttachedPreviewContainerVisible: false,
};

const projectPreviewSlice = createSlice({
  name: "projectPreview",
  initialState,
  reducers: {
    setCanPreviewBeVisible: (state, action: PayloadAction<boolean>) => {
      state.canPreviewBeVisible = action.payload;
    },
    setIsAttachedPreviewContainerVisible: (
      state,
      action: PayloadAction<boolean>,
    ) => {
      state.isAttachedPreviewContainerVisible = action.payload;
    },
  },
});

export const { setCanPreviewBeVisible, setIsAttachedPreviewContainerVisible } =
  projectPreviewSlice.actions;

export default projectPreviewSlice.reducer;
