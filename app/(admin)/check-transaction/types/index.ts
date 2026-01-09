export interface CheckTransactionResponse {
  code: string;
  description: string;
}

// Assuming we might want to display more details later if the API returns them,
// but for now the user only provided this simple response example.
// We can extend this type later.
