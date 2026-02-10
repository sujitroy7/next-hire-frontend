"use client";

import { useEffect, useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import { refreshAccessToken } from "@/store/thunks/authThunk";
import { userApi } from "@/store/services/userApi";

export default function AuthInitializer({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initAuth = async () => {
      try {
        // 1. Try to get a valid access token first
        await dispatch(refreshAccessToken()).unwrap().then();
        // 2. If successful, manually trigger the RTK Query endpoint
        await dispatch(userApi.endpoints.getMe.initiate()).unwrap();
      } catch (error) {
        console.log("No active session found.");
      } finally {
        setIsInitialized(true);
      }
    };

    if (!isInitialized) initAuth();
  }, [dispatch]);

  if (!isInitialized) {
    return <div>Loading...</div>;
  }

  return children;
}
