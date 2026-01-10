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
