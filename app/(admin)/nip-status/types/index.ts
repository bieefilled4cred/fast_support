export interface NipStatusResponse {
  rawResponse: string;
  code: string;
  message: string;
  sessionId: string; // User mentioned "session id" in the request, implying it might be the input or part of the output context.
}
