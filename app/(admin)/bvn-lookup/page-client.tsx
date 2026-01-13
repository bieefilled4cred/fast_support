"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Loader2 } from "lucide-react";
import { BvnResultCard } from "./components/BvnResultCard";
import { BvnRecord } from "./types";
import { useBvnLookupMutation } from "@/app/query-options/bvnLookupQueryOption";

const BvnLookupClient = () => {
  const [bvn, setBvn] = useState("");
  const [result, setResult] = useState<BvnRecord | null>(null);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const bvnLookupMutation = useBvnLookupMutation();

  const handleSearch = () => {
    setError("");
    setResult(null);

    // Basic Validation
    if (!bvn.trim()) {
      setError("Please enter a BVN.");
      return;
    }
    if (!/^\d{11}$/.test(bvn.trim())) {
      setError("BVN must be exactly 11 digits.");
      return;
    }

    bvnLookupMutation.mutate(bvn.trim(), {
      onSuccess: (response) => {
        if (response.isSuccessful && response.data) {
          setResult(response.data);
        } else {
          setError(response.message || "BVN not found");
        }
        setHasSearched(true);
      },
      onError: (err) => {
        console.error("Error looking up BVN:", err);
        setError("Unable to load BVN details. Please try again.");
        setHasSearched(true);
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
      <p className="text-gray-500">View and managed BVN details.</p>

      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 max-w-2xl mx-auto text-center">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          Verify Bank Verification Number
        </h2>
        <p className="text-gray-500 mb-6 text-sm">
          Enter the 11-digit BVN to retrieve the account holder's details.
        </p>

        <div className="flex gap-2 max-w-md mx-auto">
          <Input
            placeholder="Enter 11-digit BVN"
            value={bvn}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, "").slice(0, 11);
              setBvn(val);
              setError("");
            }}
            onKeyDown={handleKeyDown}
            className="text-center text-lg tracking-widest h-12"
          />
          <Button
            onClick={handleSearch}
            disabled={bvnLookupMutation.isPending || bvn.length !== 11}
            className="bg-[#0284B2] hover:bg-[#026a8f] text-white h-12 px-6 disabled:opacity-50"
          >
            {bvnLookupMutation.isPending ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Search className="h-5 w-5" />
            )}
          </Button>
        </div>
        {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
      </div>

      {result && (
        <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <BvnResultCard data={result} />
        </div>
      )}

      {hasSearched && !result && !error && (
        <div className="bg-gray-50 rounded-lg p-8 text-center border border-dashed border-gray-200 max-w-2xl mx-auto">
          <Search className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <h3 className="text-lg font-medium text-gray-900">No BVN found</h3>
          <p className="text-gray-500 mt-1">
            The BVN you entered could not be found in our records.
          </p>
        </div>
      )}
    </div>
  );
};

export default BvnLookupClient;
