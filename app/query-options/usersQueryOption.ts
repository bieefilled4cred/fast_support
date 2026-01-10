import {
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import jwt from "jsonwebtoken";

import {
  APIError,
  ApiResponse,
  InviteUserPayload,
  UpdateUserPayload,
  Role,
  User,
  PaginatedResponse,
  UsersQueryParams,
} from "../types";
import { api } from "../lib/apiClient";
import { USER_API } from "../services/userService/userService";
import { DEFAULT_PAGE_SIZE } from "../constants/api";
import { getAuthCookie } from "../lib/actions/cookies";

const inviteUser = (formData: InviteUserPayload): Promise<ApiResponse> =>
  api(USER_API.inviteUser, {
    method: "POST",
    body: JSON.stringify(formData),
  });

const getUserRole = (username: string): Promise<Role> =>
  api(`${USER_API.getUserRole}/${username}`);

const getUsers = (
  params: UsersQueryParams = {}
): Promise<PaginatedResponse<User>> => {
  const {
    startDate,
    endDate,
    status,
    role,
    pageNumber = 1,
    pageSize = DEFAULT_PAGE_SIZE,
    searchKeyword,
  } = params;

  const queryParams = new URLSearchParams();

  if (startDate) {
    queryParams.append("StartDate", startDate);
  }
  if (endDate) {
    queryParams.append("EndDate", endDate);
  }
  if (status && status !== "all") {
    queryParams.append("Status", status);
  }
  if (role && role !== "all") {
    queryParams.append("Role", role);
  }
  if (pageNumber) {
    queryParams.append("PageNumber", pageNumber.toString());
  }
  queryParams.append("PageSize", pageSize.toString());
  if (searchKeyword) {
    queryParams.append("Username", searchKeyword);
  }

  const queryString = queryParams.toString();
  const path = `${USER_API.getUsers}${queryString ? `?${queryString}` : ""}`;

  return api(path);
};

const getUserById = (userId: string): Promise<{ data: User }> =>
  api(`${USER_API.getUserById}/${userId}`);

const getAuthenticatedUser = async (): Promise<{ data: User }> => {
  const token = await getAuthCookie();
  if (!token) {
    throw new Error("Unauthorized - No token found");
  }

  let userId: string | null = null;
  try {
    const decoded = jwt.decode(token) as { SourceId?: string } | null;
    userId = decoded?.SourceId || null;
  } catch {
    throw new Error("Invalid Token");
  }

  if (!userId) {
    throw new Error("User ID not found in token");
  }

  return api(`${USER_API.getUserById}/${userId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const exportUsers = (
  params: UsersQueryParams = {},
  format: "csv" | "xlsx" = "csv"
): Promise<Blob> => {
  const { startDate, endDate, status, role, searchKeyword } = params;

  const queryParams = new URLSearchParams();

  if (startDate) {
    queryParams.append("StartDate", startDate);
  }
  if (endDate) {
    queryParams.append("EndDate", endDate);
  }
  if (status && status !== "all") {
    queryParams.append("Status", status);
  }
  if (role && role !== "all") {
    queryParams.append("Role", role);
  }
  if (searchKeyword) {
    queryParams.append("Username", searchKeyword);
  }
  const apiFormat = format === "csv" ? "CSV" : "Excel";
  queryParams.append("Format", apiFormat);

  const queryString = queryParams.toString();
  const path = `${USER_API.exportUsers}${queryString ? `?${queryString}` : ""}`;

  return api(path, {
    method: "GET",
    returnBlob: true,
  });
};

const updateUser = async (
  userId: string,
  formData: UpdateUserPayload
): Promise<ApiResponse> => {
  const token = await getAuthCookie();
  if (!token) {
    throw new Error("Unauthorized - No token found");
  }

  return api(`${USER_API.updateUser}/${userId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(formData),
  });
};

export function useInviteUserMutation() {
  return useMutation<ApiResponse, APIError, InviteUserPayload>({
    mutationFn: inviteUser,
  });
}

export function useGetUserRoleQuery(username: string) {
  return useQuery<Role, APIError>({
    queryKey: ["getUserRole", username],
    queryFn: () => getUserRole(username),
    enabled: !!username,
  });
}

export function useGetUserByIdQuery(userId: string) {
  return useQuery<{ data: User }, APIError>({
    queryKey: ["getUserById", userId],
    queryFn: () => getUserById(userId),
    enabled: !!userId,
  });
}

export function getAuthenticatedUserQueryOptions() {
  return queryOptions({
    queryKey: ["getAuthenticatedUser"],
    queryFn: getAuthenticatedUser,
  });
}

export function getUsersQueryOptions(params: UsersQueryParams = {}) {
  return queryOptions({
    queryKey: ["getUsers", params],
    queryFn: () => getUsers(params),
    placeholderData: (previousData) => previousData,
    refetchOnWindowFocus: false,
  });
}

export function useExportUsersMutation() {
  return useMutation<
    Blob,
    APIError,
    { params: UsersQueryParams; format: "csv" | "xlsx" }
  >({
    mutationFn: ({ params, format }) => exportUsers(params, format),
  });
}

export function useUpdateUserMutation() {
  return useMutation<
    ApiResponse,
    APIError,
    { userId: string; data: UpdateUserPayload }
  >({
    mutationFn: ({ userId, data }) => updateUser(userId, data),
  });
}

const toggleUserStatus = async (
  userId: string
): Promise<{ isSuccessful: boolean; message: string; code: string }> => {
  const token = await getAuthCookie();
  if (!token) {
    throw new Error("Unauthorized - No token found");
  }

  return api(`${USER_API.toggleUserStatus}/${userId}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const useToggleUserStatusMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleUserStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getUserById"] });
      queryClient.invalidateQueries({ queryKey: ["getUsers"] });
    },
  });
};
