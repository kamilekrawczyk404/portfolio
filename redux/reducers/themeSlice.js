import { createSlice } from "@reduxjs/toolkit";
import { setCookie } from "cookies-next";

const themes = {
  light: {
    background: "bg-gray-100",
    foreground: "text-neutral-900",
    border: "border-neutral-900",
    hover: {
      background: "hover:bg-neutral-900",
      foreground: "hover:text-gray-100",
      border: "hover:border-gray-100",
    },
  },
  dark: {
    background: "bg-neutral-900",
    foreground: "text-gray-100",
    border: "border-gray-100",
    hover: {
      background: "hover:bg-gray-100",
      foreground: "hover:text-neutral-900",
      border: "hover:border-neutral-900",
    },
  },
};

const themeSlice = createSlice({
  name: "appMode",
  initialState: {
    selected: "dark",
    theme: themes.dark,
    opposite: themes.light,
  },

  reducers: {
    changeTheme: (state, action) => {
      // whether there is parameter or not
      const theme = action.payload;

      setCookie("theme-mode", theme);

      state.theme = theme === "dark" ? themes.dark : themes.light;
      state.opposite = theme === "dark" ? themes.light : themes.dark;
      state.selected = theme;
    },
  },
});

export const { changeTheme } = themeSlice.actions;

export default themeSlice.reducer;
