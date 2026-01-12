import { queryOptions, useMutation } from "@tanstack/react-query";

import { APIError, ApiResponse, CreatePermissionGroupPayload, PermissionGroupResponse } from "../types";
import { PERMISSION_API } from "../services/permissionService/permissionService";
import { api } from "../lib/apiClient";


const getPermissions = (groupId: string) => api(`${PERMISSION_API.getPermissions}/${groupId}`);

const createPermission = (formData: CreatePermissionGroupPayload) =>
  api(PERMISSION_API.createPermission, {
    method: "POST",
    body: JSON.stringify(formData),
  });

const updatePermission = (permissionId: string, formData: CreatePermissionGroupPayload) =>
  api(`${PERMISSION_API.updatePermission}/${permissionId}`, {
    method: "PUT",
    body: JSON.stringify(formData),
  });

const deletePermission = (permissionId: string) =>
  api(`${PERMISSION_API.deletePermission}/${permissionId}`, {
    method: "DELETE",
  });

function getPermissionsQueryOptions(groupId: string) {
  return queryOptions({
    queryKey: ["permissions", groupId],
    queryFn: () => getPermissions(groupId),
  });
}

function useCreatePermissionMutation() {
  return useMutation<PermissionGroupResponse, APIError, CreatePermissionGroupPayload>({
    mutationFn: createPermission,
  });
}

function useUpdatePermissionMutation() {
  return useMutation<
    PermissionGroupResponse,
    APIError,
    { permissionId: string; formData: CreatePermissionGroupPayload }
  >({
    mutationFn: ({ permissionId, formData }) => updatePermission(permissionId, formData),
  });
}

function useDeletePermissionMutation() {
  return useMutation<ApiResponse, APIError, string>({
    mutationFn: deletePermission,
  });
}

export {
  getPermissionsQueryOptions,
  useCreatePermissionMutation,
  useUpdatePermissionMutation,
  useDeletePermissionMutation,
};
