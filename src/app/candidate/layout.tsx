import { getSession } from "@/lib/auth";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const CandidateSidebar = dynamic(
  () => import("@/components/shared/candidate-sidebar"),
);
const PublicNavbar = dynamic(() => import("@/components/shared/public-navbar"));

export default async function CandidateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Suspense fallback={null}>
        {session?.userRole === "CANDIDATE" && <CandidateSidebar />}
      </Suspense>
      <main className="flex-1 overflow-y-auto">
        <Suspense fallback={null}>
          {(!session || session?.userRole !== "CANDIDATE") && <PublicNavbar />}
        </Suspense>
        {children}
      </main>
    </div>
  );
}
