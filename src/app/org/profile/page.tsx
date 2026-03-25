import { getSession } from "@/lib/auth";
import { redirect, unauthorized } from "next/navigation";

export default async function page() {
  const session = await getSession();

  if (session?.userRole !== "ORGANIZATION") {
    unauthorized();
  }

  redirect(`/org/profile/${session.userId}`);
}
