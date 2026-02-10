import RoleGuard from "@/components/shared/RoleGuard";
import { UserType } from "@/types/auth";

export default async function RecruiterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RoleGuard role={UserType.RECRUITER}>{children}</RoleGuard>;
}
