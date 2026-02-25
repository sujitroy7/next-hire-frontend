import { AxiosInstance } from "axios";
import { ApiResponse } from "@/types/api";
import { Job, PaginatedJobResponse } from "@/types/job";

export async function getPublicJobs(
  axios: AxiosInstance,
  params?: Record<string, any>,
) {
  return axios.get<ApiResponse<PaginatedJobResponse>>("/jobs", { params });
}

export async function getJobById(axios: AxiosInstance, id: string) {
  return axios.get<ApiResponse<Job>>(`/jobs/${id}`);
}
