import { createSlice } from '@reduxjs/toolkit';
import { taskApi } from './task.api';


const taskSlice = createSlice({
  name: 'task',
  initialState: {
    tasks: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(taskApi.endpoints.fetchTasks.matchFulfilled, (state, { payload }) => {
      state.tasks = payload;
    });
  },
});

export const { reducer: taskReducer } = taskSlice;
