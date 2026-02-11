import RoleGuard from "@/components/shared/RoleGuard";
import { UserRoleEnum } from "@/types/auth";

export default async function RecruiterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RoleGuard role={UserRoleEnum.RECRUITER}>{children}</RoleGuard>;
}
