export * from "./api";
export * from "./permissions";
export * from "./authentication";
export * from "./users";
export * from "./departments";
export * from "./transactions";
export * from "./applications";
export * from "./customers";

export interface ResetPasswordPayload {
  username: string;
  passwordResetToken: string;
  newPassword: string;
  validationReference: string;
}

export type AuditTrailEntry = {
  id: string;
  date: string;
  userName: string;
  email: string;
  module: string;
  action: string;
};
