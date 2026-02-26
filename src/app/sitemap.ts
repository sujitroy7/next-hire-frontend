import type { MetadataRoute } from "next";
import { serverAxios } from "@/lib/server-axios";
import { ApiResponse, PaginationResponse } from "@/types/api";
import { Job } from "@/types/job";

const BASE_URL = process.env.NEXTAUTH_URL || "http://localhost:3000";
const JOBS_PER_PAGE = 100; // Use a large page size to minimise requests

// ---------------------------------------------------------------------------
// Static routes
// ---------------------------------------------------------------------------
const staticRoutes: MetadataRoute.Sitemap = [
  //   {
  //     url: `${BASE_URL}/`,
  //     lastModified: new Date(),
  //     changeFrequency: "daily",
  //     priority: 1.0,
  //   },
  {
    url: `${BASE_URL}/jobs`,
    lastModified: new Date(),
    changeFrequency: "hourly",
    priority: 0.9,
  },
];

// ---------------------------------------------------------------------------
// Fetch all published jobs across every page
// ---------------------------------------------------------------------------
async function getAllPublishedJobs(): Promise<Job[]> {
  const allJobs: Job[] = [];

  try {
    // Fetch first page to get total count
    const firstRes = await serverAxios.get<
      ApiResponse<PaginationResponse<Job[]>>
    >("/jobs", {
      params: { status: "PUBLISHED", page: 1, limit: JOBS_PER_PAGE },
    });

    if (firstRes.data.status !== "success") return [];

    const firstPage = firstRes.data.data;
    allJobs.push(...(firstPage.data ?? []));

    const totalPages = firstPage.pagination?.totalPages ?? 1;

    // Fetch remaining pages in parallel
    if (totalPages > 1) {
      const pageNumbers = Array.from(
        { length: totalPages - 1 },
        (_, i) => i + 2,
      );

      const remainingRequests = pageNumbers.map((page) =>
        serverAxios.get<ApiResponse<PaginationResponse<Job[]>>>("/jobs", {
          params: { status: "PUBLISHED", page, limit: JOBS_PER_PAGE },
        }),
      );

      const results = await Promise.allSettled(remainingRequests);

      for (const result of results) {
        if (
          result.status === "fulfilled" &&
          result.value.data.status === "success"
        ) {
          allJobs.push(...(result.value.data.data.data ?? []));
        }
      }
    }
  } catch (error) {
    // Fail silently - return whatever was collected so far
    console.error("[sitemap] Failed to fetch jobs:", error);
  }

  return allJobs;
}

// ---------------------------------------------------------------------------
// Sitemap entry point
// ---------------------------------------------------------------------------
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const jobs = await getAllPublishedJobs();

  const jobRoutes: MetadataRoute.Sitemap = jobs.map((job) => ({
    url: `${BASE_URL}/jobs/view/${job.id}`,
    lastModified: new Date(job.updatedAt),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...jobRoutes];
}
