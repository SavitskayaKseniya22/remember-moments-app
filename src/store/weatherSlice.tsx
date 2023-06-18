/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { GeoTypes, WeatherTypes } from "../interfaces";

export interface WeatherState {
  geo: GeoTypes | undefined;
  description: WeatherTypes | undefined;
}

const initialState: WeatherState = {
  geo: undefined,
  description: undefined,
};

export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    updateWeather: (state, action: PayloadAction<WeatherTypes>) => {
      state.description = action.payload;
    },
    updateGeo: (state, action: PayloadAction<GeoTypes>) => {
      state.geo = action.payload;
    },
  },
});

export const { updateWeather, updateGeo } = weatherSlice.actions;

export default weatherSlice.reducer;
