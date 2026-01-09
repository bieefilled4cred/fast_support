export interface TransactionRecord {
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

export interface TransactionResponse {
  data: {
    data: TransactionRecord[];
    recordCount?: number;
  };
  status: boolean;
  message: string;
}
