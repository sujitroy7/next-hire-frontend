import RoleGuard from "@/components/shared/RoleGuard";
import { UserType } from "@/types/auth";

export default async function OrganizationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RoleGuard role={UserType.ORGANIZATION}>{children}</RoleGuard>;
}
