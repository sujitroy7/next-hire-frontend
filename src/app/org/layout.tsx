import RoleGuard from "@/components/shared/RoleGuard";
import { UserRoleEnum } from "@/types/auth";

export default async function OrganizationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RoleGuard role={UserRoleEnum.ORGANIZATION}>{children}</RoleGuard>;
}
