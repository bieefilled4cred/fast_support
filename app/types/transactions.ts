export interface TransactionQueryParams {
  pageNumber?: number;
  pageSize?: number;
  postingReferenceNumber?: string;
  instrumentNumber?: string;
  entryCode?: string;
  batchCode?: string;
  startDate?: string;
  endDate?: string;
  direction?: string;
  accountNumber?: string;
  financialDateFrom?: string;
  financialDateTo?: string;
}

export interface Transaction {
  id: string;
  postingReferenceNumber: string;
  instrumentNumber: string;
  entryCode: string;
  batchCode: string;
  accountNumber: string;
  amount: string;
  direction: string;
  financialDate: string;
  postingDate: string;
  description: string;
  status: string;
}

export interface TransactionsResponse {
  data: Transaction[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}

export interface TransactionsApiResponse {
  data: TransactionsResponse;
  isSuccessful: boolean;
  message: string;
  code: string;
}

export type TransactionData = {
  id?: string;
  financialDate?: string;
  transactionDate?: string;
  accountNumber?: string;
  accountName?: string;
  branch?: string | null;
  postedBy?: string | null;
  approvedBy?: string | null;
  postingReferenceNumber?: string;
  debit?: string;
  credit?: string;
  narration?: string;
  entryCode?: string;
  instrumentNumber?: string;
  balance?: string;
  accessLevel?: number;
  identifier?: number;
  amount?: string;
  charge?: string;
  merchant?: string;
  recipientName?: string | null;
  senderName?: string | null;
  recipientBank?: string | null;
  senderBank?: string | null;
  transactionChannel?: string;
  transactionIconUrl?: string | null;
  recipientAccountNumber?: string;
  senderAccountNumber?: string;
  channelTransactionIdentifier?: string;
  transactionStatus?: string;
};

// Account History API Types
export interface AccountHistoryPayload {
  StartDate: string;
  EndDate: string;
  AccountNumber: string;
  PageNumber?: number;
  PageSize?: number;
}

export interface AccountHistoryRecord {
  id: string;
  financialDate: string;
  transactionDate: string;
  accountNumber: string;
  accountName: string;
  branch?: string | null;
  postingReferenceNumber: string;
  debit: string;
  credit: string;
  narration: string;
  entryCode: string;
  instrumentNumber: string;
  balance: string;
  accessLevel?: number;
  identifier?: number;
  amount: string;
  charge: string;
  merchant?: string | null;
  transactionChannel?: string | null;
  transactionStatus: string;
  postedBy?: string | null;
  approvedBy?: string | null;
  recipientName?: string | null;
  senderName?: string | null;
  recipientBank?: string | null;
  senderBank?: string | null;
  transactionIconUrl?: string | null;
  recipientAccountNumber?: string | null;
  senderAccountNumber?: string | null;
  channelTransactionIdentifier?: string | null;
}

export interface AccountHistoryResponse {
  data: {
    data: AccountHistoryRecord[];
    recordCount?: number;
  };
  status: boolean;
  message: string;
}
