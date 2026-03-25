import dynamic from "next/dynamic";
import { Suspense } from "react";
import CommonNavbarSkeleton from "@/components/shared/common-navbar/skeleton";
const CommonNavbar = dynamic(() => import("@/components/shared/common-navbar"));

export default function CandidateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Suspense fallback={<CommonNavbarSkeleton />}>
        <CommonNavbar />
      </Suspense>
      <main className="flex-1">{children}</main>
    </div>
  );
}
