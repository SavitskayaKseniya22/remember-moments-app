/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface SettingsState {
  lang: string;
  theme: string;
}

const initialState: SettingsState = {
  lang: "en",
  theme: "colorful",
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    updateLang: (state, action: PayloadAction<string>) => {
      state.lang = action.payload;
    },
    updateTheme: (state, action: PayloadAction<string>) => {
      state.theme = action.payload;
    },
  },
});

export const { updateLang, updateTheme } = settingsSlice.actions;

export default settingsSlice.reducer;
