"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Loader2 } from "lucide-react";
import { BvnResultCard } from "./components/BvnResultCard";
import { BvnRecord, BvnLookupResponse } from "./types";

// Mock Data
const MOCK_BVN_RESPONSE: BvnLookupResponse = {
  data: {
    bvn: "22386721953",
    phone_number1: "08106396353",
    phone_number2: null,
    first_name: "SAMUEL",
    last_name: "PETER",
    middle_name: "",
    gender: "Male",
    date_of_birth: "1997-01-27",
    image: "",
  },
  isSuccessful: true,
  message: "Operation successful",
  code: "0",
};

const BvnLookupClient = () => {
  const [bvn, setBvn] = useState("");
  const [result, setResult] = useState<BvnRecord | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

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

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // For demo purposes, we accept the mock BVN or just return the mock data for any valid 11-digit input
      //   if (bvn === MOCK_BVN_RESPONSE.data.bvn) {
      setResult({ ...MOCK_BVN_RESPONSE.data, bvn: bvn });
      //   } else {
      //      // Optional: simulate not found if you wanted strictly matching
      //      // setResult(null);
      //   }
    }, 1500);
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
            disabled={isLoading || bvn.length !== 11}
            className="bg-[#0284B2] hover:bg-[#026a8f] text-white h-12 px-6"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Search className="h-5 w-5" />
            )}
          </Button>
        </div>
        {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
      </div>

      {result && (
        <div className="mt-8">
          <BvnResultCard data={result} />
        </div>
      )}
    </div>
  );
};

export default BvnLookupClient;
