// VAS Requery Types

export interface RequeryVasPayload {
  details: {
    ref: string;
  };
}

export interface VasTransactionDetails {
  transactionRef: string;
  requestId?: string;
  amount: number;
  date: string;
  status: string; // 'Successful', 'Failed', 'Pending'
  billerName: string; // e.g., 'MTN Airtime', 'DSTV'
  customerLine: string; // Phone number or smartcard number
  convenienceFee?: number;
  totalAmount?: number;
  message?: string;
  gatewayResponse?: string;
}

export interface RequeryVasResponse {
  details: {
    message: string;
    data?: VasTransactionDetails;
  };
  confirmationMessage: string;
  confirmationCode: number;
}
