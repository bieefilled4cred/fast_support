import { useMutation } from "@tanstack/react-query";
import { api } from "../lib/apiClient";
import {
  BVN_LOOKUP_API,
  BVN_LOOKUP_BASE_URL,
} from "../services/bvnLookupService/bvnLookupService";
import { APIError, BvnLookupResponse } from "../types";

// Fetch BVN details
const lookupBvn = async (bvn: string): Promise<BvnLookupResponse> => {
  const endpoint = `${BVN_LOOKUP_API.lookupBvn}/${bvn}`;

  const response = await api(endpoint, {
    method: "GET",
    baseUrl: BVN_LOOKUP_BASE_URL,
  });

  console.log("BVN lookup response:", response);

  return response as BvnLookupResponse;
};

// Mutation hook for BVN lookup (search-triggered)
export function useBvnLookupMutation() {
  return useMutation<BvnLookupResponse, APIError, string>({
    mutationFn: lookupBvn,
  });
}
