import { Skeleton } from "@/components/ui/skeleton";

export default function CommonNavbarSkeleton() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <Skeleton className="size-8 rounded-lg" />
          <Skeleton className="h-6 w-24" />
        </div>

        {/* Navigation & Auth Section */}
        <div className="flex items-center gap-6 md:gap-8">
          {/* Nav Items - hidden on small screens if they usually collapse, but kept simple here */}
          <Skeleton className="h-5 w-10" />
          <Skeleton className="h-5 w-12" />

          {/* Auth Nav Options Skeleton */}
          <div className="flex items-center gap-4">
            <Skeleton className="h-9 w-16" />
            <Skeleton className="h-9 w-20" />
          </div>
        </div>
      </div>
    </header>
  );
}
