import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getSession } from "@/lib/auth";
import { Plus } from "lucide-react";
import { Suspense } from "react";
import { jobsSearchParamsCache } from "@/lib/searchParams";
import {
  getOrganizationJobs,
  getRecruiterJobs,
} from "@/services/organizationApi";
import { serverAxios } from "@/lib/server-axios";
import { JobsTable } from "@/components/features/jobs/jobs-table/jobs-table";
import { JobsFilters } from "@/components/features/jobs/jobs-table/jobs-filters";
import { JobsTableSkeleton } from "@/components/features/jobs/jobs-table/jobs-table-skeleton";
import { RecruiterJobActions } from "./_components/recruiter-job-actions";

interface Props {
  searchParams?: Promise<{ search?: string; status?: string; page?: number }>;
}

export default async function RecruiterJobsPage(props: Props) {
  const session = await getSession();
  const { search, status, page } = jobsSearchParamsCache.parse(
    await (props.searchParams || Promise.resolve({})),
  );
  let data;
  try {
    const response = await getRecruiterJobs(serverAxios, {
      limit: 10,
      search,
      status: status ?? undefined,
      page,
    });
    if (response.data.status === "success") {
      data = response.data.data.data;
    }
  } catch (error) {}

  const suspenseKey = Object.entries({ search, status, page }).join("-");

  return (
    <div className="flex-1 space-y-8 max-w-7xl mx-auto w-full py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Jobs
          </h2>
          <p className="text-muted-foreground mt-1">
            Manage your organization&apos;s job postings, candidates, and hiring
            pipeline.
          </p>
        </div>
        {session?.userRole === "RECRUITER" && (
          <Button size="lg" className="shadow-sm">
            <Plus className="mr-2 h-5 w-5" /> Add Job
          </Button>
        )}
      </div>

      <Card className="border-border/50 shadow-sm bg-background/50 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <CardTitle>All Openings</CardTitle>
          <CardDescription>Filter and view all job positions.</CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense
            fallback={
              <div className="h-10 mb-6 bg-muted animate-pulse rounded-md" />
            }
          >
            <JobsFilters />
          </Suspense>
          <Suspense key={suspenseKey} fallback={<JobsTableSkeleton />}>
            <JobsTable
              data={data || []}
              renderActions={(job) => (
                <RecruiterJobActions
                  job={job}
                  isOwner={job.recruiterId === session?.userId}
                />
              )}
            />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
