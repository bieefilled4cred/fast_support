export interface ActivationProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  avatar: string | null;
  status: string;
  tier: string;
  accountNumber: string;
  accountBalance: number;
  bvn: string;
  dateCreated: string;
  lastLogin: string;
}

export interface ActivationResponse {
  data: ActivationProfile;
  isSuccessful: boolean;
  message: string;
  code: string;
}
