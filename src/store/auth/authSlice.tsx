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
    resetActiveUser: (state) => {
      state.activeUser = initialState.activeUser;
    },
  },
});

export const { updateActiveUser, resetActiveUser } = authSlice.actions;

export default authSlice.reducer;
