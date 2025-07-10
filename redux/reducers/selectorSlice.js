import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSelectorOpen: false,
};
const selectorSlice = createSlice({
  name: "selector",
  initialState,
  reducers: {
    changeSelectorState: (state, action) => {
      state.isSelectorOpen = action.payload;
    },
  },
});

export const { changeSelectorState } = selectorSlice.actions;

export default selectorSlice.reducer;
