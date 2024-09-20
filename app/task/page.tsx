"use client";

import { useSelector } from "react-redux";
import TaskList from "../components/task/TaskList";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { RootState } from "../redux/store";

const TaskPage = () => {
  const router = useRouter();

  // Get user info from redux store
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  // If the user is not authenticated, redirect to login
  useEffect(() => {
    if (!accessToken) {
      router.push("/login");
    }
  }, [accessToken, router]);

  return (
    <div className="auth-container">{accessToken ? <TaskList /> : null}</div>
  );
};

export default TaskPage;
