import { createSlice } from "@reduxjs/toolkit";
import { setCookie } from "cookies-next";
import { colors } from "@/layout";

const themes = {
  light: {
    ...colors.light,
    hover: {
      background: "hover:bg-neutral-900",
      foreground: "hover:text-gray-100",
      border: "hover:border-gray-100",
    },
  },
  dark: {
    ...colors.dark,
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
