import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function page() {
  const { userId, userRole } = await getSession();

  if (!userId || userRole !== "CANDIDATE") {
    redirect("/login" as any);
  }
  redirect(`/candidate/profile/${userId}` as any);
}
