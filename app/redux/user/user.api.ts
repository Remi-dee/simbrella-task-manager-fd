import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL, // your base URL
  }),
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => "users",
    }),
  }),
});

export const { useGetAllUsersQuery } = userApi;



