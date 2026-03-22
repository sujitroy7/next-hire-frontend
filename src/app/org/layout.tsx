import { getSession } from "@/lib/auth";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const OrgSidebar = dynamic(() => import("@/components/features/org-sidebar"));

export default async function OrgLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Suspense fallback={null}>
        {session?.userRole === "ORGANIZATION" && <OrgSidebar />}
      </Suspense>
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
