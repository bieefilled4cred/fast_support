// Account Search Types

export interface AccountRecord {
  id: string;
  accountNumber: string;
  customerID: string;
  customerName: string;
  accountName: string;
  accountType: string;
  branchName: string;
  productName: string;
  accountStatus: string;
  ledgerBalance: number;
  availableBalance: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  bvn: string;
  dateOfBirth: string;
  gender: string;
  accountOfficerName: string;
  accountTierLevel?: number;
  accessLevel?: number;
  enableEmailNotification?: boolean;
  enableSMSNotification?: boolean;
  statementDeliveryMode?: string;
  statementDeliveryFrequency?: string;
  minimumBalanceRequired?: number;
  accountCreationChannel?: string;
  address?: string;
  meansOfIdentification?: string;
  idNumber?: string;
}

export interface AccountDetailResponse {
  data: AccountRecord;
  status: boolean;
  message: string;
}
