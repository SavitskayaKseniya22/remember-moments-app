/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { GeoDataTypes } from "../../interfaces";

export interface GeoState {
  geoDBSearchResult: GeoDataTypes | undefined;
  geoDBSearchQuery: string;
  geoDBSortType: string;
  geoDBOffset: string;
}

const initialState: GeoState = {
  geoDBSearchResult: undefined,
  geoDBSearchQuery: "",
  geoDBSortType: "name",
  geoDBOffset: "0",
};

export const geoDBSlice = createSlice({
  name: "geoDB",
  initialState,
  reducers: {
    updateSearchResult: (state, action: PayloadAction<GeoDataTypes>) => {
      state.geoDBSearchResult = action.payload;
    },
    updateSearchQuery: (state, action: PayloadAction<string>) => {
      state.geoDBSearchQuery = action.payload;
    },
    updateSortType: (state, action: PayloadAction<string>) => {
      state.geoDBSortType = action.payload;
    },
    updateOffset: (state, action: PayloadAction<string>) => {
      state.geoDBOffset = action.payload;
    },

    resetActiveSearch: (state) => {
      state.geoDBSearchResult = initialState.geoDBSearchResult;
    },
  },
});

export const {
  updateSearchResult,
  resetActiveSearch,
  updateSearchQuery,
  updateSortType,
  updateOffset,
} = geoDBSlice.actions;

export default geoDBSlice.reducer;
