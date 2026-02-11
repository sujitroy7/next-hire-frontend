import RoleGuard from "@/components/shared/RoleGuard";
import { UserRoleEnum } from "@/types/auth";

export default async function CandidateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RoleGuard role={UserRoleEnum.CANDIDATE}>{children}</RoleGuard>;
}
