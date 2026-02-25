import { getSession } from "@/lib/auth";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const RecruiterSidebar = dynamic(
  () => import("@/components/features/recruiter-sidebar"),
);

export default async function RecruiterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userRole } = await getSession();
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Suspense fallback={null}>
        {userRole === "RECRUITER" && <RecruiterSidebar />}
      </Suspense>
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
