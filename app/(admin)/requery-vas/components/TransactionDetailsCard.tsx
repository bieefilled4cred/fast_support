import { RequeryVasResponse, VasTransactionDetails } from "../types";
import {
  AlertCircle,
  CheckCircle,
  XCircle,
  RefreshCcw,
  ArrowLeftRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useState } from "react";
import { toast } from "sonner"; // Assuming sonner is used

interface TransactionDetailsCardProps {
  data: RequeryVasResponse;
  onReverse: (ref: string) => void;
}

export function TransactionDetailsCard({
  data,
  onReverse,
}: TransactionDetailsCardProps) {
  const [isReversing, setIsReversing] = useState(false);

  // Check if we have a successful fetch or a 404
  const isNotFound = data.confirmationCode === 404;
  const transaction = data.details.data;

  const handleReverse = () => {
    if (!transaction) return;
    setIsReversing(true);
    // Simulate reverse
    setTimeout(() => {
      onReverse(transaction.transactionRef);
      setIsReversing(false);
    }, 1500);
  };

  if (isNotFound) {
    return (
      <Alert
        variant="destructive"
        className="max-w-md mx-auto mt-6 bg-red-50 border-red-200"
      >
        <AlertCircle className="h-4 w-4 text-red-600" />
        <AlertTitle className="text-red-800 font-semibold">
          Not Found
        </AlertTitle>
        <AlertDescription className="text-red-700">
          {data.details.message || "Transaction details could not be found."}
        </AlertDescription>
      </Alert>
    );
  }

  if (!transaction) return null;

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "successful":
        return "text-green-600 bg-green-50 border-green-200";
      case "failed":
        return "text-red-600 bg-red-50 border-red-200";
      case "pending":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  return (
    <Card className="max-w-xl mx-auto mt-6 border-gray-100 shadow-sm animate-in fade-in slide-in-from-bottom-4">
      <CardHeader className="bg-gray-50/50 pb-6 border-b border-gray-100">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-bold text-gray-800">
              Transaction Details
            </CardTitle>
            <p className="text-sm text-gray-500 mt-1">
              Ref: {transaction.transactionRef}
            </p>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
              transaction.status
            )}`}
          >
            {transaction.status}
          </span>
        </div>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <InfoItem
            label="Amount"
            value={`₦${transaction.amount.toLocaleString()}`}
          />
          <InfoItem
            label="Date"
            value={new Date(transaction.date).toLocaleDateString()}
          />
          <InfoItem label="Biller" value={transaction.billerName} />
          <InfoItem label="Customer ID" value={transaction.customerLine} />
          {transaction.requestId && (
            <InfoItem label="Request ID" value={transaction.requestId} />
          )}
          {transaction.gatewayResponse && (
            <InfoItem
              label="Gateway Info"
              value={transaction.gatewayResponse}
              fullWidth
            />
          )}
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50/50 border-t border-gray-100 flex justify-end gap-3 p-4">
        <Button
          variant="outline"
          onClick={handleReverse}
          disabled={isReversing}
          className="border-red-200 text-red-700 hover:bg-red-50 hover:text-red-800"
        >
          {isReversing ? (
            <RefreshCcw className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <ArrowLeftRight className="w-4 h-4 mr-2" />
          )}
          Reverse Transaction
        </Button>
      </CardFooter>
    </Card>
  );
}

function InfoItem({
  label,
  value,
  fullWidth,
}: {
  label: string;
  value: string;
  fullWidth?: boolean;
}) {
  return (
    <div className={fullWidth ? "col-span-2" : "col-span-1"}>
      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
        {label}
      </p>
      <p className="text-sm font-semibold text-gray-900 mt-0.5">{value}</p>
    </div>
  );
}
