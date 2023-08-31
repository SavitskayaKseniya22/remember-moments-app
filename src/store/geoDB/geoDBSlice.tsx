/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { GeoDataTypes } from "../../interfaces";

export interface GeoState {
  geoDBSearchResult: GeoDataTypes | undefined;
  geoDBSearchQuery: string | undefined;
}

const initialState: GeoState = {
  geoDBSearchResult: undefined,
  geoDBSearchQuery: undefined,
};

export const geoDBSlice = createSlice({
  name: "geoDB",
  initialState,
  reducers: {
    updateActiveSearchResult: (state, action: PayloadAction<GeoDataTypes>) => {
      state.geoDBSearchResult = action.payload;
    },
    updateActiveSearchQuery: (state, action: PayloadAction<string>) => {
      state.geoDBSearchQuery = action.payload;
    },

    resetActiveSearch: (state) => {
      state.geoDBSearchResult = initialState.geoDBSearchResult;
    },
  },
});

export const {
  updateActiveSearchResult,
  resetActiveSearch,
  updateActiveSearchQuery,
} = geoDBSlice.actions;

export default geoDBSlice.reducer;
