import { getSession } from "@/lib/auth";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const PublicNavbar = dynamic(
  () => import("@/components/features/public-navbar"),
);
const OrgSidebar = dynamic(() => import("@/components/features/org-sidebar"));
const RecruiterSidebar = dynamic(
  () => import("@/components/features/recruiter-sidebar"),
);

export default async function PublicPageLayouts({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Suspense>
        {session?.userRole === "ORGANIZATION" && <OrgSidebar />}
        {session?.userRole === "RECRUITER" && <RecruiterSidebar />}
      </Suspense>
      <main className="flex-1 overflow-y-auto">
        <Suspense>{!session?.userId && <PublicNavbar />}</Suspense>
        {children}
      </main>
    </div>
  );
}
