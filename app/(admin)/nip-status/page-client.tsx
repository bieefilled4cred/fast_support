"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Loader2, ArrowRightLeft } from "lucide-react";
import { NipStatusResultCard } from "./components/NipStatusResultCard";
import { NipStatusResponse } from "./types";
import { useNipStatusMutation } from "@/app/query-options/nipStatusQueryOption";
import { toast } from "sonner";

const NipStatusClient = () => {
  const [sessionId, setSessionId] = useState("");
  const [result, setResult] = useState<NipStatusResponse | null>(null);
  const [error, setError] = useState("");

  const nipStatusMutation = useNipStatusMutation();

  const handleSearch = () => {
    setError("");
    setResult(null);

    if (!sessionId.trim()) {
      setError("Please enter a Session ID / Reference Number.");
      return;
    }

    nipStatusMutation.mutate(sessionId.trim(), {
      onSuccess: (response) => {
        setResult(response);

        if (response.code === "00") {
          toast.success("Transaction Found", {
            description:
              response.message || "Transaction verified successfully.",
          });
        } else {
          toast.warning("NIP Status", {
            description: `Code: ${response.code} - ${response.message}`,
          });
        }
      },
      onError: (err) => {
        console.error("Error checking NIP status:", err);
        setError(
          err.message || "Failed to check NIP status. Please try again."
        );
        toast.error("Query Failed", {
          description:
            err.message || "An error occurred while checking the NIP status.",
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
        View and manage NIBSS NIP transaction details.
      </p>

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
              placeholder="Session ID (e.g. 0708e7fb...)"
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
            disabled={nipStatusMutation.isPending || !sessionId}
            className="bg-[#0284B2] hover:bg-[#026a8f] text-white h-12 px-6"
          >
            {nipStatusMutation.isPending ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              "Query Status"
            )}
          </Button>
        </div>
        {error && (
          <p className="text-red-500 text-sm mt-3 text-center">{error}</p>
        )}
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
