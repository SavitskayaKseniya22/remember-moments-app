import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { GeoTypes } from "../../interfaces";

export interface WeatherState {
  geo: GeoTypes | undefined;
}

const initialState: WeatherState = {
  geo: undefined,
};

export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    updateGeo: (state, action: PayloadAction<GeoTypes>) => {
      // eslint-disable-next-line no-param-reassign
      state.geo = action.payload;
    },
  },
});

export const { updateGeo } = weatherSlice.actions;

export default weatherSlice.reducer;
