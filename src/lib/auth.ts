import { USER_ROLES } from "@/constants/users";
import { headers } from "next/headers";
import { cache } from "react";
import { Session, UserRole } from "@/types/auth";

export const getSession = cache(async (): Promise<Session | null> => {
  const headersList = await headers();
  const userId = headersList.get("x-user-id");
  const userRoleString = headersList.get("x-user-role");

  if (!userId || !userRoleString) {
    return null;
  }

  const userRole = userRoleString as UserRole;

  if (!USER_ROLES.includes(userRole)) {
    return null;
  }

  const session: Session = { userId, userRole };
  return session;
});
