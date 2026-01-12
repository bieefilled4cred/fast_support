// Referral Analytics Types

export interface ReferralRange {
  min: number;
  max: number;
}

export interface ReferralAnalyticsPayload {
  isStaff: boolean;
  ranges: ReferralRange[];
}

export interface ReferralRangeData {
  range: string;
  count: number;
}

// API returns array directly, not wrapped in data object
export type ReferralAnalyticsResponse = ReferralRangeData[];

export interface ProfileByRangeParams {
  isStaff: boolean;
  min: number;
  max: number;
}

export interface ReferralProfile {
  id: string;
  firstName: string;
  lastName: string;
  avatar: string | null;
  tier: string;
  accountNumber: string;
  email: string;
  dob: string;
  bvn: string | null;
  bvnIsVerified: boolean;
  hasProfilePicture: boolean;
  hasAccountNumber: boolean;
  phoneVerified: boolean;
  transactionPinSet: boolean;
  balance: number;
  profileType: string;
  productType: string | null;
  phoneNumber: string;
  address: string | null;
  coreBankId: string;
  requiresOtp: boolean;
  totalLimit: number;
  accruedLimit: number;
  addressDocumentSubmitted: boolean;
  addressDocumentVerified: boolean;
  totalReferrals: number;
  nin: string | null;
  ninIsVerified: boolean;
  bvnProfileUrl: string | null;
  bvnUrlUpdated: boolean;
  referredBy: string;
  gender: string;
  referralCode: string;
  createdDate: string | null;
  status: string | null;
}

export interface ProfileByRangeResponse {
  recordCount: number;
  profiles: ReferralProfile[];
}
