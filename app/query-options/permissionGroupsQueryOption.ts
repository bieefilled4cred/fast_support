import { queryOptions, useMutation } from "@tanstack/react-query";

import {
  APIError,
  ApiResponse,
  CreatePermissionGroupPayload,
  PermissionGroupResponse,
  PermissionGroupWithPermissionsResponse,
} from "../types";
import { PERMISSION_GROUP_API } from "../services/permissionGroupService/permissionGroupService";
import { api } from "../lib/apiClient";

const getPermissionGroups = () => api(PERMISSION_GROUP_API.getPermissionGroups);

const getPermissionGroupsWithPermissions = (): Promise<PermissionGroupWithPermissionsResponse> =>
  api(PERMISSION_GROUP_API.getPermissionGroupsWithPermissions);

const createPermissionGroup = (formData: CreatePermissionGroupPayload) =>
  api(PERMISSION_GROUP_API.createPermissionGroup, {
    method: "POST",
    body: JSON.stringify(formData),
  });

const deletePermissionGroup = (groupId: string) =>
  api(`${PERMISSION_GROUP_API.deletePermissionGroup}/${groupId}`, {
    method: "DELETE",
  });

function getPermissionGroupsQueryOptions() {
  return queryOptions({
    queryKey: ["getPermissionGroups"],
    queryFn: getPermissionGroups,
  });
}

function getPermissionGroupsWithPermissionsQueryOptions() {
  return queryOptions({
    queryKey: ["getPermissionGroupsWithPermissions"],
    queryFn: getPermissionGroupsWithPermissions,
  });
}

function useCreatePermissionGroupMutation() {
  return useMutation<PermissionGroupResponse, APIError, CreatePermissionGroupPayload>({
    mutationFn: createPermissionGroup,
  });
}

function useDeletePermissionGroupMutation() {
  return useMutation<ApiResponse, APIError, string>({
    mutationFn: deletePermissionGroup,
  });
}

export {
  getPermissionGroupsQueryOptions,
  getPermissionGroupsWithPermissionsQueryOptions,
  useCreatePermissionGroupMutation,
  useDeletePermissionGroupMutation,
};
