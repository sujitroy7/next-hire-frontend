import { redirectionPages } from "@/constants/redirects";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function page() {
  const { userRole } = await getSession();
  redirect(redirectionPages[userRole]);
}
