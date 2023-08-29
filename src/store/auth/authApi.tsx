import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { toast } from "react-toastify";
import { t } from "i18next";
import firebaseConfig from "../../services/firebase";
import {
  SignInUpArgsTypes,
  ChangePasswordArgsTypes,
  ChangeEmailArgsTypes,
  UpdateProfileArgsTypes,
  AuthErrorTypes,
  ActiveUserListDataTypes,
} from "../../interfaces";
import { transformAuthError } from "../../utils";
import {
  resetActiveUser,
  updateActiveUser,
  updateNameForActiveUser,
  updatePhotoForActiveUser,
} from "./authSlice";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://identitytoolkit.googleapis.com/v1/accounts",
  }),
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: ({ email, password, returnSecureToken }: SignInUpArgsTypes) => ({
        url: `:signUp?key=${firebaseConfig.apiKey}`,
        method: "POST",
        body: {
          email,
          password,
          returnSecureToken,
        },
      }),
      transformErrorResponse: (response) => {
        return transformAuthError(response);
      },
      async onQueryStarted(id, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success("You are registered successfully");
        } catch (err) {
          if (err && typeof err === "object" && "error" in err) {
            const { message, code } = (err as AuthErrorTypes).error;
            toast.error(`${code}: ${message}`);
          }
        }
      },
    }),
    signIn: builder.mutation({
      query: ({ email, password, returnSecureToken }: SignInUpArgsTypes) => ({
        url: `:signInWithPassword?key=${firebaseConfig.apiKey}`,
        method: "POST",
        body: {
          email,
          password,
          returnSecureToken,
        },
      }),
      transformErrorResponse: (response) => {
        return transformAuthError(response);
      },
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(updateActiveUser(data));
          toast.success("You've successfully logged in");
        } catch (err) {
          if (err && typeof err === "object" && "error" in err) {
            const { message, code } = (err as AuthErrorTypes).error;
            toast.error(`${code}: ${message}`);
          }
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
      transformErrorResponse: (response) => {
        return transformAuthError(response);
      },
      transformResponse: (response) => {
        return (response as ActiveUserListDataTypes).users[0];
      },
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;

          toast.success(t("auth.success.dataUploaded"));
        } catch (err) {
          if (err && typeof err === "object" && "error" in err) {
            const { message, code } = (err as AuthErrorTypes).error;
            toast.error(`${code}: ${message}`);
            dispatch(resetActiveUser());
          }
        }
      },
    }),
    changePassword: builder.mutation({
      query: ({
        idToken,
        password,
        returnSecureToken,
      }: ChangePasswordArgsTypes) => ({
        url: `:update?key=${firebaseConfig.apiKey}`,
        method: "POST",
        body: {
          idToken,
          password,
          returnSecureToken,
        },
      }),
      transformErrorResponse: (response) => {
        return transformAuthError(response);
      },
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(resetActiveUser());
          toast.success(t("auth.success.passwordChanged"));
        } catch (err) {
          if (err && typeof err === "object" && "error" in err) {
            const { message, code } = (err as AuthErrorTypes).error;
            toast.error(`${code}: ${message}`);
            if (
              message !==
              "weak password : password should be at least 6 characters"
            ) {
              dispatch(resetActiveUser());
            }
          }
        }
      },
    }),
    changeEmail: builder.mutation({
      query: ({ idToken, email, returnSecureToken }: ChangeEmailArgsTypes) => ({
        url: `:update?key=${firebaseConfig.apiKey}`,
        method: "POST",
        body: {
          idToken,
          email,
          returnSecureToken,
        },
      }),
      transformErrorResponse: (response) => {
        return transformAuthError(response);
      },
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(resetActiveUser());
          toast.success(t("auth.success.emailChanged"));
        } catch (err) {
          if (err && typeof err === "object" && "error" in err) {
            const { message, code } = (err as AuthErrorTypes).error;
            toast.error(`${code}: ${message}`);
            if (message !== "email exists") {
              dispatch(resetActiveUser());
            }
          }
        }
      },
    }),
    deleteProfile: builder.mutation({
      query: (idToken: string) => ({
        url: `:delete?key=${firebaseConfig.apiKey}`,
        method: "POST",
        body: {
          idToken,
        },
      }),
      transformErrorResponse: (response) => {
        return transformAuthError(response);
      },
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success(t("auth.success.accountDeleted"));
        } catch (err) {
          if (err && typeof err === "object" && "error" in err) {
            const { message, code } = (err as AuthErrorTypes).error;
            toast.error(`${code}: ${message}`);
          }
        } finally {
          dispatch(resetActiveUser());
        }
      },
    }),
    updatePhoto: builder.mutation({
      query: ({ idToken, displayName, photoUrl }: UpdateProfileArgsTypes) => ({
        url: `:update?key=${firebaseConfig.apiKey}`,
        method: "POST",
        body: {
          idToken,
          displayName,
          photoUrl,
          deleteAttribute: [],
          returnSecureToken: true,
        },
      }),
      transformErrorResponse: (response) => {
        return transformAuthError(response);
      },
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          toast.success(t("auth.success.dataUpdated"));
          dispatch(updatePhotoForActiveUser(data.photoUrl));
        } catch (err) {
          if (err && typeof err === "object" && "error" in err) {
            const { message, code } = (err as AuthErrorTypes).error;
            toast.error(`${code}: ${message}`);
          }
          dispatch(resetActiveUser());
        }
      },
    }),
    removePhoto: builder.mutation({
      query: ({ idToken, displayName }: UpdateProfileArgsTypes) => ({
        url: `:update?key=${firebaseConfig.apiKey}`,
        method: "POST",
        body: {
          idToken,
          displayName,
          photoUrl: "",
          deleteAttribute: ["PHOTO_URL"],
          returnSecureToken: true,
        },
      }),
      transformErrorResponse: (response) => {
        return transformAuthError(response);
      },
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success(t("auth.success.dataUpdated"));
          dispatch(updatePhotoForActiveUser(""));
        } catch (err) {
          if (err && typeof err === "object" && "error" in err) {
            const { message, code } = (err as AuthErrorTypes).error;
            toast.error(`${code}: ${message}`);
          }
          dispatch(resetActiveUser());
        }
      },
    }),
    updateName: builder.mutation({
      query: ({ idToken, displayName, photoUrl }: UpdateProfileArgsTypes) => ({
        url: `:update?key=${firebaseConfig.apiKey}`,
        method: "POST",
        body: {
          idToken,
          displayName,
          photoUrl,
          deleteAttribute: [],
          returnSecureToken: true,
        },
      }),
      transformErrorResponse: (response) => {
        return transformAuthError(response);
      },
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(updateNameForActiveUser(data.displayName));
          toast.success(t("auth.success.dataUpdated"));
        } catch (err) {
          if (err && typeof err === "object" && "error" in err) {
            const { message, code } = (err as AuthErrorTypes).error;
            toast.error(`${code}: ${message}`);
          }
          dispatch(resetActiveUser());
        }
      },
    }),
    removeName: builder.mutation({
      query: ({ idToken, photoUrl }: UpdateProfileArgsTypes) => ({
        url: `:update?key=${firebaseConfig.apiKey}`,
        method: "POST",
        body: {
          idToken,
          displayName: "",
          photoUrl,
          deleteAttribute: ["DISPLAY_NAME"],
          returnSecureToken: true,
        },
      }),
      transformErrorResponse: (response) => {
        return transformAuthError(response);
      },
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(updateNameForActiveUser(""));
          toast.success(t("auth.success.dataUpdated"));
        } catch (err) {
          if (err && typeof err === "object" && "error" in err) {
            const { message, code } = (err as AuthErrorTypes).error;
            toast.error(`${code}: ${message}`);
          }
          dispatch(resetActiveUser());
        }
      },
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
  useUpdateNameMutation,
  useRemoveNameMutation,
  useRemovePhotoMutation,
  useUpdatePhotoMutation,
} = authApi;
