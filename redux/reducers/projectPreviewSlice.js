import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  canPreviewBeVisible: true,
};

const projectPreviewSlice = createSlice({
  name: "projectPreview",
  initialState,
  reducers: {
    setCanPreviewBeVisible: (state, action) => {
      state.canPreviewBeVisible = action.payload;
    },
  },
});

export const { setCanPreviewBeVisible } = projectPreviewSlice.actions;

export default projectPreviewSlice.reducer;
