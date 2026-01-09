"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Loader2 } from "lucide-react";
import { TransactionDetailsCard } from "./components/TransactionDetailsCard";
import { RequeryVasResponse } from "./types";
import { toast } from "sonner"; // Using sonner for toasts

// Mock Data
const MOCK_SUCCESS_RESPONSE: RequeryVasResponse = {
  details: {
    message: "Transaction retrieved successfully",
    data: {
      transactionRef: "782054228912",
      requestId: "REQ_123456789",
      amount: 5000,
      date: "2023-11-20T14:30:00",
      status: "Successful",
      billerName: "MTN Airtime",
      customerLine: "08031234567",
      gatewayResponse: "Approved by Financial Institution",
    },
  },
  confirmationMessage: "Success",
  confirmationCode: 200,
};

const MOCK_ERROR_RESPONSE: RequeryVasResponse = {
  details: {
    message: "Transaction not found",
  },
  confirmationMessage: "Not Found",
  confirmationCode: 404,
};

const RequeryVasClient = () => {
  const [transactionRef, setTransactionRef] = useState("");
  const [result, setResult] = useState<RequeryVasResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = () => {
    setError("");
    setResult(null);

    if (!transactionRef.trim()) {
      setError("Please enter a Transaction Reference.");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Logic for demo: Use specific ID to trigger success, otherwise showing not found (or specific known not-found ID)
      if (transactionRef === "0708e7fbcf07471ebb90bd2226a3e92f") {
        setResult(MOCK_ERROR_RESPONSE); // As per user request example for this specific generic string format
      } else if (transactionRef === "SUCCESS") {
        setResult(MOCK_SUCCESS_RESPONSE);
      } else {
        // Default to not found for unknown strings for this safety check demo
        setResult(MOCK_ERROR_RESPONSE);
      }
    }, 1500);
  };

  const handleReverse = (ref: string) => {
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
      <h1 className="text-2xl font-bold text-gray-900">
        Requery VAS Transaction
      </h1>

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
            disabled={isLoading || !transactionRef}
            className="bg-[#0284B2] hover:bg-[#026a8f] text-white h-12 px-6"
          >
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Check"}
          </Button>
        </div>
        {error && (
          <p className="text-red-500 text-sm mt-3 text-center">{error}</p>
        )}

        {/* Helper hint for demo */}
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-400">
            Try "SUCCESS" for a valid transaction.
          </p>
        </div>
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
