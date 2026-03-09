import { getSession } from "@/lib/auth";
import { redirectionPages } from "@/constants/redirects";
import { redirect } from "next/navigation";

export default async function Home() {
  try {
    const { userRole } = await getSession();
    redirect(redirectionPages[userRole]);
  } catch {
    redirect("/login");
  }
}
