import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyPermissions } from "@/lib/auth";
import { UserType } from "@/types/auth";

type RoleGuardProps = {
  children: React.ReactNode;
  role: UserType; // adjust as needed
};

export default async function RoleGuard({ children, role }: RoleGuardProps) {
  const cookieStore = await cookies();
  const token = cookieStore.get("permissions-token")?.value;

  const payload = await verifyPermissions(token || "");

  if (!payload || payload.role !== role) {
    redirect("/unauthorized");
  }

  return <>{children}</>;
}
