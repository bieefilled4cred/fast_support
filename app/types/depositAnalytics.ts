// Deposit Analytics Types

export interface DepositRecord {
  id: string;
  profileId: string;
  dateMonth: string;
  totalDepositAmount: number;
  fullName: string;
  accountNumber: string;
  phoneNumber: string;
  referralCode: string;
}

export interface MonthlyDepositPayload {
  pageNo?: number;
  pageSize?: number;
}

export interface MonthlyDepositResponse {
  data: DepositRecord[];
  currentPage: number;
  pageSize: number;
  totalRecords: number;
  totalPages: number;
}
