import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ProjectPreview {
  canPreviewBeVisible: boolean;
}

const initialState: ProjectPreview = {
  canPreviewBeVisible: true,
};

const projectPreviewSlice = createSlice({
  name: "projectPreview",
  initialState,
  reducers: {
    setCanPreviewBeVisible: (state, action: PayloadAction<boolean>) => {
      state.canPreviewBeVisible = action.payload;
    },
  },
});

export const { setCanPreviewBeVisible } = projectPreviewSlice.actions;

export default projectPreviewSlice.reducer;
