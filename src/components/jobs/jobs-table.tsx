import { Job } from "@/types/job";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const JobActionsDropdown = dynamic(() => import("./job-actions-dropdown"), {});

interface JobsTableProps {
  data: Job[];
}

export function JobsTable({ data }: JobsTableProps) {
  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden">
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead className="h-12 font-semibold pl-6">Job Title</TableHead>
            <TableHead className="h-12 font-semibold">Department</TableHead>
            <TableHead className="h-12 font-semibold">Type</TableHead>
            <TableHead className="h-12 font-semibold">Status</TableHead>
            <TableHead className="h-12 font-semibold">Posted Date</TableHead>
            <TableHead className="h-12 font-semibold text-center">
              Applicants
            </TableHead>
            <TableHead className="h-12 font-semibold pr-6 text-right">
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.length ? (
            data.map((job) => (
              <TableRow
                key={job.id}
                className="transition-colors hover:bg-muted/50"
              >
                <TableCell className="py-4 pl-6">
                  <div className="font-medium text-primary">{job.title}</div>
                </TableCell>
                <TableCell className="py-4">{job.department}</TableCell>
                <TableCell className="py-4">
                  <Badge variant="secondary" className="capitalize">
                    {job.employmentType?.replace("_", " ").toLowerCase() || "-"}
                  </Badge>
                </TableCell>
                <TableCell className="py-4">
                  <Badge
                    variant={
                      job.status === "PUBLISHED" ? "default" : "secondary"
                    }
                  >
                    {job.status}
                  </Badge>
                </TableCell>
                <TableCell className="py-4">
                  {job.publishedAt
                    ? new Intl.DateTimeFormat("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      }).format(new Date(job.publishedAt))
                    : "-"}
                </TableCell>
                <TableCell className="py-4 text-center">
                  <span className="font-medium">{job.applicants ?? 0}</span>
                </TableCell>
                <TableCell className="py-4 pr-6 text-right">
                  <Suspense
                    fallback={
                      <div className="h-8 w-8 ml-auto animate-pulse bg-muted rounded-md" />
                    }
                  >
                    <JobActionsDropdown job={job} />
                  </Suspense>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={7}
                className="h-32 text-center text-muted-foreground"
              >
                No jobs found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
