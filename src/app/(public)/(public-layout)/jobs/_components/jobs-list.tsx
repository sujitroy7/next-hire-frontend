import { Job } from "@/types/job";
import { JobCard } from "./job-card";
import { SearchX } from "lucide-react";

interface JobsListProps {
  jobs: Job[];
}

export function JobsList({ jobs }: JobsListProps) {
  if (!jobs || jobs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 py-24 text-center bg-card rounded-xl border border-dashed border-border shadow-sm h-full">
        <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
          <SearchX className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-xl font-semibold tracking-tight text-foreground mb-2">
          No jobs found
        </h3>
        <p className="text-muted-foreground max-w-sm">
          We couldn&apos;t find any jobs matching your current search criteria.
          Try adjusting your filters or search terms.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}
