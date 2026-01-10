export type LoginPayload = {
  username: string;
  password: string;
};

export type LoginResponse = {
  isNewUser: boolean;
  message: string;
  roles: string[];
  status: string;
  apps?: Array<{
    appId: string;
    name: string;
    description: string;
    logo: string;
    url: string;
    createdDate: string;
  }>;
};

export type InitiatePasswordResetPayload = {
  email?: string;
  username?: string;
};

export type InitiatePasswordResetResponse = {
  data: {
    retrievalCode: string;
    passwordResetToken: string;
  };
  isSuccessful: boolean;
  message: string;
  code: string;
};

export type ResetPasswordPayload = {
  username: string;
  passwordResetToken: string;
  newPassword: string;
  retrievalCode: string;
  otp: string;
};

export type ChangePasswordPayload = {
  username: string;
  currentPassword: string;
  newPassword: string;
};
