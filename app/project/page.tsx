"use client";
import { useRouter } from "next/navigation";
import ProjectList from "../components/project/ProjectList";
import { useSelector } from "react-redux";

import { useEffect } from "react";
import { RootState } from "../redux/store";

const ProjectsPage = () => {
  const router = useRouter();
  // Get user info from redux store
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  // If the user is not authenticated, redirect to login
  useEffect(() => {
    if (!accessToken) {
      router.push("/login");
    }
  }, [accessToken, router]);

  return <div>{accessToken ? <ProjectList /> : null}</div>;
};

export default ProjectsPage;
