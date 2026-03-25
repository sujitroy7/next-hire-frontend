import { UserRole } from "@/types/auth";

export const redirectionPages: Record<
  UserRole,
  {
    path: string;
    label: string;
  }
> = {
  ORGANIZATION: {
    path: "/org/dashboard",
    label: "Dashboard",
  },
  RECRUITER: {
    path: "/recruiter/dashboard",
    label: "Dashboard",
  },
  CANDIDATE: {
    path: "/candidate/profile",
    label: "Profile",
  },
};
