"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, X } from "lucide-react";
import { TransactionSummaryTable } from "./components/TransactionSummaryTable";
import { TransactionSummaryRecord, TransactionSummaryResponse } from "./types";

// Mock Data
const MOCK_DATA: TransactionSummaryResponse = {
  data: [
    {
      transactionRefNo: "1f63216a05b7458ab429ebc6bddf15f4",
      sourceAccountNumber: "1000004787",
      sourceAccountName: null,
      destinationAccountNumber: "0009477765",
      destinationAccountName: "OLUWASEGUN DOYIN AWODEKO",
      destinationBank: "000014",
      sessionId: "000017260107195919668151877861",
      referenceNumber: "26010725977",
      profileId: "42d3cf86e8c94cc8b0ec8fb733939b13",
      channel: "Mobile",
      fee: 0,
      amount: 10000,
      updatedAt: "2026-01-07T18:59:34",
      modifiedDate: "2026-01-07T18:59:34",
      status: "Successful",
      transType: "Interbank",
      provider: null,
    },
    {
      transactionRefNo: "d9235910b87a4822be38043692e4404e",
      sourceAccountNumber: "1000045768",
      sourceAccountName: null,
      destinationAccountNumber: "6505659765",
      destinationAccountName: "IBRAHIM OMOTAYO ABDULLAHI",
      destinationBank: "000023",
      sessionId: "000017260107115203243191870976",
      referenceNumber: "26010710295",
      profileId: "42d3cf86e8c94cc8b0ec8fb733939b13",
      channel: "Mobile",
      fee: 0,
      amount: 223000,
      updatedAt: "2026-01-07T10:52:18",
      modifiedDate: "2026-01-07T10:52:18",
      status: "Successful",
      transType: "Interbank",
      provider: null,
    },
    {
      transactionRefNo: "0350aaff810c40e1bbae4c88d38527d4",
      sourceAccountNumber: "1000000239",
      sourceAccountName: null,
      destinationAccountNumber: "5230956443",
      destinationAccountName: "CORALPAY-NextGen PG",
      destinationBank: "000001",
      sessionId: "000017260106155333349351861670",
      referenceNumber: "26010663684",
      profileId: "42d3cf86e8c94cc8b0ec8fb733939b13",
      channel: "Mobile",
      fee: 0,
      amount: 5000,
      updatedAt: "2026-01-06T14:53:50",
      modifiedDate: "2026-01-06T14:53:50",
      status: "Successful",
      transType: "Interbank",
      provider: null,
    },
    {
      transactionRefNo: "0361f7f76395469db323c368b3b64bcc",
      sourceAccountNumber: "1000000239",
      sourceAccountName: null,
      destinationAccountNumber: "8186506998",
      destinationAccountName: "OLUFEMI OPEYEMI OLOWOYO",
      destinationBank: "100004",
      sessionId: "000017260105082322515121838694",
      referenceNumber: "251231507801",
      profileId: "42d3cf86e8c94cc8b0ec8fb733939b13",
      channel: "Mobile",
      fee: 0,
      amount: 5900,
      updatedAt: "2026-01-05T07:23:37",
      modifiedDate: "2026-01-05T07:23:37",
      status: "Successful",
      transType: "Interbank",
      provider: null,
    },
  ],
  isSuccessful: true,
  message: "Operation successful",
  code: "0",
};

const TransactionSummaryClient = () => {
  const [accountName, setAccountName] = useState("");
  const [status, setStatus] = useState("all");
  const [type, setType] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [data, setData] = useState<TransactionSummaryRecord[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [showFilters, setShowFilters] = useState(true);

  const handleSearch = () => {
    console.log("Searching with params:", {
      accountName,
      status,
      type,
      startDate,
      endDate,
    });
    // In a real app, you would pass these params to your API
    // For now, we mock the result
    if (accountName) {
      setData(MOCK_DATA.data);
      setHasSearched(true);
    }
  };

  const handleClearFilters = () => {
    setAccountName("");
    setStatus("all");
    setType("all");
    setStartDate("");
    setEndDate("");
    setData([]); // Clear data when filters are cleared
    setHasSearched(false); // Reset search state
  };

  return (
    <div className="mx-8 my-5 space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Transaction Summary</h1>

      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        <div className="flex flex-col lg:flex-row gap-4 items-end">
          {/* Search - Takes priority */}
          <div className="w-full lg:flex-1 space-y-1">
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wide flex items-center gap-1">
              <Search size={10} /> Search Criteria
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Account Name..."
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
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
                <option value="all">All</option>
                <option value="pending">Pending</option>
                <option value="successful">Successful</option>
                <option value="failed">Failed</option>
                <option value="reversed">Reversed</option>
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
                <option value="all">All</option>
                <option value="interbank">Interbank</option>
                <option value="intrabank">Intrabank</option>
                <option value="airtime">Airtime</option>
                <option value="data">Data</option>
                <option value="electricity">Electric</option>
                <option value="cable">Cable</option>
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
                className="bg-[#0284B2] hover:bg-[#026a8f] text-white h-9 px-4"
              >
                <Search className="w-4 h-4" />
              </Button>
              {(accountName ||
                status !== "all" ||
                type !== "all" ||
                startDate ||
                endDate) && (
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

      {hasSearched && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="mb-4 flex justify-between items-center">
            <h3 className="text-lg font-medium">Results</h3>
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              {data.length} records found
            </span>
          </div>
          <TransactionSummaryTable data={data} isLoading={false} />
        </div>
      )}

      {!hasSearched && (
        <div className="bg-gray-50 rounded-lg p-12 text-center border border-dashed border-gray-200">
          <Filter className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">
            No data to display
          </h3>
          <p className="text-gray-500 max-w-sm mx-auto mt-1">
            Use the filters above to search for transaction summaries.
          </p>
        </div>
      )}
    </div>
  );
};

export default TransactionSummaryClient;
