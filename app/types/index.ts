export * from "./api";
export * from "./permissions";
export * from "./authentication";
export * from "./users";
export * from "./transactions";
export * from "./applications";
export * from "./customers";
export * from "./referralAnalytics";
export * from "./depositAnalytics";
export * from "./accountSearch";
export * from "./profileSearch";
export * from "./transactionSummary";
export * from "./bvnLookup";
export * from "./emailUpdate";
export * from "./profileActivation";
export * from "./vasRequery";
export * from "./checkTransaction";
export * from "./nipStatus";
export * from "./viewStatement";

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
