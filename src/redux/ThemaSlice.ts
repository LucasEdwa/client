import { createSlice } from "@reduxjs/toolkit";
import { IThemes } from "../models/ITheme";
import { themes } from "../constants/styles";

interface ThemeState {
  currentTheme: keyof IThemes;
  theme: IThemes[keyof IThemes];
}

const initialState: ThemeState = {
  currentTheme: "primary",
  theme: themes.primary,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.currentTheme = state.currentTheme === "primary" ? "secondary" : "primary";
      state.theme = themes[state.currentTheme];
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;