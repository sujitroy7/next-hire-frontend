import { PublicJobsFilters } from "./_components/public-jobs-filters";
import { JobsList } from "./_components/jobs-list";
import { jobsSearchParamsCache } from "@/lib/searchParams";
import { getPublicJobs } from "@/services/publicApi";
import { serverAxios } from "@/lib/server-axios";
import { SearchParams } from "nuqs/server";

export default async function JobsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const {
    search,
    status,
    workplaceType,
    employmentType,
    experienceLevel,
    page,
  } = await jobsSearchParamsCache.parse(searchParams);

  // Filter out nulls to only send defined params
  const queryParams = Object.fromEntries(
    Object.entries({
      search,
      status: "PUBLISHED", // Always force published for public view
      workplaceType,
      employmentType,
      experienceLevel,
      page,
      limit: 10,
    }).filter(([_, v]) => v != null),
  );

  let jobs: any[] = [];
  try {
    const response = await getPublicJobs(serverAxios, queryParams);
    if (response.data.status === "success") {
      jobs = response.data.data.data || [];
    }
  } catch (error) {
    console.error("Error fetching public jobs:", error);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight lg:text-4xl text-foreground">
          Explore Opportunities
        </h1>
        <p className="mt-2 text-muted-foreground text-lg">
          Find your next career move at NextHire.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
        {/* Sidebar */}
        <div className="md:col-span-1 md:sticky md:top-6">
          <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
            <h2 className="text-lg font-semibold tracking-tight mb-4 text-foreground">
              Filters
            </h2>
            <PublicJobsFilters />
          </div>
        </div>

        {/* Main Content */}
        <div className="md:col-span-3">
          <JobsList jobs={jobs} />
        </div>
      </div>
    </div>
  );
}
