import CommonNavbarSkeleton from "@/components/shared/common-navbar/skeleton";
import { getSession } from "@/lib/auth";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const CommonNavbar = dynamic(() => import("@/components/shared/common-navbar"));
const OrgSidebar = dynamic(() => import("@/components/shared/org-sidebar"));
const RecruiterSidebar = dynamic(
  () => import("@/components/shared/recruiter-sidebar"),
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
        <Suspense fallback={<CommonNavbarSkeleton />}>
          {!session?.userId && <CommonNavbar />}
        </Suspense>
        {children}
      </main>
    </div>
  );
}
