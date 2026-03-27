import { Skeleton } from "@/components/ui/skeleton";

export function PublicJobsFiltersSkeleton() {
  return (
    <div className="space-y-8">
      {/* Search */}
      <div className="space-y-3">
        <Skeleton className="h-4 w-12" />
        <Skeleton className="h-10 w-full shadow-sm" />
      </div>

      {/* Workplace Type */}
      <div className="space-y-4">
        <Skeleton className="h-4 w-28" />
        <div className="flex flex-col gap-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center space-x-2">
              <Skeleton className="h-4 w-4 rounded-sm" />
              <Skeleton className="h-4 w-20" />
            </div>
          ))}
        </div>
      </div>

      {/* Employment Type */}
      <div className="space-y-4">
        <Skeleton className="h-4 w-32" />
        <div className="flex flex-col gap-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center space-x-2">
              <Skeleton className="h-4 w-4 rounded-sm" />
              <Skeleton className="h-4 w-24" />
            </div>
          ))}
        </div>
      </div>

      {/* Experience Level Slider */}
      <div className="space-y-4">
        <Skeleton className="h-4 w-32" />
        <div className="pt-2 pb-6 px-1">
          <Skeleton className="h-2 w-full mt-2" />
          <div className="flex justify-center mt-4">
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
      </div>
    </div>
  );
}
