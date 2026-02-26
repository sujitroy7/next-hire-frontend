import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function page() {
  const { userId, userRole } = await getSession();

  if (userRole !== "ORGANIZATION") {
    redirect("/unauthorized");
  }

  redirect(`/org/profile/${userId}`);
}
