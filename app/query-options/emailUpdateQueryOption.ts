import { useMutation } from "@tanstack/react-query";
import { api } from "../lib/apiClient";
import {
  PROFILE_SEARCH_API,
  PROFILE_SEARCH_BASE_URL,
} from "../services/profileSearchService/profileSearchService";
import {
  EMAIL_UPDATE_API,
  EMAIL_UPDATE_BASE_URL,
} from "../services/emailUpdateService/emailUpdateService";
import {
  APIError,
  EmailUpdateSearchResponse,
  UpdateEmailPayload,
  UpdateEmailResponse,
} from "../types";

// Fetch profile by account number or profile ID (reusing profile search endpoint)
const getProfile = async (
  searchTerm: string
): Promise<EmailUpdateSearchResponse> => {
  const encodedSearchTerm = encodeURIComponent(searchTerm);
  const endpoint = `${PROFILE_SEARCH_API.getProfiles}/${encodedSearchTerm}`;

  const response = await api(endpoint, {
    method: "GET",
    baseUrl: PROFILE_SEARCH_BASE_URL,
  });

  console.log("Profile response for email update:", response);

  return response as EmailUpdateSearchResponse;
};

// Update customer email using coreBankId
const updateCustomerEmail = async ({
  coreBankId,
  email,
}: {
  coreBankId: string;
  email: string;
}): Promise<UpdateEmailResponse> => {
  const endpoint = `${EMAIL_UPDATE_API.updateCustomerInfo}/${coreBankId}`;

  const response = await api(endpoint, {
    method: "PUT",
    body: JSON.stringify({ email }),
    baseUrl: EMAIL_UPDATE_BASE_URL,
  });

  console.log("Email update response:", response);

  return response as UpdateEmailResponse;
};

// Mutation hook for fetching profile (search-triggered)
export function useEmailUpdateProfileMutation() {
  return useMutation<EmailUpdateSearchResponse, APIError, string>({
    mutationFn: getProfile,
  });
}

// Mutation hook for updating email
export function useUpdateEmailMutation() {
  return useMutation<
    UpdateEmailResponse,
    APIError,
    { coreBankId: string; email: string }
  >({
    mutationFn: updateCustomerEmail,
  });
}
