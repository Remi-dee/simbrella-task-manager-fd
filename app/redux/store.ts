// src/redux/store.ts
"use client";

import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./features/auth/authApi";
import authReducer from "./features/auth/authSlice"; // Import the reducer
import { taskReducer } from "./features/task/task.slice";
import { taskApi } from "./features/task/task.api";
import { projectApi } from "./features/project/project.api";
import { projectReducer } from "./features/project/project.slice";
import { teamApi } from "./features/team/team.api";
import { userApi } from "./features/user/user.api";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [taskApi.reducerPath]: taskApi.reducer,
    [projectApi.reducerPath]: projectApi.reducer,
    [teamApi.reducerPath]: teamApi.reducer,
    [userApi.reducerPath]: userApi.reducer,

    auth: authReducer,
    project: projectReducer,
    task: taskReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      projectApi.middleware,
      taskApi.middleware,
      teamApi.middleware,
      userApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
