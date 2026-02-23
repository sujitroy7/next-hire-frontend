import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SearchX, Home, Briefcase } from "lucide-react";

export default function JobNotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-background px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="flex justify-center">
          <div className="w-24 h-24 bg-muted/50 rounded-full flex items-center justify-center">
            <SearchX className="w-12 h-12 text-muted-foreground" />
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl font-bold tracking-tight lg:text-4xl text-foreground">
            Job Not Found
          </h1>
          <p className="text-muted-foreground text-base leading-7">
            The job listing you're looking for might have been removed, has
            expired, or is temporarily unavailable.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Button
            asChild
            size="lg"
            className="w-full sm:w-auto font-semibold hover:scale-[1.02] transition-transform"
          >
            <Link href={"/jobs" as any}>
              <Briefcase className="w-4 h-4 mr-2" />
              Browse All Jobs
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="w-full sm:w-auto font-semibold hover:scale-[1.02] transition-transform"
          >
            <Link href={"/" as any}>
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
