import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await getSession();

  if (session?.userRole !== "ORGANIZATION") {
    redirect("/unauthorized");
  }

  redirect(`/org/profile/${session.userId}`);
}
