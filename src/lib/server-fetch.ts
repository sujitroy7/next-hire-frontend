import { cookies } from "next/headers";
import { CandidateExperiance, CandidateProfile } from "@/types/candidate";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:4000";

interface CandidateProfileData extends CandidateProfile {
  experiances: CandidateExperiance[];
  education: [];
}

/**
 * Server-side data fetching utilities
 * These functions run only on the server and use cookies for authentication
 */

async function serverFetch(endpoint: string, options?: RequestInit) {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");

  const response = await fetch(`${BACKEND_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieHeader,
      ...options?.headers,
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Fetch candidate profile on the server
 * Used for SSR of the profile page
 */
export async function getCandidateProfileServer(
  userId: string,
): Promise<CandidateProfileData> {
  const response = await serverFetch(`/candidate-profile/${userId}`);
  return response.data;
}
