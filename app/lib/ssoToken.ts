import { SSO_URL, SSO_CLIENT_ID, SSO_CLIENT_SECRET } from "../constants/api";

interface SSOTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

// Token cache to avoid fetching a new token on every request
let tokenCache: { token: string; expiresAt: number } | null = null;

export const getSSOToken = async (): Promise<string> => {
  // Check if we have a valid cached token
  if (tokenCache && Date.now() < tokenCache.expiresAt) {
    return tokenCache.token;
  }

  if (!SSO_URL) {
    throw new Error(
      "SSO_URL is not defined. Please set NEXT_PUBLIC_SSO_URL environment variable."
    );
  }

  if (!SSO_CLIENT_ID || !SSO_CLIENT_SECRET) {
    throw new Error(
      "SSO credentials are not defined. Please set NEXT_PUBLIC_SSO_CLIENT_ID and NEXT_PUBLIC_SSO_CLIENT_SECRET environment variables."
    );
  }

  const formData = new URLSearchParams();
  formData.append("grant_type", "client_credentials");
  formData.append("client_id", SSO_CLIENT_ID);
  formData.append("client_secret", SSO_CLIENT_SECRET);

  const response = await fetch(`${SSO_URL}/connect/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Failed to get SSO token: ${response.status}`);
  }

  const data: SSOTokenResponse = await response.json();

  // Cache the token with a 5-minute buffer before expiration
  const expiresAt = Date.now() + (data.expires_in - 300) * 1000;
  tokenCache = {
    token: data.access_token,
    expiresAt,
  };

  return data.access_token;
};

/**
 * Clears the cached SSO token
 * Useful when the token becomes invalid or on logout
 */
export const clearSSOTokenCache = (): void => {
  tokenCache = null;
};
