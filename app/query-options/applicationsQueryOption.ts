import { queryOptions, useMutation } from "@tanstack/react-query";
import { APIError, ApiResponse, Application, CreateApplicationPayload, ApplicationUser } from "../types";
import { APPLICATION_API } from "../services/applicationService/applicationService";
import { api } from "../lib/apiClient";
import { getAuthCookie } from "../lib/actions/cookies";

export interface ApplicationsApiResponse {
  data: Application[];
  isSuccessful: boolean;
  message: string;
  code: string;
}

const getApplications = (): Promise<ApplicationsApiResponse> => api(APPLICATION_API.getApplications);

const createApplication = async (formData: CreateApplicationPayload): Promise<ApiResponse & { data?: Application }> => {
  const token = await getAuthCookie();
  if (!token) {
    throw new Error("Unauthorized - No token found");
  }

  return api(APPLICATION_API.createApplication, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(formData),
  });
};

const deleteApplication = async (appId: string): Promise<ApiResponse> => {
  const token = await getAuthCookie();
  if (!token) {
    throw new Error("Unauthorized - No token found");
  }

  return api(`${APPLICATION_API.deleteApplication}/${appId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getApplicationUsers = async (appId: string): Promise<{ data: ApplicationUser[] }> => {
  const token = await getAuthCookie();
  if (!token) {
    throw new Error("Unauthorized - No token found");
  }

  return api(`${APPLICATION_API.getApplicationUsers}/${appId}/users`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export function getApplicationsQueryOptions() {
  return queryOptions({
    queryKey: ["getApplications"],
    queryFn: getApplications,
    refetchOnWindowFocus: false,
  });
}

export function useCreateApplicationMutation() {
  return useMutation<ApiResponse & { data?: Application }, APIError, CreateApplicationPayload>({
    mutationFn: createApplication,
  });
}

export function useDeleteApplicationMutation() {
  return useMutation<ApiResponse, APIError, string>({
    mutationFn: deleteApplication,
  });
}

export function getApplicationUsersQueryOptions(appId: string) {
  return queryOptions({
    queryKey: ["getApplicationUsers", appId],
    queryFn: () => getApplicationUsers(appId),
    enabled: !!appId,
    refetchOnWindowFocus: false,
  });
}
