import { createSlice } from "@reduxjs/toolkit";

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
    changeTheme: (state) => {
      state.theme = state.selected === "dark" ? themes.light : themes.dark;
      state.opposite = state.selected === "dark" ? themes.dark : themes.light;
      state.selected = state.selected === "dark" ? "light" : "dark";
    },
  },
});

export const { changeTheme } = themeSlice.actions;

export default themeSlice.reducer;
