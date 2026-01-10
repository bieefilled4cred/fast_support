import { BASE_URL_V2 } from "@/app/constants/api";


export const AUTHENTICATION_API = {
  login: "/authentication/login",
  logout: "/authentication/logout",
  initiatePasswordReset: "/authentication/initiate-password-reset",
  resetPassword: "/authentication/reset-password",
  changePassword: "/onboarding/activate-account",
  verifyOtp: "/otp/verify",
};

export const AUTHENTICATION_BASE_URL_V2 = BASE_URL_V2;
