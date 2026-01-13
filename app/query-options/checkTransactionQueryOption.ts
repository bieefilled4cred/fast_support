import { useMutation } from "@tanstack/react-query";
import { api } from "../lib/apiClient";
import {
  CHECK_TRANSACTION_API,
  CHECK_TRANSACTION_BASE_URL,
} from "../services/checkTransactionService/checkTransactionService";
import { APIError, CheckTransactionResponse } from "../types";

// Check transaction status by reference
const checkTransactionStatus = async (
  ref: string
): Promise<CheckTransactionResponse> => {
  const encodedRef = encodeURIComponent(ref);
  const endpoint = `${CHECK_TRANSACTION_API.transactionStatus}/${encodedRef}`;

  const response = await api(endpoint, {
    method: "GET",
    baseUrl: CHECK_TRANSACTION_BASE_URL,
  });

  console.log("Check transaction response:", response);

  return response as CheckTransactionResponse;
};

// Mutation hook for checking transaction status
export function useCheckTransactionMutation() {
  return useMutation<CheckTransactionResponse, APIError, string>({
    mutationFn: checkTransactionStatus,
  });
}
