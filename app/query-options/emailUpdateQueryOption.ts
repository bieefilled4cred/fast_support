import { useMutation } from "@tanstack/react-query";
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
  UpdateEmailResponse,
} from "../types";

// Fetch profile by account number or profile ID (reusing profile search endpoint)
const getProfile = async (
  searchTerm: string
): Promise<EmailUpdateSearchResponse> => {
  const encodedSearchTerm = encodeURIComponent(searchTerm);
  const endpoint = `${PROFILE_SEARCH_BASE_URL}${PROFILE_SEARCH_API.getProfiles}/${encodedSearchTerm}`;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    if (response.status === 404) {
      // Handle 404 specially if needed, but usually it means not found
      // If the backend returns a structured error for 404, we use it.
      // If not, we construct one.
    }

    throw Object.assign(new Error(data?.message || "Failed to fetch profile"), {
      status: response.status,
      response: data,
    });
  }

  return data as EmailUpdateSearchResponse;
};

// Update customer email using coreBankId
const updateCustomerEmail = async ({
  coreBankId,
  email,
}: {
  coreBankId: string;
  email: string;
}): Promise<UpdateEmailResponse> => {
  const endpoint = `${EMAIL_UPDATE_BASE_URL}${EMAIL_UPDATE_API.updateCustomerInfo}/${coreBankId}`;

  const response = await fetch(endpoint, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw Object.assign(new Error(data?.message || "Failed to update email"), {
      status: response.status,
      response: data,
    });
  }

  return data as UpdateEmailResponse;
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
