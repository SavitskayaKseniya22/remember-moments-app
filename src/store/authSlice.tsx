/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import firebaseConfig from "../services/firebase";

export interface ActiveUserTypes {
  kind: string;
  localId: string;
  email: string;
  displayName: string;
  idToken: string;
  registered: boolean;
  refreshToken: string;
  expiresIn: string;
}

interface ActiveUserDataTypes {
  users: [
    {
      localId: string;
      email: string;
      emailVerified: boolean;
      displayName: string;
      providerUserInfo: [
        {
          providerId: string;
          displayName: string;
          photoUrl: string;
          federatedId: string;
          email: string;
          rawId: string;
          screenName: string;
        },
      ];
      photoUrl: string;
      passwordHash: string;
      passwordUpdatedAt: number;
      validSince: string;
      disabled: boolean;
      lastLoginAt: string;
      createdAt: string;
      customAuth: boolean;
    },
  ];
}

export interface AuthState {
  activeUser: ActiveUserTypes | undefined;
  activeUserData: ActiveUserDataTypes | undefined;
}

const initialState: AuthState = {
  activeUser: undefined,
  activeUserData: undefined,
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
    updateActiveUserData: (
      state,
      action: PayloadAction<ActiveUserDataTypes>,
    ) => {
      state.activeUserData = action.payload;
    },
  },
});

export const { updateActiveUser, resetActiveUser } = authSlice.actions;

export default authSlice.reducer;

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://identitytoolkit.googleapis.com/v1/accounts",
  }),
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: ({
        email,
        password,
        returnSecureToken,
      }: {
        email: string;
        password: string;
        returnSecureToken: boolean;
      }) => ({
        url: `:signUp?key=${firebaseConfig.apiKey}`,
        method: "POST",
        body: {
          email,
          password,
          returnSecureToken,
        },
      }),
    }),
    signIn: builder.mutation({
      query: ({
        email,
        password,
        returnSecureToken,
      }: {
        email: string;
        password: string;
        returnSecureToken: boolean;
      }) => ({
        url: `:signInWithPassword?key=${firebaseConfig.apiKey}`,
        method: "POST",
        body: {
          email,
          password,
          returnSecureToken,
        },
      }),

      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(updateActiveUser(data));
        } catch (err) {
          // `onError` side-effect
        }
      },
    }),
    getUserData: builder.mutation({
      query: (idToken: string) => ({
        url: `:lookup?key=${firebaseConfig.apiKey}`,
        method: "POST",
        body: {
          idToken,
        },
      }),
    }),
  }),
});

export const { useSignUpMutation, useSignInMutation, useGetUserDataMutation } =
  authApi;
