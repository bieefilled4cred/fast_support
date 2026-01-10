import { PROFILE_API_URL } from "@/constants/api";

export const CUSTOMER_API = {
  getCustomers: "/administration/profiles",
  getCustomerAnalytics: "/analytics/get-summary",
  exportCustomers: "/administration/export-profiles",
  getSingleCustomer: "/administration/get-profile",
  toggleCustomerStatus: "/administration/toggle-profile",
};

export const CUSTOMER_BASE_URL = PROFILE_API_URL;
