import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "../lib/apiClient";
import {
  ANALYTICS_API,
  ANALYTICS_BASE_URL,
} from "../services/analyticsService/analyticsService";
import {
  APIError,
  ReferralAnalyticsPayload,
  ReferralAnalyticsResponse,
  ProfileByRangeParams,
  ProfileByRangeResponse,
} from "../types";

// Generate referral ranges helper function
export function generateRanges(
  min: number,
  max: number
): { min: number; max: number }[] {
  const step = max - min + 1;
  const ranges: { min: number; max: number }[] = [];
  let currentMin = min;

  for (let i = 0; i < 10; i++) {
    const currentMax = currentMin + step - 1;
    ranges.push({ min: currentMin, max: currentMax });
    currentMin += step;
  }

  return ranges;
}

// Default ranges (min: 0, max: 5)
export const DEFAULT_RANGES = generateRanges(0, 5);

// Fetch referral analytics with ranges
const getReferralAnalytics = async (
  payload: ReferralAnalyticsPayload
): Promise<ReferralAnalyticsResponse> => {
  const response = await api(ANALYTICS_API.getReferralAnalytics, {
    method: "POST",
    body: JSON.stringify(payload),
    baseUrl: ANALYTICS_BASE_URL,
  });
  // API returns array directly or wrapped in data property
  console.log("response:", response);
  return Array.isArray(response) ? response : response.data || response;
};

// Fetch profiles by referral range
const getProfilesByRange = async (
  params: ProfileByRangeParams
): Promise<ProfileByRangeResponse> => {
  const queryString = `?isStaff=${params.isStaff}&min=${params.min}&max=${params.max}`;
  const data = await api(
    `${ANALYTICS_API.staffProfilesByRange}${queryString}`,
    {
      method: "GET",
      baseUrl: ANALYTICS_BASE_URL,
    }
  );
  console.log("data:", data);
  return data;
};

// Mutation hook for generating referral analytics
export function useReferralAnalyticsMutation() {
  return useMutation<
    ReferralAnalyticsResponse,
    APIError,
    ReferralAnalyticsPayload
  >({
    mutationFn: getReferralAnalytics,
  });
}

// Mutation hook for fetching profiles by range
export function useProfilesByRangeMutation() {
  return useMutation<ProfileByRangeResponse, APIError, ProfileByRangeParams>({
    mutationFn: getProfilesByRange,
  });
}

// Query hook for initial data fetch on mount
export function useReferralAnalyticsQuery(payload: ReferralAnalyticsPayload) {
  return useQuery<ReferralAnalyticsResponse, APIError>({
    queryKey: ["referralAnalytics", payload],
    queryFn: () => getReferralAnalytics(payload),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
