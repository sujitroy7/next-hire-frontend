import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Left Column - Sticky Profile Card */}
        <div className="md:col-span-1">
          <div className="sticky top-4 space-y-6">
            <Card>
              <CardContent className="flex flex-col items-center pt-6 text-center">
                <Skeleton className="mb-4 h-32 w-32 rounded-full border-4 border-muted" />
                <Skeleton className="h-8 w-48 mb-2" />
                <Skeleton className="h-4 w-32 mb-4" />
                {/* Badge Skeleton */}
                <Skeleton className="h-6 w-24 mb-6 rounded-full" />
                {/* Button Skeleton */}
                <Skeleton className="h-10 w-full" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-40" />
              </CardHeader>
              <CardContent className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-20" />
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Skeleton key={i} className="h-6 w-16 rounded-full" />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right Column - Scrollable Content */}
        <div className="space-y-6 md:col-span-2">
          {/* About Me */}
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </CardContent>
          </Card>

          {/* Experience */}
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {[1, 2].map((i) => (
                  <div key={i} className="relative pl-2">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                      <Skeleton className="h-12 w-12 rounded-md shrink-0" />
                      <div className="flex-1 space-y-2">
                        <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
                          <div className="space-y-1">
                            <Skeleton className="h-5 w-48" />
                            <Skeleton className="h-4 w-32" />
                          </div>
                          <Skeleton className="h-4 w-32" />
                        </div>
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-6 w-20 rounded-full" />
                      </div>
                    </div>
                    {i < 2 && <Separator className="my-6" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Education */}
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[1, 2].map((i) => (
                  <div key={i}>
                    <div className="flex items-start gap-4">
                      <Skeleton className="h-12 w-12 rounded-md shrink-0" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-5 w-40" />
                        <Skeleton className="h-4 w-full" />
                      </div>
                    </div>
                    {i < 2 && <Separator className="my-4" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
