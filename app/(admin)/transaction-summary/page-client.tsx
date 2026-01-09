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
  };

  return (
    <div className="mx-8 my-5 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">
          Transaction Summary
        </h1>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowFilters(!showFilters)}
          className={showFilters ? "bg-gray-100" : ""}
        >
          <Filter className="w-4 h-4 mr-2" />
          {showFilters ? "Hide Filters" : "Show Filters"}
        </Button>
      </div>

      {showFilters && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 space-y-4 animate-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {/* Search Input */}
            <div className="md:col-span-2 lg:col-span-1 xl:col-span-2">
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Account Name/Number
              </label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search Account..."
                  value={accountName}
                  onChange={(e) => setAccountName(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Status
              </label>
              <select
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="successful">Successful</option>
                <option value="failed">Failed</option>
                <option value="reversed">Reversed</option>
                <option value="unknown">Unknown</option>
              </select>
            </div>

            {/* Type Filter */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Transaction Type
              </label>
              <select
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="interbank">Interbank</option>
                <option value="intrabank">Intrabank</option>
                <option value="airtime">Airtime</option>
                <option value="data">Data</option>
                <option value="electricity">Electricity</option>
                <option value="cable">Cable</option>
                <option value="point redemption">Point Redemption</option>
              </select>
            </div>

            {/* Date Range - doing simpler input type=date for speed/standard compliance */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Start Date
              </label>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div className="md:col-span-2 lg:col-span-1 xl:col-span-1">
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                End Date
              </label>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-between items-center pt-2 border-t border-gray-50 mt-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearFilters}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-3 h-3 mr-1" /> Clear Filters
            </Button>
            <Button
              onClick={handleSearch}
              className="bg-[#0284B2] hover:bg-[#026a8f] text-white"
            >
              <Search className="mr-2 h-4 w-4" /> Apply Filters
            </Button>
          </div>
        </div>
      )}

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
