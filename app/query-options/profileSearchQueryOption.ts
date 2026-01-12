import { useMutation } from "@tanstack/react-query";
import { api } from "../lib/apiClient";
import {
  PROFILE_SEARCH_API,
  PROFILE_SEARCH_BASE_URL,
} from "../services/profileSearchService/profileSearchService";
import { APIError, ProfileSearchResponse } from "../types";

// Fetch profiles by search term (name, email, or phone number)
const getProfiles = async (
  searchTerm: string
): Promise<ProfileSearchResponse> => {
  // URL encode the search term to handle special characters like @ in emails
  const encodedSearchTerm = encodeURIComponent(searchTerm);
  const endpoint = `${PROFILE_SEARCH_API.getProfiles}/${encodedSearchTerm}`;

  const response = await api(endpoint, {
    method: "GET",
    baseUrl: PROFILE_SEARCH_BASE_URL,
  });

  console.log("Profile search response:", response);

  return response as ProfileSearchResponse;
};

// Mutation hook for searching profiles (search-triggered)
export function useProfileSearchMutation() {
  return useMutation<ProfileSearchResponse, APIError, string>({
    mutationFn: getProfiles,
  });
}
