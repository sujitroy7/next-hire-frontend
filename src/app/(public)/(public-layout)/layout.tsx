import PublicNavbar from "@/components/features/public-navbar";

export default function PublicPageLayouts({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <main className="flex-1 overflow-y-auto">
        <PublicNavbar />
        {children}
      </main>
    </div>
  );
}
