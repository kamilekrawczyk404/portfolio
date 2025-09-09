import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SelectorState {
  isSelectorOpen: boolean;
}

const initialState: SelectorState = {
  isSelectorOpen: false,
};

const selectorSlice = createSlice({
  name: "selector",
  initialState,
  reducers: {
    changeSelectorState: (state, action: PayloadAction<boolean>) => {
      state.isSelectorOpen = action.payload;
    },
  },
});

export const { changeSelectorState } = selectorSlice.actions;

export default selectorSlice.reducer;
