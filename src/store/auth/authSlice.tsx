/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ActiveUserTypes } from "../../interfaces";

export interface JourneyTypes {
  id: string;
  date_to: string;
  date_from: string;
  place: string;
  notes: string[];
}

export interface AuthState {
  activeUser: ActiveUserTypes | undefined;
  userData: JourneyTypes[];
}

const initialState: AuthState = {
  activeUser: undefined,
  userData: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateActiveUser: (state, action: PayloadAction<ActiveUserTypes>) => {
      state.activeUser = action.payload;
    },
    updateNameForActiveUser: (state, action: PayloadAction<string>) => {
      if (state.activeUser) {
        state.activeUser.displayName = action.payload;
      }
    },
    updatePhotoForActiveUser: (state, action: PayloadAction<string>) => {
      if (state.activeUser) {
        state.activeUser.profilePicture = action.payload;
      }
    },
    updateUserData: (state, action: PayloadAction<JourneyTypes>) => {
      state.userData = [...state.userData, action.payload];
    },
    resetActiveUser: (state) => {
      state.activeUser = initialState.activeUser;
    },
  },
});

export const {
  updateActiveUser,
  updatePhotoForActiveUser,
  resetActiveUser,
  updateNameForActiveUser,
  updateUserData,
} = authSlice.actions;

export default authSlice.reducer;
