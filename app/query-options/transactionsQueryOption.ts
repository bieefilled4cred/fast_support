import { useMutation } from "@tanstack/react-query";
import {
  TRANSACTIONS_API,
  TRANSACTIONS_BASE_URL,
} from "../services/transactionsService/transactionsService";
import {
  APIError,
  AccountHistoryPayload,
  AccountHistoryResponse,
} from "../types";
import { getSSOToken } from "../lib/ssoToken";

// Default pagination values
const DEFAULT_PAGE_SIZE = 50;

// Fetch account history/transactions using SSO token
const getAccountHistory = async (
  payload: AccountHistoryPayload
): Promise<AccountHistoryResponse> => {
  // Get SSO token for authentication
  const token = await getSSOToken();

  const queryParams = new URLSearchParams();

  queryParams.append("StartDate", payload.StartDate);
  queryParams.append("EndDate", payload.EndDate);
  queryParams.append("PageNumber", (payload.PageNumber || 1).toString());
  queryParams.append(
    "PageSize",
    (payload.PageSize || DEFAULT_PAGE_SIZE).toString()
  );
  queryParams.append("AccountNumber", payload.AccountNumber);

  const queryString = queryParams.toString();
  const endpoint = `${TRANSACTIONS_BASE_URL}${TRANSACTIONS_API.getAccountHistory}?${queryString}`;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);

    // Handle case where backend returns non-200 status (e.g., 404) but body indicates success
    // This often happens when no records are found
    if (errorData?.status === true) {
      return errorData as AccountHistoryResponse;
    }

    throw Object.assign(
      new Error(errorData?.message || "Failed to fetch account history"),
      {
        status: response.status,
        response: errorData,
      }
    );
  }

  const data = await response.json();

  return data as AccountHistoryResponse;
};

// Mutation hook for fetching account history (search-triggered)
export function useAccountHistoryMutation() {
  return useMutation<AccountHistoryResponse, APIError, AccountHistoryPayload>({
    mutationFn: getAccountHistory,
  });
}
