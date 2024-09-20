import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/app/redux/features/auth/authSlice"; // Assuming you have a logout function
import { RootState } from "@/app/redux/store"; // Assuming you have a root state in redux
import Link from "next/link";

const Dashboard: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  // Get user info from redux store
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  // Redirect to login page if user is not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login"); // Redirect to login if user is not signed in
    }
  }, [isAuthenticated, router]);

  // Handle Logout
  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-black font-family-[var(--font-geist-sans)]">
      <div className="max-w-4xl w-full mx-auto px-6 py-12 bg-white shadow-lg rounded-lg text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          Welcome, {user?.name}!
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Welcome to{" "}
          <span className="text-indigo-600 font-semibold">
            Simbrella Task Manager
          </span>
          . Here, you can manage your projects, tasks, and teams efficiently!
        </p>

        <div className="space-y-6">
          <Link href="/projects">
            <a className="block bg-indigo-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-indigo-400 transition duration-300">
              Create and Manage Projects
            </a>
          </Link>

          <Link href="/tasks">
            <a className="block bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-400 transition duration-300">
              Create and Manage Tasks
            </a>
          </Link>

          <Link href="/teams">
            <a className="block bg-yellow-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-yellow-400 transition duration-300">
              Create Teams and Assign Users
            </a>
          </Link>
        </div>

        <button
          onClick={handleLogout}
          className="mt-8 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-red-400 transition duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
