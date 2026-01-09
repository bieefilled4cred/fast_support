import { NipStatusResponse } from "../types";
import { CheckCircle2, XCircle, AlertTriangle } from "lucide-react";

export function NipStatusResultCard({ data }: { data: NipStatusResponse }) {
  const isSuccess = data.code === "00";
  const isPending =
    data.code === "01" || data.message.toLowerCase().includes("pending");

  let Icon = XCircle;
  let bgColor = "bg-red-50";
  let borderColor = "border-red-200";
  let textColor = "text-red-700";
  let iconColor = "text-red-600";

  if (isSuccess) {
    Icon = CheckCircle2;
    bgColor = "bg-green-50";
    borderColor = "border-green-200";
    textColor = "text-green-700";
    iconColor = "text-green-600";
  } else if (isPending) {
    Icon = AlertTriangle;
    bgColor = "bg-yellow-50";
    borderColor = "border-yellow-200";
    textColor = "text-yellow-700";
    iconColor = "text-yellow-600";
  }

  return (
    <div
      className={`mt-6 p-6 rounded-lg border flex items-start gap-4 animate-in fade-in slide-in-from-bottom-2 ${bgColor} ${borderColor}`}
    >
      <div className="shrink-0">
        <Icon className={`h-6 w-6 ${iconColor}`} />
      </div>
      <div>
        <h3 className={`text-lg font-semibold ${textColor}`}>
          Status: {isSuccess ? "Success" : isPending ? "Pending" : "Failed"}
        </h3>{" "}
        {/*  Simplified status header */}
        <div className="mt-2 space-y-1">
          <p className={`text-sm ${textColor}`}>
            <span className="font-semibold opacity-75 mr-2">Session ID:</span>
            <span className="font-mono">{data.sessionId}</span>
          </p>
          <p className={`text-sm ${textColor}`}>
            <span className="font-semibold opacity-75 mr-2">
              Response Code:
            </span>
            <span className="font-mono">{data.code}</span>
          </p>
          <p className={`text-sm ${textColor}`}>
            <span className="font-semibold opacity-75 mr-2">Message:</span>
            {data.message}
          </p>
        </div>
      </div>
    </div>
  );
}
