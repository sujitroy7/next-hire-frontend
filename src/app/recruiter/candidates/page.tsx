import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getSession } from "@/lib/auth";
import { Suspense } from "react";
import { candidatesSearchParamsCache } from "@/lib/searchParams";
import { getOrganizationCandidates } from "@/services/organizationApi";
import { serverAxios } from "@/lib/server-axios";
import { CandidatesTable } from "@/components/features/candidates/candidates-table/candidates-table";
import { CandidatesFilters } from "@/components/features/candidates/candidates-table/candidates-filters";
import { CandidatesTableSkeleton } from "@/components/features/candidates/candidates-table/candidates-table-skeleton";
import { CandidateActions } from "./_components/candidate-actions";

interface Props {
  searchParams?: Promise<{ search?: string; status?: string; page?: number }>;
}

export default async function RecruiterCandidatesPage(props: Props) {
  const session = await getSession();
  const { search, status, page } = candidatesSearchParamsCache.parse(
    await (props.searchParams || Promise.resolve({})),
  );
  let data;
  try {
    const response = await getOrganizationCandidates(serverAxios, {
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
            Candidates
          </h2>
          <p className="text-muted-foreground mt-1">
            View and manage all candidates who have applied to your
            organization&apos;s job openings.
          </p>
        </div>
      </div>

      <Card className="border-border/50 shadow-sm bg-background/50 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <CardTitle>All Applicants</CardTitle>
          <CardDescription>
            Filter and view all candidate applications.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense
            fallback={
              <div className="h-10 mb-6 bg-muted animate-pulse rounded-md" />
            }
          >
            <CandidatesFilters />
          </Suspense>
          <Suspense key={suspenseKey} fallback={<CandidatesTableSkeleton />}>
            <CandidatesTable
              data={data || []}
              renderActions={(candidate) => (
                <CandidateActions candidate={candidate} />
              )}
            />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
