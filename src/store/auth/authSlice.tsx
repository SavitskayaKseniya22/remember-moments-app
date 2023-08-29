/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ActiveUserTypes } from "../../interfaces";

export interface AuthState {
  activeUser: ActiveUserTypes | undefined;
}

const initialState: AuthState = {
  activeUser: undefined,
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
} = authSlice.actions;

export default authSlice.reducer;
