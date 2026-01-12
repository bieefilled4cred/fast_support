export interface ReferralAnalyticsRange {
  min: number;
  max: number;
}

export interface ReferralAnalyticsPayload {
  isStaff: boolean;
  ranges: ReferralAnalyticsRange[];
}

export interface ReferralAnalyticsResponse {
  data: any;
  message?: string;
  isSuccessful?: boolean;
}
