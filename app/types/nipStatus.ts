// NIP Status Types

export interface NipStatusResponse {
  rawResponse?: string;
  code: string;
  message: string;
  sessionId?: string;
}
