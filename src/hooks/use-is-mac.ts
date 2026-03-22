"use client";

import { useState, useEffect } from "react";

export function useIsMac() {
  const [isMac, setIsMac] = useState(true);

  useEffect(() => {
    setIsMac(
      typeof navigator !== "undefined" && navigator.userAgent.includes("Mac"),
    );
  }, []);

  return isMac;
}
