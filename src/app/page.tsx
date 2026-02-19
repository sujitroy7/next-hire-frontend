import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const { userId, userRole } = await getSession();

  if (!userId) redirect("/login" as any);

  if (userRole === "ORGANIZATION") redirect("/org/dashboard" as any);
  if (userRole === "RECRUITER") redirect("/recruiter/dashboard" as any);
  if (userRole === "CANDIDATE") redirect("/candidate/dashboard" as any);

  redirect("/login" as any);
}
