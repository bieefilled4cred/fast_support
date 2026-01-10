import { queryOptions, useMutation } from "@tanstack/react-query";

import { APIError, ApiResponse, CreateRolePayload, GetUserRoleResponse, PermissionResponse, Role } from "@/types";
import { ROLE_API } from "@/services/roleService/roleService";
import { USER_API } from "@/services/userService/userService";
import { api } from "@/lib/apiClient";

const getRoles = (): Promise<{ data: Role[] }> => api(ROLE_API.getRoles);

const createRole = (formData: CreateRolePayload): Promise<Role> => {
  const payload = {
    roleName: formData.name,
    description: formData.description,
    permissionNames: formData.permissionNames || [],
  };

  return api(ROLE_API.createRole, {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

const getRolePermissions = (roleName: string): Promise<PermissionResponse> =>
  api(`${ROLE_API.getRolePermissions}/${encodeURIComponent(roleName)}`);

const updateRole = ({ roleName, permissions }: { roleName: string; permissions: string[] }): Promise<ApiResponse> => {
  const payload = {
    roleName,
    permissions,
  };

  return api(ROLE_API.updateRole, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
};

const deleteRole = (roleName: string): Promise<{ success: boolean }> =>
  api(`${ROLE_API.deleteRole}/${roleName}/role/delete`, {
    method: "DELETE",
  });

const getUserRole = (username: string): Promise<GetUserRoleResponse> => api(`${USER_API.getUserRole}/${username}`);

const assignRoleToUser = ({ roleName, userId }: { roleName: string; userId: string }): Promise<ApiResponse> =>
  api(`${USER_API.assignRoleToUser}/${roleName}/assign/${userId}`, {
    method: "POST",
    body: JSON.stringify({}),
  });

export function getRolesQueryOptions() {
  return queryOptions({
    queryKey: ["roles"],
    queryFn: getRoles,
  });
}

export function getUserRoleQueryOptions(username: string) {
  return queryOptions<GetUserRoleResponse, APIError>({
    queryKey: ["userRole", username],
    queryFn: () => getUserRole(username),
    enabled: !!username,
  });
}

export function useCreateRoleMutation() {
  return useMutation<Role, APIError, CreateRolePayload>({
    mutationFn: createRole,
  });
}

export function getRolePermissionsQueryOptions(roleName: string) {
  return queryOptions<PermissionResponse, APIError>({
    queryKey: ["rolePermissions", roleName],
    queryFn: () => getRolePermissions(roleName),
    enabled: !!roleName,
  });
}

export function useUpdateRoleMutation() {
  return useMutation<ApiResponse, APIError, { roleName: string; permissions: string[] }>({
    mutationFn: updateRole,
  });
}

export function useDeleteRoleMutation() {
  return useMutation<{ success: boolean }, APIError, string>({
    mutationFn: deleteRole,
  });
}

export function useAssignRoleToUserMutation() {
  return useMutation<ApiResponse, APIError, { roleName: string; userId: string }>({
    mutationFn: assignRoleToUser,
  });
}

export { getRoles, createRole, updateRole, deleteRole, getUserRole, assignRoleToUser, getRolePermissions };
