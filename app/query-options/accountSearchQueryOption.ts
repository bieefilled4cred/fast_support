import { useMutation } from "@tanstack/react-query";
import { getSSOToken } from "../lib/ssoToken";
import {
  ACCOUNT_SEARCH_API,
  ACCOUNT_SEARCH_BASE_URL,
} from "../services/accountSearchService/accountSearchService";
import { APIError, AccountDetailResponse } from "../types";

// Fetch account detail by account number
const getAccountDetail = async (
  accountNumber: string
): Promise<AccountDetailResponse> => {
  // Get SSO token for authentication
  const token = await getSSOToken();

  const endpoint = `${ACCOUNT_SEARCH_BASE_URL}${ACCOUNT_SEARCH_API.getAccountDetail}/${accountNumber}`;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);

    if (response.status === 401) {
      throw Object.assign(new Error("Unauthorized"), {
        status: 401,
        response: errorData,
      });
    }

    // Handle case where backend returns non-200 status (e.g., 404) but body indicates success
    if (errorData?.status === true) {
      return errorData as AccountDetailResponse;
    }

    throw Object.assign(
      new Error(errorData?.message || "Failed to fetch account details"),
      {
        status: response.status,
        response: errorData,
      }
    );
  }

  const data = await response.json();

  return data as AccountDetailResponse;
};

// Mutation hook for fetching account details (search-triggered)
export function useAccountDetailMutation() {
  return useMutation<AccountDetailResponse, APIError, string>({
    mutationFn: getAccountDetail,
  });
}
