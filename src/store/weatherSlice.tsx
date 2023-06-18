/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { WeatherTypes } from "../interfaces";

export interface WeatherState {
  city: string | undefined;
  description: WeatherTypes | undefined;
}

const initialState: WeatherState = {
  city: undefined,
  description: undefined,
};

export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    updateCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    },
    updateWeather: (state, action: PayloadAction<WeatherTypes>) => {
      state.description = action.payload;
    },
  },
});

export const { updateCity, updateWeather } = weatherSlice.actions;

export default weatherSlice.reducer;
