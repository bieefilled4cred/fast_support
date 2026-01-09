import { CheckTransactionResponse } from "../types";
import { CheckCircle2, XCircle, Info } from "lucide-react";

export function TransactionStatusCard({
  data,
}: {
  data: CheckTransactionResponse;
}) {
  const isSuccess = data.code === "00";

  return (
    <div
      className={`mt-6 p-6 rounded-lg border flex items-start gap-4 animate-in fade-in slide-in-from-bottom-2 ${
        isSuccess ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
      }`}
    >
      <div className="shrink-0">
        {isSuccess ? (
          <CheckCircle2 className="h-6 w-6 text-green-600" />
        ) : (
          <XCircle className="h-6 w-6 text-red-600" />
        )}
      </div>
      <div>
        <h3
          className={`text-lg font-semibold ${
            isSuccess ? "text-green-800" : "text-red-800"
          }`}
        >
          {isSuccess
            ? "Transaction Successful"
            : "Transaction Failed or Not Found"}
        </h3>
        <p className={`mt-1 ${isSuccess ? "text-green-700" : "text-red-700"}`}>
          <span className="font-medium mr-2">Code:</span> {data.code}
        </p>
        <p className={`mt-1 ${isSuccess ? "text-green-700" : "text-red-700"}`}>
          <span className="font-medium mr-2">Description/Session ID:</span>
          <span className="font-mono">{data.description}</span>
        </p>
      </div>
    </div>
  );
}
