import { AxiosInstance } from "axios";

export async function getOrganizationProfileById(
  axios: AxiosInstance,
  id: string,
) {
  return axios.get(`/organization-profile/${id}`);
}
