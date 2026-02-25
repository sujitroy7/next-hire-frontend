import { Job } from "@/types/job";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building2, MapPin, Briefcase, Clock } from "lucide-react";
import Link from "next/link";

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
  const publishedTimeAgo = job.publishedAt
    ? new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }).format(new Date(job.publishedAt))
    : "";

  return (
    <Card className="hover:shadow-md transition-shadow group flex flex-col sm:flex-row h-full border-border">
      <div className="flex-1 p-6 flex flex-col justify-between">
        <div className="space-y-4">
          <div className="flex justify-between items-start gap-4">
            <div className="space-y-1">
              <CardTitle className="text-xl font-bold tracking-tight group-hover:text-primary transition-colors">
                <Link href={`/jobs/view/${job.id}` as any}>{job.title}</Link>
              </CardTitle>
              <CardDescription className="text-sm flex items-center gap-1.5 text-muted-foreground">
                <Building2 className="w-4 h-4" />
                <span>
                  {job.organization?.organizationProfile?.name ||
                    "Organization"}
                </span>
                {job.location && (
                  <>
                    <span className="hidden sm:inline mx-1">•</span>
                    <MapPin className="w-3.5 h-3.5 hidden sm:block" />
                    <span className="hidden sm:inline">{job.location}</span>
                  </>
                )}
              </CardDescription>
            </div>
            {publishedTimeAgo && (
              <span className="text-xs text-muted-foreground whitespace-nowrap bg-muted/50 px-2 py-1 rounded-md">
                {publishedTimeAgo}
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-foreground/80">
            {job.location && (
              <div className="flex items-center gap-1.5 sm:hidden">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span>{job.location}</span>
              </div>
            )}
            <div className="flex items-center gap-1.5">
              <Briefcase className="w-4 h-4 text-muted-foreground" />
              <span className="capitalize">
                {job.workplaceType?.replace("_", " ").toLowerCase()}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="capitalize">
                {job.employmentType?.replace("_", " ").toLowerCase()}
              </span>
            </div>
            {job.salaryMin && job.salaryMax && (
              <div className="flex items-center gap-1.5 font-medium">
                <span className="text-muted-foreground">Salary: </span>
                {job.currency} {job.salaryMin.toLocaleString()} -{" "}
                {job.salaryMax.toLocaleString()}{" "}
                <span className="text-muted-foreground font-normal text-xs">
                  /{job?.salaryInterval?.toLowerCase()}
                </span>
              </div>
            )}
          </div>
        </div>

        {job.skills && job.skills.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border/50">
            {job.skills.slice(0, 5).map((skill, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="font-normal text-xs bg-secondary/50"
              >
                {skill}
              </Badge>
            ))}
            {job.skills.length > 5 && (
              <Badge
                variant="outline"
                className="font-normal text-xs border-dashed text-muted-foreground"
              >
                +{job.skills.length - 5} more
              </Badge>
            )}
          </div>
        )}
      </div>

      <div className="sm:w-48 bg-muted/20 p-6 flex flex-col justify-center items-center border-t sm:border-t-0 sm:border-l border-border gap-4 shrink-0 transition-colors group-hover:bg-muted/40">
        <Button
          asChild
          className="w-full shadow-sm hover:shadow-md transition-all"
        >
          <Link href={`/jobs/view/${job.id}` as any}>View Details</Link>
        </Button>
        {!job.salaryMin && !job.salaryMax && (
          <span className="text-muted-foreground text-xs font-normal text-center">
            Salary undisclosed
          </span>
        )}
      </div>
    </Card>
  );
}
