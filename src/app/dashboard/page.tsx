import { redirectionPages } from "@/constants/redirects";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  redirect(redirectionPages[session.userRole].path);
}
