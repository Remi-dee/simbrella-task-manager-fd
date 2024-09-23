"use client";

import { useRouter } from "next/navigation";
import TeamComponent from "../components/team/TeamComp";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { RootState } from "../redux/store";

const TeamsPage = () => {
  const router = useRouter();
  // Get user info from redux store
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  // If the user is not authenticated, redirect to login
  useEffect(() => {
    if (!accessToken) {
      router.push("/login");
    }
  }, [accessToken, router]);
  return <div className="p-4">{accessToken ? <TeamComponent /> : null}</div>;
};

export default TeamsPage;
