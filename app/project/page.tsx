"use client";
import { useRouter } from "next/navigation";
import ProjectList from "../components/project/ProjectList";
import { useSelector } from "react-redux";

import { useEffect, useState } from "react";
import { RootState } from "../redux/store";

const ProjectsPage = () => {
  const router = useRouter();
  // Get user info from redux store
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  // Track when the component is mounted on the client-side
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Set mounted flag to true once the component has mounted on the client
    setIsMounted(true);

    // If the user is authenticated, redirect to dashboard
    if (!accessToken) {
      router.push("/login");
    }
  }, [accessToken, router]);

  // Prevent server-side rendering mismatch by rendering nothing during SSR
  if (!isMounted) {
    return null; // Prevent rendering on server-side
  }

  return <div>{accessToken ? <ProjectList /> : null}</div>;
};

export default ProjectsPage;
