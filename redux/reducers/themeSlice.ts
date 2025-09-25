import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCookie, setCookie } from "cookies-next";
import { BasicColorSet, colors } from "@/layout";

export type ThemeTypes = "light" | "dark";

export type Theme = {
  [property in ThemeTypes]: BasicColorSet;
};

const themes: Theme = {
  light: colors.light,
  dark: colors.dark,
};

export interface ThemeState {
  selected: ThemeTypes;
  theme: Theme[ThemeTypes];
  opposite: Theme[ThemeTypes];
}

const initialState: ThemeState = {
  selected: "dark",
  theme: themes.dark,
  opposite: themes.light,
};

const themeSlice = createSlice({
  name: "appMode",
  initialState,
  reducers: {
    changeTheme: (state, action: PayloadAction<ThemeTypes>) => {
      // whether there is parameter or not
      const theme = action.payload;

      setCookie("theme-mode", theme);

      state.theme = theme === "dark" ? themes.dark : themes.light;
      state.opposite = theme === "dark" ? themes.light : themes.dark;
      state.selected = theme;

      // document.body.classList.add(theme);
      // document.body.classList.remove(theme === "dark" ? "light" : "dark");
    },
  },
});

export const { changeTheme } = themeSlice.actions;

export default themeSlice.reducer;
