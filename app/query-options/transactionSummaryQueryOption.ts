import { useMutation } from "@tanstack/react-query";
import { api } from "../lib/apiClient";
import {
  TRANSACTION_SUMMARY_API,
  TRANSACTION_SUMMARY_BASE_URL,
} from "../services/transactionSummaryService/transactionSummaryService";
import {
  APIError,
  TransactionSummaryPayload,
  TransactionSummaryResponse,
} from "../types";

// Fetch transaction summary
const getTransactions = async (
  payload: TransactionSummaryPayload
): Promise<TransactionSummaryResponse> => {
  const response = await api(TRANSACTION_SUMMARY_API.getTransactions, {
    method: "POST",
    body: JSON.stringify(payload),
    baseUrl: TRANSACTION_SUMMARY_BASE_URL,
  });

  console.log("Transaction summary response:", response);

  return response as TransactionSummaryResponse;
};

// Mutation hook for fetching transaction summary (search-triggered)
export function useTransactionSummaryMutation() {
  return useMutation<
    TransactionSummaryResponse,
    APIError,
    TransactionSummaryPayload
  >({
    mutationFn: getTransactions,
  });
}
