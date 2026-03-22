import { getSession } from "@/lib/auth";
import { redirectionPages } from "@/constants/redirects";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getSession();

  if (!session) {
    redirect("/login?reload=true");
  }

  redirect(redirectionPages[session.userRole]);
}
