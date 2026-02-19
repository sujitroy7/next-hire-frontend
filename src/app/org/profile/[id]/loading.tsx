import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function Loading() {
  return (
    <div className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="relative">
          {/* Cover Image */}
          <Skeleton className="h-48 w-full rounded-xl" />

          <div className="absolute -bottom-12 left-8 flex items-end space-x-6">
            {/* Avatar */}
            <Skeleton className="h-32 w-32 rounded-full border-4 border-background" />
            {/* Name & Meta */}
            <div className="mb-4 space-y-2">
              <div className="flex items-center gap-2">
                <Skeleton className="h-8 w-56" />
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>
              <div className="flex items-center gap-4">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-4 w-36" />
              </div>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Content - Left Column */}
          <div className="md:col-span-2 space-y-6">
            {/* About Us */}
            <Card className="shadow-sm border-border/50">
              <CardHeader>
                <Skeleton className="h-6 w-28" />
              </CardHeader>
              <CardContent className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </CardContent>
            </Card>

            {/* Gallery */}
            <Card className="shadow-sm border-border/50">
              <CardHeader>
                <Skeleton className="h-6 w-40" />
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <Skeleton
                      key={i}
                      className="aspect-video w-full rounded-md"
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Right Column */}
          <div className="space-y-6">
            <Card className="shadow-sm border-border/50">
              <CardHeader>
                <Skeleton className="h-5 w-28" />
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Contact Items (Website, LinkedIn, Email, Phone) */}
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Skeleton className="h-5 w-5 mt-0.5 shrink-0" />
                    <div className="flex flex-col gap-1 flex-1">
                      <Skeleton className="h-3 w-16" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                  </div>
                ))}

                <Separator className="my-2" />

                {/* Joined */}
                <div className="flex items-start gap-3">
                  <Skeleton className="h-5 w-5 mt-0.5 shrink-0" />
                  <div className="flex flex-col gap-1">
                    <Skeleton className="h-3 w-14" />
                    <Skeleton className="h-4 w-28" />
                  </div>
                </div>

                {/* Company Size */}
                <div className="flex items-start gap-3">
                  <Skeleton className="h-5 w-5 mt-0.5 shrink-0" />
                  <div className="flex flex-col gap-1">
                    <Skeleton className="h-3 w-24" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
