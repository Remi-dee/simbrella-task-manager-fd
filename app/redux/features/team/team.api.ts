import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../store";
// Adjust the import according to your types

export const teamApi = createApi({
  reducerPath: "teamApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL, // your base URL
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.accessToken;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    createTeam: builder.mutation({
      query: ({ name, projectId }) => ({
        url: "teams",
        method: "POST",
        body: { name, projectId },
      }),
    }),
    getTeamsByProject: builder.query({
      query: (projectId) => `teams/${projectId}`,
    }),
    addUserToTeam: builder.mutation<
      { message: string },
      { teamId: string; userId: string }
    >({
      query: ({ teamId, userId }) => ({
        url: `teams/${teamId}/users`,
        method: "POST",
        body: { userId },
      }),
    }),
    getAllTeams: builder.query({
      query: () => "/teams",
    }),
  }),
});

export const {
  useCreateTeamMutation,
  useGetTeamsByProjectQuery,
  useAddUserToTeamMutation,
  useGetAllTeamsQuery,
} = teamApi;
