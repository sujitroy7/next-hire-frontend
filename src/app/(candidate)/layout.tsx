import RoleGuard from "@/components/shared/RoleGuard";
import { UserType } from "@/types/auth";

export default async function CandidateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RoleGuard role={UserType.CANDIDATE}>{children}</RoleGuard>;
}
