import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function page() {
  const { userId, userRole } = await getSession();

  if (!userId || userRole !== "ORGANIZATION") {
    redirect("/login" as any);
  }
  redirect(`/org/profile/${userId}` as any);
}
