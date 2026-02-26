import { UserRole } from "@/types/auth";

export const redirectionPages: Record<UserRole, string> = {
  ORGANIZATION: "/org/dashboard",
  RECRUITER: "/recruiter/dashboard",
  CANDIDATE: "/candidate/dashboard",
};
