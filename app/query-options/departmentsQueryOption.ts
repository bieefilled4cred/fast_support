import { queryOptions, useMutation } from "@tanstack/react-query";

import { APIError, ApiResponse, Department, CreateDepartmentPayload, User } from "@/types";
import { DEPARTMENT_API } from "@/services/departmentService/departmentService";
import { api } from "@/lib/apiClient";

const createDepartment = (formData: CreateDepartmentPayload) =>
  api(DEPARTMENT_API.createDepartment, {
    method: "POST",
    body: JSON.stringify(formData),
  });

const getDepartments = (): Promise<{ data: Department[] }> => api(DEPARTMENT_API.getDepartments);

const getUsersByDepartment = (departmentId: string): Promise<User[]> =>
  api(`${DEPARTMENT_API.getUsersByDepartment}/${departmentId}`);

const addUserToDepartment = (payload: { departmentId: string; userId: string }) =>
  api(`${DEPARTMENT_API.addUserToDepartment}/${payload.departmentId}/user/${payload.userId}`, {
    method: "POST",
  });

export function useCreateDepartmentMutation() {
  return useMutation<ApiResponse, APIError, CreateDepartmentPayload>({
    mutationFn: createDepartment,
  });
}

export function getDepartmentsQueryOptions() {
  return queryOptions({
    queryKey: ["getDepartments"],
    queryFn: getDepartments,
  });
}

export function getUsersByDepartmentQueryOptions(departmentId: string) {
  return queryOptions({
    queryKey: ["getUsersByDepartment", departmentId],
    queryFn: () => getUsersByDepartment(departmentId),
  });
}

export function useAddUserToDepartmentMutation() {
  return useMutation<ApiResponse, APIError, { departmentId: string; userId: string }>({
    mutationFn: addUserToDepartment,
  });
}
