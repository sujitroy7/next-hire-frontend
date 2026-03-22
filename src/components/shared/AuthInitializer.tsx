"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  clearRefreshTokenLoopTimer,
  getRefreshTokenLoopTimer,
  refreshTokenLoop,
} from "@/lib/refresh-token";

const AUTH_ROUTE = ["login", "register"];

export default function AuthInitializer() {
  const [isInitialized, setIsInitialized] = useState(false);
  const pathname = usePathname();

  const isAuthPage = AUTH_ROUTE.some((route) => pathname.includes(route));

  useEffect(() => {
    if (!isInitialized && !isAuthPage) {
      refreshTokenLoop()
        .catch(() => {
          console.log("No active session found.");
        })
        .finally(() => {
          setIsInitialized(true);
        });
    }

    return () => {
      if (getRefreshTokenLoopTimer()) {
        clearRefreshTokenLoopTimer();
      }
    };
  }, []);

  return null;
}

// 2. If successful, manually trigger the RTK Query endpoint
// await dispatch(userApi.endpoints.getMe.initiate()).unwrap();
