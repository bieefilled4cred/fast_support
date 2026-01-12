// Transaction Summary Types

export interface TransactionSummaryRecord {
  transactionRefNo: string;
  sourceAccountNumber: string;
  sourceAccountName: string | null;
  destinationAccountNumber: string;
  destinationAccountName: string | null;
  destinationBank: string;
  sessionId: string;
  referenceNumber: string;
  profileId: string;
  channel: string;
  fee: number;
  amount: number;
  updatedAt: string;
  modifiedDate: string;
  status: string;
  transType: string;
  provider: string | null;
}

export interface TransactionSummaryPayload {
  status: string;
  type: string;
  start: string;
  endDate: string;
  profileId: string;
}

export interface TransactionSummaryResponse {
  data: TransactionSummaryRecord[];
  isSuccessful: boolean;
  message: string;
  code: string;
}
