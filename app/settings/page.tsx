"use client";

import React, { useState, useEffect } from "react";
import {
  useUpdatePreferencesMutation,
  useGetUserPreferencesQuery,
} from "@/app/redux/user/user.api";
import { useRouter } from "next/navigation";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";

const Settings: React.FC = () => {
  const { data: preferences } = useGetUserPreferencesQuery({});
  const [notificationsEnabled, setNotificationsEnabled] = useState(
    preferences?.notificationsEnabled || true
  );
  const [updatePreferences] = useUpdatePreferencesMutation();
  const router = useRouter();
  // Get user info from redux store
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  useEffect(() => {
    if (!accessToken) {
      router.push("/login");
    }
  }, [accessToken, router]);

  useEffect(() => {
    if (preferences) {
      setNotificationsEnabled(preferences.notificationsEnabled);
    }
  }, [preferences]);

  const handleToggle = async () => {
    await updatePreferences({ notificationsEnabled: !notificationsEnabled });
    setNotificationsEnabled(!notificationsEnabled);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    notificationsEnabled
      ? alert("Notification successfully disabled")
      : alert("Notification successfully enabled");
  };

  return (
    <div className="text-center flex flex-col pt-[70px] items-center min-h-screen text-black bg-gray-100 font-[family-name:var(--font-geist-sans)]">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold">Notification Settings</h2>
        <div className="mt-4 flex  justify-around">
          <div className="text-lg max-w-[280px]">
            Check the box to receive Email Notifications on task updates
          </div>
          <input
            type="checkbox"
            checked={notificationsEnabled}
            onChange={handleToggle}
            className=" w-[30px]"
          />
        </div>
      </div>
    </div>
  );
};

export default Settings;
