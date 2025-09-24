import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ProjectPreview {
  canPreviewBeVisible: boolean;
  isAttachedPreviewContainerVisible: boolean;
  isProjectVisible: boolean;
}

const initialState: ProjectPreview = {
  isProjectVisible: false,
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
    setIsProjectVisible: (state, action: PayloadAction<boolean>) => {
      state.isProjectVisible = action.payload;
    },
  },
});

export const {
  setCanPreviewBeVisible,
  setIsAttachedPreviewContainerVisible,
  setIsProjectVisible,
} = projectPreviewSlice.actions;

export default projectPreviewSlice.reducer;
