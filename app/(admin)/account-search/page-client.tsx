"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Loader2 } from "lucide-react";
import { AccountDetails } from "./components/AccountDetails";
import { AccountRecord } from "./types";
import { useAccountDetailMutation } from "@/app/query-options/accountSearchQueryOption";

const AccountSearchClient = () => {
  const [accountNumber, setAccountNumber] = useState("");
  const [data, setData] = useState<AccountRecord | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const accountDetailMutation = useAccountDetailMutation();

  const handleSearch = () => {
    if (!accountNumber.trim()) return;

    accountDetailMutation.mutate(accountNumber.trim(), {
      onSuccess: (response) => {
        setData(response.data);
        setHasSearched(true);
      },
      onError: (error) => {
        console.error("Error fetching account details:", error);
        setData(null);
        setHasSearched(true);
      },
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="mx-8 my-5 space-y-6">
      <p className="text-gray-500">
        View and managed customer profile details.
      </p>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-end">
        <div className="w-full md:w-1/2">
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            Account Number
          </label>
          <Input
            placeholder="Enter Account Number"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </div>
        <Button
          onClick={handleSearch}
          disabled={!accountNumber.trim() || accountDetailMutation.isPending}
          className="bg-[#0284B2] hover:bg-[#026a8f] text-white disabled:opacity-50"
        >
          {accountDetailMutation.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Searching...
            </>
          ) : (
            <>
              <Search className="mr-2 h-4 w-4" />
              Search Account
            </>
          )}
        </Button>
      </div>

      {/* Error Message */}
      {accountDetailMutation.isError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          <p className="font-medium">Error loading account details</p>
          <p className="text-sm">
            {accountDetailMutation.error?.message ||
              "Account not found or an error occurred"}
          </p>
        </div>
      )}

      {hasSearched && !accountDetailMutation.isError && (
        <div className="">
          <div className="mb-4">
            <h3 className="text-lg font-medium">Search Results</h3>
            {accountNumber && (
              <p className="text-sm text-gray-500">
                Results for: {accountNumber}
              </p>
            )}
          </div>
          {data ? (
            <AccountDetails data={data} />
          ) : (
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center text-gray-500">
              No account found.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AccountSearchClient;
