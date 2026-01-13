import { useMutation } from "@tanstack/react-query";
import { api } from "../lib/apiClient";
import {
  NIP_STATUS_API,
  NIP_STATUS_BASE_URL,
} from "../services/nipStatusService/nipStatusService";
import { APIError, NipStatusResponse } from "../types";

const parseNipResponse = (
  rawResponse: string,
  sessionId: string
): NipStatusResponse => {
  // Remove leading/trailing quotes if present (API returns JSON-escaped string)
  let cleanedResponse = rawResponse.trim();
  if (cleanedResponse.startsWith('"') && cleanedResponse.endsWith('"')) {
    cleanedResponse = cleanedResponse.slice(1, -1);
  }

  const parts = cleanedResponse.split("|");
  const code = parts[0]?.trim() || "";
  const message = parts.slice(1).join("|").trim() || "";

  return {
    rawResponse: cleanedResponse,
    code,
    message,
    sessionId,
  };
};

// Check NIP status by session ID / reference
const checkNipStatus = async (ref: string): Promise<NipStatusResponse> => {
  const encodedRef = encodeURIComponent(ref);
  const endpoint = `${NIP_STATUS_API.nipStatus}/${encodedRef}`;

  const response = await api(endpoint, {
    method: "GET",
    baseUrl: NIP_STATUS_BASE_URL,
    returnText: true,
  });

  console.log("NIP status raw response:", response);

  return parseNipResponse(response as string, ref);
};

// Mutation hook for checking NIP status
export function useNipStatusMutation() {
  return useMutation<NipStatusResponse, APIError, string>({
    mutationFn: checkNipStatus,
  });
}
