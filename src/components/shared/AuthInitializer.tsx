"use client";

import { useEffect, useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import { refreshAccessToken } from "@/store/thunks/authThunk";

export default function AuthInitializer({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    dispatch(refreshAccessToken())
      .unwrap()
      .then(() => {
        console.log("Session restored!");
      })
      .catch(() => {
        console.log("No active session found.");
      })
      .finally(() => {
        setIsInitialized(true);
      });
  }, [dispatch]);

  if (!isInitialized) {
    return <div></div>;
  }

  return children;
}
