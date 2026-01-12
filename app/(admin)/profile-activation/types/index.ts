export interface ActivationProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  avatar: string | null;
  status: string | null;
  tier: string;
  accountNumber: string;
  balance: number;
  bvn: string;
  createdDate: string;
  coreBankId: string;
}

export interface ActivationProfileSearchResponse {
  data: ActivationProfile[];
  isSuccessful: boolean;
  message: string;
  code: string;
}

export interface ToggleProfileResponse {
  data?: unknown;
  isSuccessful: boolean;
  message: string;
  code?: string;
}
