import { createSlice } from "@reduxjs/toolkit";

const themes = {
  light: {},
  dark: {},
};

const themeSlice = createSlice({
  name: "appMode",
  initialState: {
    theme: "light",
  },
  reducers: {
    changeTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
  },
});

export const { changeTheme } = themeSlice.actions;

export default themeSlice.reducer;
