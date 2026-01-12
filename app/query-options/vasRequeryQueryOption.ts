import { useMutation } from "@tanstack/react-query";
import { api } from "../lib/apiClient";
import {
  VAS_REQUERY_API,
  VAS_REQUERY_BASE_URL,
} from "../services/vasRequeryService/vasRequeryService";
import { APIError, RequeryVasResponse } from "../types";

// Requery VAS transaction by reference
const requeryTransaction = async (ref: string): Promise<RequeryVasResponse> => {
  const response = await api(VAS_REQUERY_API.requeryTransaction, {
    method: "POST",
    body: JSON.stringify({
      details: {
        ref: ref,
      },
    }),
    baseUrl: VAS_REQUERY_BASE_URL,
  });

  console.log("VAS Requery response:", response);

  return response as RequeryVasResponse;
};

// Mutation hook for requerying VAS transaction
export function useRequeryVasMutation() {
  return useMutation<RequeryVasResponse, APIError, string>({
    mutationFn: requeryTransaction,
  });
}
