/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import firebaseConfig from "../services/firebase";
import { ActiveUserTypes, ActiveUserDataTypes } from "../interfaces";

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
    changePassword: builder.mutation({
      query: ({
        idToken,
        password,
        returnSecureToken,
      }: {
        idToken: string;
        password: string;
        returnSecureToken: boolean;
      }) => ({
        url: `:update?key=${firebaseConfig.apiKey}`,
        method: "POST",
        body: {
          idToken,
          password,
          returnSecureToken,
        },
      }),
    }),
    changeEmail: builder.mutation({
      query: ({
        idToken,
        email,
        returnSecureToken,
      }: {
        idToken: string;
        email: string;
        returnSecureToken: boolean;
      }) => ({
        url: `:update?key=${firebaseConfig.apiKey}`,
        method: "POST",
        body: {
          idToken,
          email,
          returnSecureToken,
        },
      }),
    }),
    deleteProfile: builder.mutation({
      query: ({ idToken }: { idToken: string }) => ({
        url: `:delete?key=${firebaseConfig.apiKey}`,
        method: "POST",
        body: {
          idToken,
        },
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(resetActiveUser());
        } catch (err) {
          // `onError` side-effect
        }
      },
    }),
    updateProfile: builder.mutation({
      query: ({
        idToken,
        displayName,
        photoUrl,
        deleteAttribute,
        returnSecureToken,
      }: {
        idToken: string;
        displayName: string;
        photoUrl: string;
        deleteAttribute: string[];
        returnSecureToken: boolean;
      }) => ({
        url: `:delete?key=${firebaseConfig.apiKey}`,
        method: "POST",
        body: {
          idToken,
          displayName,
          photoUrl,
          deleteAttribute,
          returnSecureToken,
        },
      }),
    }),
  }),
});

export const {
  useSignUpMutation,
  useSignInMutation,
  useGetUserDataMutation,
  useChangePasswordMutation,
  useChangeEmailMutation,
  useDeleteProfileMutation,
  useUpdateProfileMutation,
} = authApi;
