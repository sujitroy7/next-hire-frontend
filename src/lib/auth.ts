import { USER_ROLES } from "@/constants/users";
import { headers } from "next/headers";
import { cache } from "react";
import { Session } from "@/types/auth";

export const getSession = cache(async () => {
  const headersList = await headers();
  const userId = headersList.get("x-user-id");
  const userRole = headersList.get("x-user-role") as any;

  if (!userId || !userRole || !USER_ROLES.includes(userRole)) {
    throw new Error("Unauthorized");
  }

  const session: Session = { userId, userRole };
  return session;
});
