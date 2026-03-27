import { ApiResponse, PaginationParams, PaginationResponse } from "@/types/api";
import { OrganizationCandidate } from "@/types/candidate";
import { OrgDashboardStats, RecentActivityItem } from "@/types/dashboard";
import { Job } from "@/types/job";
import { OrganizationProfile } from "@/types/organization";
import { Recruiter } from "@/types/recruiter";
import { AxiosInstance } from "axios";

export async function getOrganizationProfileById(
  axios: AxiosInstance,
  userId: string,
) {
  return axios.get<ApiResponse<OrganizationProfile>>(
    `/organization-profile/${userId}`,
  );
}

export async function createOrganizationProfile(
  axios: AxiosInstance,
  data: Omit<
    OrganizationProfile,
    "id" | "createdAt" | "updatedAt" | "isVerified" | "isActive"
  >,
) {
  return axios.post<ApiResponse<OrganizationProfile>>(
    `/organization-profile`,
    data,
  );
}

export async function updateOrganizationProfile(
  axios: AxiosInstance,
  {
    userId,
    ...data
  }: Omit<
    OrganizationProfile,
    "id" | "createdAt" | "updatedAt" | "isVerified" | "isActive"
  >,
) {
  return axios.patch<ApiResponse<OrganizationProfile>>(
    `/organization-profile/${userId}`,
    data,
  );
}

export async function getOrgRecruiters(
  axios: AxiosInstance,
  { page, limit }: PaginationParams,
) {
  return axios.get<ApiResponse<PaginationResponse<Recruiter[]>>>(
    `/users/recruiters`,
    { params: { page, limit } },
  );
}

export async function createOrgRecruiter(
  axios: AxiosInstance,
  data: { firstName: string; lastName: string; email: string },
) {
  return axios.post<ApiResponse<Recruiter>>(`/users/register/recruiter`, data);
}

export async function deleteOrgRecruiter(axios: AxiosInstance, userId: string) {
  return axios.delete<ApiResponse<void>>(`/users/recruiter/${userId}`);
}

interface GetOrganizationJobsParams extends PaginationParams {
  search?: string | null;
  status?: string;
}
export async function getOrganizationJobs(
  axios: AxiosInstance,
  { page, limit, search, status }: GetOrganizationJobsParams,
) {
  return axios.get<ApiResponse<PaginationResponse<Job[]>>>(
    `/organization/jobs`,
    { params: { page, limit, search, status } },
  );
}

interface GetRecruiterJobsParams extends PaginationParams {
  search?: string | null;
  status?: string;
}
export async function getRecruiterJobs(
  axios: AxiosInstance,
  { page, limit, search, status }: GetRecruiterJobsParams,
) {
  return axios.get<ApiResponse<PaginationResponse<Job[]>>>(`/recruiter/jobs`, {
    params: { page, limit, search, status },
  });
}

export async function createRecruiterJob(
  axios: AxiosInstance,
  data: Partial<Job>,
) {
  return axios.post<ApiResponse<Job>>(`/recruiter/jobs`, data);
}

export async function updateRecruiterJobStatus(
  axios: AxiosInstance,
  jobId: string,
  status: "DRAFT" | "PUBLISHED" | "CLOSED" | "ARCHIVED",
) {
  return axios.patch<ApiResponse<Job>>(`/recruiter/jobs/${jobId}/status`, {
    status,
  });
}

export async function getRecruiterJobById(axios: AxiosInstance, jobId: string) {
  return axios.get<ApiResponse<Job>>(`/recruiter/jobs/${jobId}`);
}

export async function updateRecruiterJob(
  axios: AxiosInstance,
  jobId: string,
  data: Partial<Job>,
) {
  return axios.patch<ApiResponse<Job>>(`/recruiter/jobs/${jobId}`, data);
}

interface GetOrganizationCandidatesParams extends PaginationParams {
  search?: string | null;
  status?: string;
  jobId?: string | null;
}
export async function getOrganizationCandidates(
  axios: AxiosInstance,
  { page, limit, search, status, jobId }: GetOrganizationCandidatesParams,
) {
  return axios.get<ApiResponse<PaginationResponse<OrganizationCandidate[]>>>(
    `/job-applications/organization/candidates`,
    {
      params: { page, limit, search, status, jobId },
    },
  );
}

export async function getOrganizationDashboardStats(axios: AxiosInstance) {
  return axios.get<
    ApiResponse<{
      stats: OrgDashboardStats;
      recentJobs: Job[];
    }>
  >(`/organization/dashboard/stats`);
}

export async function getOrganizationRecentActivity(axios: AxiosInstance) {
  return axios.get<ApiResponse<RecentActivityItem[]>>(
    `/job-applications/organization/recent-activity`,
  );
}

export async function getRecruiterDashboardStats(axios: AxiosInstance) {
  return axios.get<ApiResponse<OrgDashboardStats>>(
    `/recruiter/dashboard/stats`,
  );
}

export async function getRecruiterRecentActivity(axios: AxiosInstance) {
  return axios.get<ApiResponse<RecentActivityItem[]>>(
    `/job-applications/recruiter/recent-activity`,
  );
}
