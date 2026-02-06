import { requireEnv } from "./env";

const API_URL = requireEnv("NEXT_PUBLIC_API_URL");

export const apiRequest = async (
  endpoint: string,
  options: RequestInit = {},
) => {
  //   const token =
  //     typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    // ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    credentials: "include",
    headers,
  });

  if (response.status === 401) {
    if (typeof window !== "undefined") {
      // Clear any local user state if necessary
      window.location.href = "/login";
    }
    throw new Error("Session expired. Please login again.");
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Something went wrong");
  }

  return response.json();
};
