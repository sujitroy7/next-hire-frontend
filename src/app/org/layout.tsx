import OrgSidebar from "@/components/features/org-sidebar";
import { getSession } from "@/lib/auth";

export default async function OrgLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userRole } = await getSession();
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {userRole === "ORGANIZATION" && <OrgSidebar />}
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
