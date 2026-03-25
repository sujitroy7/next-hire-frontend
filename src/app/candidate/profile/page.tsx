import { getSession } from "@/lib/auth";
import { redirect, unauthorized } from "next/navigation";

export default async function page() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  if (session?.userRole !== "CANDIDATE") {
    unauthorized();
  }

  redirect(`/candidate/profile/${session?.userId}`);
}
