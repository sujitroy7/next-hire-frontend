import { Suspense } from "react";
import dynamic from "next/dynamic";

const PublicNavbar = dynamic(
  () => import("@/components/features/public-navbar"),
);

export default function PublicPageLayouts({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <main className="flex-1 overflow-y-auto">
        <Suspense fallback={null}>
          <PublicNavbar />
        </Suspense>
        {children}
      </main>
    </div>
  );
}
