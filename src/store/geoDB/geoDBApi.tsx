import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { toast } from "react-toastify";
import { t } from "i18next";
import { GeoErrorTypes } from "../../interfaces";
import {
  updateActiveSearchQuery,
  updateActiveSearchResult,
} from "./geoDBSlice";

export const geoDBApi = createApi({
  reducerPath: "geoDBApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://geodb-free-service.wirefreethought.com/v1/geo/",
  }),

  endpoints: (builder) => ({
    getPlace: builder.query({
      query: ({ namePrefix, offset }: { namePrefix: string; offset: string }) =>
        `places?limit=10&offset=${offset}&namePrefix=${namePrefix}&sort=-population&types=CITY`,

      keepUnusedDataFor: 0,
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.data.length === 0) {
            toast.warn(t("weather.warn.noMatch"));
          }
          dispatch(updateActiveSearchResult(data));
          dispatch(updateActiveSearchQuery(arg.namePrefix));
        } catch (err) {
          const errorData = (err as GeoErrorTypes).errors;
          errorData.forEach((errorItem) => {
            toast.error(`${errorItem.code}: ${errorItem.message}`);
          });
        }
      },
    }),
  }),
});

export const { useGetPlaceQuery } = geoDBApi;
