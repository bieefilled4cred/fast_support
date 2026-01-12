import { useMutation } from "@tanstack/react-query";
import { api } from "../lib/apiClient";
import {
  PROFILE_SEARCH_API,
  PROFILE_SEARCH_BASE_URL,
} from "../services/profileSearchService/profileSearchService";
import {
  PROFILE_ACTIVATION_API,
  PROFILE_ACTIVATION_BASE_URL,
} from "../services/profileActivationService/profileActivationService";
import {
  APIError,
  ActivationProfileSearchResponse,
  ToggleProfileResponse,
} from "../types";

// Fetch profile by profile ID (reusing profile search endpoint)
const getProfile = async (
  searchTerm: string
): Promise<ActivationProfileSearchResponse> => {
  const encodedSearchTerm = encodeURIComponent(searchTerm);
  const endpoint = `${PROFILE_SEARCH_API.getProfiles}/${encodedSearchTerm}`;

  const response = await api(endpoint, {
    method: "GET",
    baseUrl: PROFILE_SEARCH_BASE_URL,
  });

  console.log("Profile response for activation:", response);

  return response as ActivationProfileSearchResponse;
};

// Toggle profile activation status
const toggleProfile = async (
  profileId: string
): Promise<ToggleProfileResponse> => {
  const response = await api(PROFILE_ACTIVATION_API.toggleProfile, {
    method: "POST",
    body: JSON.stringify({ profileId }),
    baseUrl: PROFILE_ACTIVATION_BASE_URL,
  });

  console.log("Toggle profile response:", response);

  return response as ToggleProfileResponse;
};

// Mutation hook for fetching profile (search-triggered)
export function useActivationProfileMutation() {
  return useMutation<ActivationProfileSearchResponse, APIError, string>({
    mutationFn: getProfile,
  });
}

// Mutation hook for toggling profile activation
export function useToggleProfileMutation() {
  return useMutation<ToggleProfileResponse, APIError, string>({
    mutationFn: toggleProfile,
  });
}
