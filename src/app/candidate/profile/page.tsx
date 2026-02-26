import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function page() {
  const { userId, userRole } = await getSession();

  if (userRole !== "CANDIDATE") {
    redirect("/unauthorized");
  }

  redirect(`/candidate/profile/${userId}`);
}
