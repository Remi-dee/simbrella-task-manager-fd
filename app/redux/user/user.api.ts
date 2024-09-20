import { createApi, fetchBaseQuery,  } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL, // base URL
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.accessToken;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => "users",
    }),
    getUserPreferences: builder.query({
      query: () => "users/preferences",
    }),
    updatePreferences: builder.mutation({
      query: (preferences) => ({
        url: "users/preferences",
        method: "PATCH",
        body: preferences,
      }),
    }),
    getUserProfile: builder.query({
      query: () => "users/profile",
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserProfileQuery,
  useGetUserPreferencesQuery,
  useUpdatePreferencesMutation,
} = userApi;
