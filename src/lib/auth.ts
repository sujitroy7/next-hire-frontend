import { headers } from "next/headers";
import { cache } from "react";

export const getSession = cache(async () => {
  const headersList = await headers();
  const userId = headersList.get("x-user-id");
  const userRole = headersList.get("x-user-role");

  return { userId, userRole };
});
