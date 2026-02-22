import { ApiResponse, PaginationParams, PaginationResponse } from "@/types/api";
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
  return axios.post<ApiResponse<Recruiter>>(`/users/recruiter`, data);
}

export async function deleteOrgRecruiter(axios: AxiosInstance, userId: string) {
  return axios.delete<ApiResponse<void>>(`/users/recruiter/${userId}`);
}

interface GetOrganizationJobsParams extends PaginationParams {
  search?: string;
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
