import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/apiClient";
import {
  DEPOSIT_ANALYTICS_API,
  DEPOSIT_ANALYTICS_BASE_URL,
} from "../services/depositAnalyticsService/depositAnalyticsService";
import {
  APIError,
  MonthlyDepositPayload,
  MonthlyDepositResponse,
} from "../types";

// Default pagination values
const DEFAULT_PAGE_SIZE = 20;

// Fetch monthly deposit analytics
const getMonthlyDeposit = async (
  payload: MonthlyDepositPayload
): Promise<MonthlyDepositResponse> => {
  const queryParams = new URLSearchParams();

  if (payload.pageNo !== undefined) {
    queryParams.append("pageNo", payload.pageNo.toString());
  }
  if (payload.pageSize !== undefined) {
    queryParams.append("pageSize", payload.pageSize.toString());
  }

  const queryString = queryParams.toString();
  const endpoint = queryString
    ? `${DEPOSIT_ANALYTICS_API.getMonthlyDeposit}?${queryString}`
    : DEPOSIT_ANALYTICS_API.getMonthlyDeposit;

  const response = await api(endpoint, {
    method: "GET",
    baseUrl: DEPOSIT_ANALYTICS_BASE_URL,
  });

  console.log("Monthly deposit response:", response);

  // Handle response format - API might return data directly or wrapped
  if (response && typeof response === "object" && "data" in response) {
    return response as MonthlyDepositResponse;
  }

  // If response is array directly, wrap it
  if (Array.isArray(response)) {
    return {
      data: response,
      currentPage: 1,
      pageSize: DEFAULT_PAGE_SIZE,
      totalRecords: response.length,
      totalPages: 1,
    };
  }

  return response;
};

// Query hook for fetching monthly deposit analytics
export function useMonthlyDepositQuery(payload: MonthlyDepositPayload = {}) {
  return useQuery<MonthlyDepositResponse, APIError>({
    queryKey: ["monthlyDeposit", payload],
    queryFn: () => getMonthlyDeposit(payload),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
