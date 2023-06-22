/* eslint-disable no-param-reassign */

import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GeoTypes } from "../interfaces";
import weatherApiKey from "../services/openweather";
import { filterData } from "../utils";

export const weatherApi = createApi({
  reducerPath: "weatherApi",
  baseQuery: fetchBaseQuery({
    baseUrl:
      "https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/",
  }),
  endpoints: (builder) => ({
    getMatchedCities: builder.query({
      query: ({ cityName }: { cityName: string }) =>
        `geo/1.0/direct?q=${cityName}&limit=5&appid=${weatherApiKey}`,
      transformResponse: (response: GeoTypes[]) => {
        return filterData(response);
      },
      keepUnusedDataFor: 0,
    }),
    getWeather: builder.query({
      query: ({ lat, lon }: { lat: number; lon: number }) =>
        `data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=metric&lang=en`,
      keepUnusedDataFor: 0,
    }),
  }),
});

export const { useGetMatchedCitiesQuery, useGetWeatherQuery } = weatherApi;

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
      state.geo = action.payload;
    },
  },
});

export const { updateGeo } = weatherSlice.actions;

export default weatherSlice.reducer;
