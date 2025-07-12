import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isPreviewOpen: false,
};

const projectPreviewSlice = createSlice({
  name: "projectPreview",
  initialState,
  reducers: {
    setIsPreviewOpen: (state, action) => {
      state.isPreviewOpen = action.payload;
    },
  },
});

export const { setIsPreviewOpen } = projectPreviewSlice.actions;

export default projectPreviewSlice.reducer;
