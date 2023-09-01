import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { toast } from "react-toastify";
import { t } from "i18next";

import {
  updateOffset,
  updateSearchQuery,
  updateSearchResult,
  updateSortType,
} from "./geoDBSlice";

export const geoDBApi = createApi({
  reducerPath: "geoDBApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://geodb-free-service.wirefreethought.com/v1/geo/",
  }),

  endpoints: (builder) => ({
    getPlace: builder.query({
      query: ({
        namePrefix,
        offset,
        sort,
      }: {
        namePrefix: string;
        offset: string;
        sort: string;
      }) =>
        `places?limit=10&offset=${offset}&namePrefix=${namePrefix}&sort=${sort}&types=CITY`,

      keepUnusedDataFor: 0,

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.data.length === 0) {
            toast.warn(t("weather.warn.noMatch"));
          }
          dispatch(updateSearchResult(data));
          dispatch(updateSearchQuery(arg.namePrefix));
          dispatch(updateOffset(arg.offset));
          dispatch(updateSortType(arg.sort));
        } catch (err) {
          console.log(err);

          /*
          errorData.forEach((errorItem) => {
            toast.error(`${errorItem.code}: ${errorItem.message}`);
          }); */
        }
      },
    }),
  }),
});

export const { useGetPlaceQuery } = geoDBApi;
