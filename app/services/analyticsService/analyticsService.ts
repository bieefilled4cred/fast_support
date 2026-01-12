import { PROFILE_API_URL } from "@/app/constants/api";

const BASE_URL = PROFILE_API_URL;

export const ANALYTICS_API = {
  getReferralAnalytics: "/analytics/get-referral-analytics",
  staffProfilesByRange: "/analytics/staff-profiles-by-referral-range",
};

export const ANALYTICS_BASE_URL = BASE_URL;
