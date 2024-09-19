import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  setUser,
  setAccessToken,
  setLoading,
  setError,
  logout,
} from "./authSlice";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL, // your base URL
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (userData) => ({
        url: "auth/register",
        method: "POST",
        body: userData,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        dispatch(setLoading(true));
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data.user));
          dispatch(setAccessToken(data.accessToken));
          dispatch(setError(null));
        } catch (error: unknown) {
          dispatch(setError("Registration failed"));
        } finally {
          dispatch(setLoading(false));
        }
      },
    }),
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        dispatch(setLoading(true));
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data.user));
          dispatch(setAccessToken(data.accessToken));
          dispatch(setError(null));
        } catch (error: unknown) {
          dispatch(setError("Login failed"));
        } finally {
          dispatch(setLoading(false));
        }
      },
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: "auth/logout",
        method: "POST",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          dispatch(logout());
        } catch (error: unknown) {
          dispatch(setError("Logout failed"));
        }
      },
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
} = authApi;
