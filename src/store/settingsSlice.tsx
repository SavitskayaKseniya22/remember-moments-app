/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface SettingsState {
  theme: string;
}

const initialState: SettingsState = {
  theme: "colorful",
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    updateTheme: (state, action: PayloadAction<string>) => {
      state.theme = action.payload;
    },
  },
});

export const { updateTheme } = settingsSlice.actions;

export default settingsSlice.reducer;
