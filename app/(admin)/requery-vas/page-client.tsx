"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Loader2 } from "lucide-react";
import { TransactionDetailsCard } from "./components/TransactionDetailsCard";
import { RequeryVasResponse } from "./types";
import { useRequeryVasMutation } from "@/app/query-options/vasRequeryQueryOption";
import { toast } from "sonner";

const RequeryVasClient = () => {
  const [transactionRef, setTransactionRef] = useState("");
  const [result, setResult] = useState<RequeryVasResponse | null>(null);
  const [error, setError] = useState("");

  const requeryMutation = useRequeryVasMutation();

  const handleSearch = () => {
    setError("");
    setResult(null);

    if (!transactionRef.trim()) {
      setError("Please enter a Transaction Reference.");
      return;
    }

    requeryMutation.mutate(transactionRef.trim(), {
      onSuccess: (response) => {
        console.log("Requery response:", response);
        setResult(response);

        if (response.confirmationCode === 200) {
          toast.success("Transaction Found", {
            description:
              response.details.message ||
              "Transaction details retrieved successfully.",
          });
        } else if (response.confirmationCode === 404) {
          toast.error("Not Found", {
            description: response.details.message || "Transaction not found.",
          });
        }
      },
      onError: (err) => {
        console.error("Error querying transaction:", err);
        setError(
          err.message || "Failed to query transaction. Please try again."
        );
        toast.error("Query Failed", {
          description:
            err.message || "An error occurred while querying the transaction.",
        });
      },
    });
  };

  const handleReverse = (ref: string) => {
    // TODO: Implement actual reversal API when available
    toast.success("Reversal Initiated", {
      description: `Reversal process started for transaction ${ref}`,
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="mx-8 my-5 space-y-6">
      <p className="text-gray-500">View and manage VAS transaction details.</p>

      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 max-w-2xl mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-lg font-semibold text-gray-800">
            Check Transaction Status
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Enter the Transaction Reference Number to view details or reverse.
          </p>
        </div>

        <div className="flex gap-2 max-w-md mx-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Transaction Reference (e.g., 0708e...)"
              value={transactionRef}
              onChange={(e) => {
                setTransactionRef(e.target.value);
                setError("");
              }}
              onKeyDown={handleKeyDown}
              className="pl-10 h-12"
            />
          </div>
          <Button
            onClick={handleSearch}
            disabled={requeryMutation.isPending || !transactionRef}
            className="bg-[#0284B2] hover:bg-[#026a8f] text-white h-12 px-6"
          >
            {requeryMutation.isPending ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              "Check"
            )}
          </Button>
        </div>
        {error && (
          <p className="text-red-500 text-sm mt-3 text-center">{error}</p>
        )}
      </div>

      {result && (
        <div className="mt-8">
          <TransactionDetailsCard data={result} onReverse={handleReverse} />
        </div>
      )}
    </div>
  );
};

export default RequeryVasClient;
