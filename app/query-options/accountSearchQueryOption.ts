import { useMutation } from "@tanstack/react-query";
import { api } from "../lib/apiClient";
import {
  ACCOUNT_SEARCH_API,
  ACCOUNT_SEARCH_BASE_URL,
} from "../services/accountSearchService/accountSearchService";
import { APIError, AccountDetailResponse } from "../types";

// Fetch account detail by account number
const getAccountDetail = async (
  accountNumber: string
): Promise<AccountDetailResponse> => {
  const endpoint = `${ACCOUNT_SEARCH_API.getAccountDetail}/${accountNumber}`;

  const response = await api(endpoint, {
    method: "GET",
    baseUrl: ACCOUNT_SEARCH_BASE_URL,
  });

  console.log("Account detail response:", response);

  return response as AccountDetailResponse;
};

// Mutation hook for fetching account details (search-triggered)
export function useAccountDetailMutation() {
  return useMutation<AccountDetailResponse, APIError, string>({
    mutationFn: getAccountDetail,
  });
}
