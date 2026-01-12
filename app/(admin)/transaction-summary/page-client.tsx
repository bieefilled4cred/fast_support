"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, X, Loader2 } from "lucide-react";
import { TransactionSummaryTable } from "./components/TransactionSummaryTable";
import { TransactionSummaryRecord } from "./types";
import { useTransactionSummaryMutation } from "@/app/query-options/transactionSummaryQueryOption";

// Helper function to format date as ISO string with timezone
const formatDateForAPI = (dateString: string): string => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toISOString();
};

// Get default dates (today and 7 days ago)
const getDefaultDates = () => {
  const today = new Date();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(today.getDate() - 7);

  return {
    endDate: today.toISOString().split("T")[0],
    startDate: sevenDaysAgo.toISOString().split("T")[0],
  };
};

const defaultDates = getDefaultDates();

const TransactionSummaryClient = () => {
  const [profileId, setProfileId] = useState("");
  const [status, setStatus] = useState("Successful");
  const [type, setType] = useState("Interbank");
  const [startDate, setStartDate] = useState(defaultDates.startDate);
  const [endDate, setEndDate] = useState(defaultDates.endDate);
  const [data, setData] = useState<TransactionSummaryRecord[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const transactionSummaryMutation = useTransactionSummaryMutation();

  const handleSearch = () => {
    if (!profileId.trim()) return;

    transactionSummaryMutation.mutate(
      {
        status: status.charAt(0).toUpperCase() + status.slice(1).toLowerCase(),
        type: type.charAt(0).toUpperCase() + type.slice(1).toLowerCase(),
        start: formatDateForAPI(startDate),
        endDate: formatDateForAPI(endDate),
        profileId: profileId.trim(),
      },
      {
        onSuccess: (response) => {
          setData(response.data || []);
          setHasSearched(true);
        },
        onError: (error) => {
          console.error("Error fetching transaction summary:", error);
          setData([]);
          setHasSearched(true);
        },
      }
    );
  };

  const handleClearFilters = () => {
    setProfileId("");
    setStatus("Successful");
    setType("Interbank");
    setStartDate(defaultDates.startDate);
    setEndDate(defaultDates.endDate);
    setData([]);
    setHasSearched(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="mx-8 my-5 space-y-6">
      <p className="text-gray-500">
        View and managed transaction summary details.
      </p>

      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        <div className="flex flex-col lg:flex-row gap-4 items-end">
          {/* Search - Takes priority */}
          <div className="w-full lg:flex-1 space-y-1">
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wide flex items-center gap-1">
              <Search size={10} /> Profile ID / Account Number
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Enter Profile ID or Account Number..."
                value={profileId}
                onChange={(e) => setProfileId(e.target.value)}
                onKeyDown={handleKeyDown}
                className="pl-9 h-9 w-full bg-gray-50/50 border-gray-200 focus:bg-white transition-colors"
              />
            </div>
          </div>

          {/* Filters - Compact Row */}
          <div className="flex flex-wrap items-end gap-2 w-full lg:w-auto">
            {/* Status */}
            <div className="space-y-1 flex-1 min-w-[110px] lg:w-[130px]">
              <label
                className="text-[10px] font-bold text-gray-500 uppercase tracking-wide flex items-center gap-1"
                title="Transaction Status"
              >
                <Filter size={10} /> Status
              </label>
              <select
                className="h-9 w-full px-2 py-1 text-sm rounded-md border border-gray-200 bg-gray-50/50 focus:bg-white shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#0284B2]"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Pending">Pending</option>
                <option value="Successful">Successful</option>
                <option value="Failed">Failed</option>
                <option value="Reversed">Reversed</option>
                <option value="Unknown">Unknown</option>
              </select>
            </div>

            {/* Type */}
            <div className="space-y-1 flex-1 min-w-[110px] lg:w-[130px]">
              <label
                className="text-[10px] font-bold text-gray-500 uppercase tracking-wide flex items-center gap-1"
                title="Transaction Type"
              >
                <Filter size={10} /> Type
              </label>
              <select
                className="h-9 w-full px-2 py-1 text-sm rounded-md border border-gray-200 bg-gray-50/50 focus:bg-white shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#0284B2]"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="Interbank">Interbank</option>
                <option value="Intrabank">Intrabank</option>
                <option value="Airtime">Airtime</option>
                <option value="Data">Data</option>
                <option value="Electricity">Electricity</option>
                <option value="Cable">Cable</option>
                <option value="PointRedemption">PointRedemption</option>
              </select>
            </div>

            {/* Dates */}
            <div className="flex items-center gap-2">
              <div className="space-y-1 w-[105px]">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wide flex items-center gap-1">
                  Start
                </label>
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="h-9 w-full text-xs px-2 bg-gray-50/50 border-gray-200 focus:bg-white"
                />
              </div>
              <div className="space-y-1 w-[105px]">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wide flex items-center gap-1">
                  End
                </label>
                <Input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="h-9 w-full text-xs px-2 bg-gray-50/50 border-gray-200 focus:bg-white"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Button
                onClick={handleSearch}
                size="sm"
                disabled={
                  !profileId.trim() || transactionSummaryMutation.isPending
                }
                className="bg-[#0284B2] hover:bg-[#026a8f] text-white h-9 px-4 disabled:opacity-50"
              >
                {transactionSummaryMutation.isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Search className="w-4 h-4" />
                )}
              </Button>
              {(profileId ||
                status !== "Successful" ||
                type !== "Interbank" ||
                startDate !== defaultDates.startDate ||
                endDate !== defaultDates.endDate) && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleClearFilters}
                  className="h-9 w-9 text-gray-400 hover:text-red-500 hover:bg-red-50"
                  title="Clear Filters"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {transactionSummaryMutation.isError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          <p className="font-medium">Error fetching transactions</p>
          <p className="text-sm">
            {transactionSummaryMutation.error?.message ||
              "An error occurred while searching"}
          </p>
        </div>
      )}

      {hasSearched && !transactionSummaryMutation.isError && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="mb-4 flex justify-between items-center">
            <h3 className="text-lg font-medium">Results</h3>
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              {data.length} records found
            </span>
          </div>
          <TransactionSummaryTable
            data={data}
            isLoading={transactionSummaryMutation.isPending}
          />
        </div>
      )}

      {!hasSearched && (
        <div className="bg-gray-50 rounded-lg p-12 text-center border border-dashed border-gray-200">
          <Filter className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">
            No data to display
          </h3>
          <p className="text-gray-500 max-w-sm mx-auto mt-1">
            Enter a Profile ID or Account Number and use the filters above to
            search for transaction summaries.
          </p>
        </div>
      )}
    </div>
  );
};

export default TransactionSummaryClient;
