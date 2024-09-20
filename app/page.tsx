"use client";

import Register from "./components/authentication/RegForm";
import { useEffect } from "react";

import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";

export default function Home() {
  const router = useRouter();

  // Get user info from redux store
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  // If the user is not authenticated, redirect to login
  useEffect(() => {
    if (accessToken) {
      router.push("/dashboard");
    }
  }, [accessToken, router]);

  return (
    <div className="">
      <Register />
    </div>
  );
}
