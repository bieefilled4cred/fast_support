import { useMutation } from "@tanstack/react-query";
import { api } from "../lib/apiClient";
import {
  TRANSACTIONS_API,
  TRANSACTIONS_BASE_URL,
} from "../services/transactionsService/transactionsService";
import {
  APIError,
  AccountHistoryPayload,
  AccountHistoryResponse,
} from "../types";

// Default pagination values
const DEFAULT_PAGE_SIZE = 50;

// Fetch account history/transactions
const getAccountHistory = async (
  payload: AccountHistoryPayload
): Promise<AccountHistoryResponse> => {
  const queryParams = new URLSearchParams();

  // Required params
  queryParams.append("StartDate", payload.StartDate);
  queryParams.append("EndDate", payload.EndDate);
  queryParams.append("AccountNumber", payload.AccountNumber);

  // Optional pagination params
  queryParams.append("PageNumber", (payload.PageNumber || 1).toString());
  queryParams.append(
    "PageSize",
    (payload.PageSize || DEFAULT_PAGE_SIZE).toString()
  );

  const queryString = queryParams.toString();
  const endpoint = `${TRANSACTIONS_API.getAccountHistory}?${queryString}`;

  const response = await api(endpoint, {
    method: "GET",
    baseUrl: TRANSACTIONS_BASE_URL,
  });

  console.log("Account history response:", response);

  return response as AccountHistoryResponse;
};

// Mutation hook for fetching account history (search-triggered)
export function useAccountHistoryMutation() {
  return useMutation<AccountHistoryResponse, APIError, AccountHistoryPayload>({
    mutationFn: getAccountHistory,
  });
}
