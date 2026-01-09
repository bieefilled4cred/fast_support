"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Loader2, ArrowRightLeft } from "lucide-react"; // ArrowRightLeft for transaction-ish icon
import { NipStatusResultCard } from "./components/NipStatusResultCard";
import { NipStatusResponse } from "./types";

// Mock Data logic helper
const parseMockResponse = (sessionId: string): NipStatusResponse => {
  // Return success for specific ID or generic demo
  if (
    sessionId === "000017260105183947086611846855" ||
    sessionId.toLowerCase() === "success"
  ) {
    return {
      rawResponse: "00|Approved or Completed Successfully",
      code: "00",
      message: "Approved or Completed Successfully",
      sessionId: sessionId,
    };
  }

  // Return failed/not found for others
  return {
    rawResponse: "25|Unable to locate record",
    code: "25",
    message: "Unable to locate record",
    sessionId: sessionId,
  };
};

const NipStatusClient = () => {
  const [sessionId, setSessionId] = useState("");
  const [result, setResult] = useState<NipStatusResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = () => {
    setError("");
    setResult(null);

    if (!sessionId.trim()) {
      setError("Please enter a Session ID / Reference Number.");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      const data = parseMockResponse(sessionId);
      setResult(data);
    }, 1200);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="mx-8 my-5 space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">
        Check NIP Transaction Status
      </h1>

      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 max-w-2xl mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center justify-center gap-2">
            <ArrowRightLeft className="text-[#0284B2]" />
            NIP Status Query
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Enter the Session ID (Reference Number) to verify the transaction
            status on the NIP network.
          </p>
        </div>

        <div className="flex gap-2 max-w-lg mx-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Session ID (e.g. 000017...)"
              value={sessionId}
              onChange={(e) => {
                setSessionId(e.target.value);
                setError("");
              }}
              onKeyDown={handleKeyDown}
              className="pl-10 h-12 font-mono text-sm"
            />
          </div>
          <Button
            onClick={handleSearch}
            disabled={isLoading || !sessionId}
            className="bg-[#0284B2] hover:bg-[#026a8f] text-white h-12 px-6"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              "Query Status"
            )}
          </Button>
        </div>
        {error && (
          <p className="text-red-500 text-sm mt-3 text-center">{error}</p>
        )}

        <div className="mt-4 text-center">
          <p className="text-xs text-gray-400">
            Try "success" or "000017260105183947086611846855"
          </p>
        </div>
      </div>

      {result && (
        <div className="max-w-2xl mx-auto">
          <NipStatusResultCard data={result} />
        </div>
      )}
    </div>
  );
};

export default NipStatusClient;
