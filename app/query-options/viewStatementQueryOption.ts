import { useMutation } from "@tanstack/react-query";
import { api } from "../lib/apiClient";
import {
  VIEW_STATEMENT_API,
  VIEW_STATEMENT_BASE_URL,
} from "../services/viewStatementService/viewStatementService";
import {
  APIError,
  ViewStatementPayload,
  ViewStatementResponse,
} from "../types";

// Fetch account statement
const getStatement = async (
  payload: ViewStatementPayload
): Promise<ViewStatementResponse> => {
  const response = await api(VIEW_STATEMENT_API.getStatement, {
    method: "POST",
    baseUrl: VIEW_STATEMENT_BASE_URL,
    body: JSON.stringify(payload),
  });

  console.log("View statement response:", response);

  return response as ViewStatementResponse;
};

// Mutation hook for fetching statement (search-triggered)
export function useViewStatementMutation() {
  return useMutation<ViewStatementResponse, APIError, ViewStatementPayload>({
    mutationFn: getStatement,
  });
}
