import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function JobSkeleton() {
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero Skeleton */}
      <div className="bg-muted/30 border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="flex flex-col md:flex-row justify-between items-start gap-6">
            <div className="space-y-5 flex-1 w-full">
              <div className="flex items-center gap-3">
                <Skeleton className="h-6 w-24 rounded-full" />
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>
              <Skeleton className="h-10 w-3/4 max-w-md" />
              <div className="flex items-center gap-6 mt-4">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-5 w-36" />
              </div>
            </div>
            <div className="flex items-center gap-3 pt-2 md:pt-4 w-full md:w-auto">
              <Skeleton className="h-12 w-32 rounded-md" />
              <Skeleton className="h-12 w-12 rounded-md" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Layout Skeleton */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-10">
            <section className="space-y-4">
              <Skeleton className="h-8 w-48 mb-6" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
            </section>

            <section className="space-y-4 pt-4 border-t border-border mt-8">
              <Skeleton className="h-7 w-56 mb-5" />
              <div className="flex flex-wrap gap-2">
                <Skeleton className="h-8 w-20 rounded-full" />
                <Skeleton className="h-8 w-24 rounded-full" />
                <Skeleton className="h-8 w-16 rounded-full" />
                <Skeleton className="h-8 w-28 rounded-full" />
              </div>
            </section>
          </div>

          <div className="space-y-6">
            <Card className="shadow-sm border-border bg-card">
              <CardHeader className="pb-4 border-b border-border/50">
                <Skeleton className="h-6 w-32" />
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-start gap-4">
                    <Skeleton className="w-10 h-10 rounded-md shrink-0" />
                    <div className="space-y-2 mt-1">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-3 w-32" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
