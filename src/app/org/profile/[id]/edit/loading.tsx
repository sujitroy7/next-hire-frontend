import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function Loading() {
  return (
    <div className="min-h-screen bg-muted/30 py-10">
      <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8 space-y-2">
          <Skeleton className="h-9 w-48" />
          <Skeleton className="h-5 w-96" />
        </div>

        <div className="grid gap-8">
          {/* Basic Information Section */}
          <Card>
            <CardHeader className="space-y-1">
              <Skeleton className="h-6 w-44" />
              <Skeleton className="h-4 w-72" />
            </CardHeader>
            <CardContent className="grid gap-6">
              {/* Organization Name */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-36" />
                <Skeleton className="h-10 w-full rounded-md" />
              </div>
              {/* About (Rich Text Editor) */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-32 w-full rounded-md" />
                <Skeleton className="h-4 w-16 ml-auto" />
              </div>
            </CardContent>
          </Card>

          {/* Organization Details Section */}
          <Card>
            <CardHeader className="space-y-1">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-64" />
            </CardHeader>
            <CardContent className="grid gap-6 sm:grid-cols-2">
              {/* Industry / Type */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-10 w-full rounded-md" />
              </div>
              {/* Company Size */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-10 w-full rounded-md" />
              </div>
            </CardContent>
          </Card>

          {/* Address Section */}
          <Card>
            <CardHeader className="space-y-1">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-4 w-64" />
            </CardHeader>
            <CardContent className="grid gap-6">
              {/* Street Line 1 */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-10 w-full rounded-md" />
              </div>
              {/* Street Line 2 */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-44" />
                <Skeleton className="h-10 w-full rounded-md" />
              </div>
              {/* City & State */}
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-12" />
                  <Skeleton className="h-10 w-full rounded-md" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-10 w-full rounded-md" />
                </div>
              </div>
              {/* Zip & Country */}
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-10 w-full rounded-md" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-10 w-full rounded-md" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information Section */}
          <Card>
            <CardHeader className="space-y-1">
              <Skeleton className="h-6 w-44" />
              <Skeleton className="h-4 w-56" />
            </CardHeader>
            <CardContent className="grid gap-6 sm:grid-cols-2">
              {/* Website URL */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-full rounded-md" />
              </div>
              {/* LinkedIn URL */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-10 w-full rounded-md" />
              </div>
              {/* Public Email */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-full rounded-md" />
              </div>
              {/* Public Phone */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-10 w-full rounded-md" />
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4">
            <Skeleton className="h-10 w-20 rounded-md" />
            <Skeleton className="h-10 w-[120px] rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
}
