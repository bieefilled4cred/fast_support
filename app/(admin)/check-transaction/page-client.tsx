"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Loader2 } from "lucide-react";
import { TransactionStatusCard } from "./components/TransactionStatusCard";
import { CheckTransactionResponse } from "./types";
import { useCheckTransactionMutation } from "@/app/query-options/checkTransactionQueryOption";
import { toast } from "sonner";

const CheckTransactionClient = () => {
  const [reference, setReference] = useState("");
  const [result, setResult] = useState<CheckTransactionResponse | null>(null);
  const [error, setError] = useState("");

  const checkTransactionMutation = useCheckTransactionMutation();

  const handleSearch = () => {
    setError("");
    setResult(null);

    if (!reference.trim()) {
      setError("Please enter a Transaction Reference.");
      return;
    }

    checkTransactionMutation.mutate(reference.trim(), {
      onSuccess: (response) => {
        console.log("Transaction status response:", response);
        setResult(response);

        if (response.code === "00") {
          toast.success("Transaction Found", {
            description: "Transaction verified successfully.",
          });
        } else {
          toast.warning("Transaction Status", {
            description: `Code: ${response.code} - ${response.description}`,
          });
        }
      },
      onError: (err) => {
        console.error("Error checking transaction:", err);
        setError(
          err.message || "Failed to check transaction. Please try again."
        );
        toast.error("Check Failed", {
          description:
            err.message || "An error occurred while checking the transaction.",
        });
      },
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="mx-8 my-5 space-y-6">
      <p className="text-gray-500">
        View and manage check transactions details.
      </p>

      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 max-w-2xl mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-lg font-semibold text-gray-800">
            Verify Transaction Status
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Enter the Transaction Reference to retrieve its status code and
            description.
          </p>
        </div>

        <div className="flex gap-2 max-w-md mx-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Enter Transaction Reference"
              value={reference}
              onChange={(e) => {
                setReference(e.target.value);
                setError("");
              }}
              onKeyDown={handleKeyDown}
              className="pl-10 h-12"
            />
          </div>
          <Button
            onClick={handleSearch}
            disabled={checkTransactionMutation.isPending || !reference}
            className="bg-[#0284B2] hover:bg-[#026a8f] text-white h-12 px-6"
          >
            {checkTransactionMutation.isPending ? (
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
        <div className="max-w-2xl mx-auto">
          <TransactionStatusCard data={result} />
        </div>
      )}
    </div>
  );
};

export default CheckTransactionClient;
