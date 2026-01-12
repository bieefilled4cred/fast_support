import { useMutation } from "@tanstack/react-query";
import jwt from "jsonwebtoken";

import {
  APIError,
  ApiResponse,
  LoginPayload,
  LoginResponse,
  InitiatePasswordResetPayload,
  InitiatePasswordResetResponse,
  ResetPasswordPayload,
  ChangePasswordPayload,
} from "../types";
import {
  setAuthCookie,
  removeAuthCookie,
  setAuthUserCookie,
} from "../lib/actions/cookies";
import {
  AUTHENTICATION_API,
  AUTHENTICATION_BASE_URL_V2,
} from "../services/authenticationService/authenticationService";
import { api } from "../lib/apiClient";

const login = async (formData: LoginPayload): Promise<LoginResponse> => {
  const data = await api(AUTHENTICATION_API.login, {
    method: "POST",
    body: JSON.stringify(formData),
  });

  const accessToken = data.data.tokenDetails.access_token;
  const profile = data.data?.profile;

  const decoded = jwt.decode(accessToken) as {
    TokenType?: string;
    roles?: string[];
  } | null;
  const tokenType = decoded?.TokenType || null;
  const isNewUser = tokenType?.toLowerCase() === "temporary";
  const roles = decoded?.roles || [];
  const status = profile?.status || "";
  const apps = profile?.apps || [];

  // Set cookies for authenticated users (including temporary status users who can access the dashboard)
  if (accessToken ) {
    await setAuthCookie(accessToken);
    await setAuthUserCookie(profile);
  }
  
  return {
    isNewUser,
    message: "User successfully logged in",
    roles,
    status,
    apps,
  };
};

const logout = async () => {
  try {
    await api(AUTHENTICATION_API.logout, {
      method: "POST",
    });
  } catch {}

  await removeAuthCookie();
};

const initiatePasswordReset = (formData: InitiatePasswordResetPayload) =>
  api(AUTHENTICATION_API.initiatePasswordReset, {
    method: "POST",
    body: JSON.stringify(formData),
  });

const resetPassword = (formData: ResetPasswordPayload) =>
  api(AUTHENTICATION_API.resetPassword, {
    method: "POST",
    body: JSON.stringify(formData),
    baseUrl: AUTHENTICATION_BASE_URL_V2,
  });

const changePassword = (formData: ChangePasswordPayload) =>
  api(AUTHENTICATION_API.changePassword, {
    method: "POST",
    body: JSON.stringify(formData),
  });

export function useLoginMutation() {
  return useMutation<LoginResponse, APIError, LoginPayload>({
    mutationFn: login,
  });
}

export function useLogoutMutation() {
  return useMutation<void, APIError, void>({
    mutationFn: logout,
  });
}

export function useInitiatePasswordResetMutation() {
  return useMutation<
    InitiatePasswordResetResponse,
    APIError,
    InitiatePasswordResetPayload
  >({
    mutationFn: initiatePasswordReset,
  });
}

export function useResetPasswordMutation() {
  return useMutation<ApiResponse, APIError, ResetPasswordPayload>({
    mutationFn: resetPassword,
  });
}

export function useChangePasswordMutation() {
  return useMutation<ApiResponse, APIError, ChangePasswordPayload>({
    mutationFn: changePassword,
  });
}

const verifyOtp = (formData: { retrievalCode: string; otpCode: string }) =>
  api(AUTHENTICATION_API.verifyOtp, {
    method: "POST",
    body: JSON.stringify(formData),
  });

export function useVerifyOtpMutation() {
  return useMutation<
    ApiResponse,
    APIError,
    { retrievalCode: string; otpCode: string }
  >({
    mutationFn: verifyOtp,
  });
}
