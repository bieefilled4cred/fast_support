export interface ProfileRecord {
  id: string;
  firstName: string;
  lastName: string;
  avatar: string | null;
  bvnRealName: string | null;
  tier: string;
  accountNumber: string;
  email: string;
  dob: string;
  bvn: string;
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
  createdDate: string;
  status: string;
}

export interface ProfileSearchResponse {
  data: ProfileRecord[];
  isSuccessful: boolean;
  message: string;
  code: string;
}
