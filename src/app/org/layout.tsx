import { getSession } from "@/lib/auth";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const OrgSidebar = dynamic(() => import("@/components/shared/org-sidebar"));
const CommonNavbar = dynamic(() => import("@/components/shared/common-navbar"));

export default async function OrgLayout({
  children,
  chat,
}: {
  children: React.ReactNode;
  chat?: React.ReactNode;
}) {
  const session = await getSession();

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Suspense fallback={null}>
        {session?.userRole === "ORGANIZATION" && <OrgSidebar />}
      </Suspense>
      <main className="flex-1 overflow-y-auto">
        <Suspense fallback={null}>
          {(!session || session?.userRole !== "ORGANIZATION") && (
            <CommonNavbar />
          )}
        </Suspense>
        {children}
        {session?.userRole === "ORGANIZATION" && chat}
      </main>
    </div>
  );
}
