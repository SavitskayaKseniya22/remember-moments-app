import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { toast } from "react-toastify";
import { t } from "i18next";
import { GeoTypes, WeatherErrorTypes } from "../../interfaces";
import weatherApiKey from "../../services/openweather";
import { filterData } from "../../utils";
import { updateGeo } from "./weatherSlice";

export const weatherApi = createApi({
  reducerPath: "weatherApi",
  baseQuery: fetchBaseQuery({
    baseUrl:
      "https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/",
  }),

  endpoints: (builder) => ({
    getMatchedCities: builder.query({
      query: (cityName: string) =>
        `geo/1.0/direct?q=${cityName}&limit=5&appid=${weatherApiKey}`,
      transformResponse: (response: GeoTypes[]) => {
        return filterData(response);
      },
      transformErrorResponse: (response) => {
        return response.data;
      },
      keepUnusedDataFor: 0,
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.length === 1) {
            dispatch(updateGeo(data[0]));
          }
          if (data.length === 0) {
            toast.warn(t("weather.warn.noMatch"));
          }
        } catch (err) {
          const errorData = (err as WeatherErrorTypes).error;
          toast.error(`${errorData.cod}: ${errorData.message}`);
        }
      },
    }),
    getWeather: builder.query({
      query: ({ lat, lon }: { lat: number; lon: number }) =>
        `data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=metric&lang=en`,
      keepUnusedDataFor: 0,
      transformErrorResponse: (response) => {
        return response.data;
      },
      async onQueryStarted(id, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (err) {
          const errorData = (err as WeatherErrorTypes).error;
          toast.error(`${errorData.cod}: ${errorData.message}`);
        }
      },
    }),
  }),
});

export const { useGetMatchedCitiesQuery, useGetWeatherQuery } = weatherApi;
