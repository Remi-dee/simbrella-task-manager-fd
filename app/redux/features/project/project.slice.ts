import { createSlice } from '@reduxjs/toolkit';
import { projectApi } from './project.api';

const projectSlice = createSlice({
  name: 'project',
  initialState: {
    projects: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(projectApi.endpoints.fetchProjects.matchFulfilled, (state, { payload }) => {
      state.projects = payload;
    });
  },
});

export const { reducer: projectReducer } = projectSlice;
