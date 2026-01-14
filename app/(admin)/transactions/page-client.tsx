"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Loader2 } from "lucide-react";
import { TransactionsTable } from "./components/TransactionsTable";
import { TransactionRecord } from "./types";
import { useAccountHistoryMutation } from "@/app/query-options/transactionsQueryOption";

const DEFAULT_PAGE_SIZE = 50;

// Helper function to format date as YYYY-MM-DD
const formatDate = (date: Date): string => {
  return date.toISOString().split("T")[0];
};

// Get default dates (today and 7 days ago)
const getDefaultDates = () => {
  const today = new Date();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(today.getDate() - 7);

  return {
    endDate: formatDate(today),
    startDate: formatDate(sevenDaysAgo),
  };
};

const defaultDates = getDefaultDates();

const TransactionsClient = () => {
  const [accountNumber, setAccountNumber] = useState("");
  const [startDate, setStartDate] = useState(defaultDates.startDate);
  const [endDate, setEndDate] = useState(defaultDates.endDate);
  const [data, setData] = useState<TransactionRecord[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);

  const accountHistoryMutation = useAccountHistoryMutation();

  const handleSearch = () => {
    if (!accountNumber || !startDate || !endDate) {
      return;
    }

    accountHistoryMutation.mutate(
      {
        AccountNumber: accountNumber,
        StartDate: startDate,
        EndDate: endDate,
        PageNumber: 1,
        PageSize: DEFAULT_PAGE_SIZE,
      },
      {
        onSuccess: (response) => {
          setData(response.data.data as TransactionRecord[]);
          setTotalRecords(
            response.data.recordCount || response.data.data.length
          );
          setHasSearched(true);
          setCurrentPage(1);
        },
        onError: (error) => {
          console.error("Error fetching transactions:", error);
          setData([]);
          setHasSearched(true);
        },
      }
    );
  };

  const handlePageChange = (page: number) => {
    if (!accountNumber || !startDate || !endDate) return;

    accountHistoryMutation.mutate(
      {
        AccountNumber: accountNumber,
        StartDate: startDate,
        EndDate: endDate,
        PageNumber: page,
        PageSize: DEFAULT_PAGE_SIZE,
      },
      {
        onSuccess: (response) => {
          setData(response.data.data as TransactionRecord[]);
          setTotalRecords(
            response.data.recordCount || response.data.data.length
          );
          setCurrentPage(page);
        },
      }
    );
  };

  const totalPages = Math.ceil(totalRecords / DEFAULT_PAGE_SIZE);

  return (
    <div className="mx-8 my-5 space-y-6">
      <p className="text-gray-500">View and manage customer transactions.</p>

      {/* Search Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Account Number
            </label>
            <Input
              placeholder="Enter Account Number"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
            />
          </div>
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
          <div>
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
        <div className="flex justify-end">
          <Button
            onClick={handleSearch}
            disabled={
              !accountNumber ||
              !startDate ||
              !endDate ||
              accountHistoryMutation.isPending
            }
            className="bg-[#0284B2] hover:bg-[#026a8f] text-white disabled:opacity-50"
          >
            {accountHistoryMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Searching...
              </>
            ) : (
              <>
                <Search className="mr-2 h-4 w-4" />
                Search Transactions
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Error Message */}
      {accountHistoryMutation.isError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          <p className="font-medium">Unable to load transactions</p>
          <p className="text-sm">Please try again.</p>
        </div>
      )}

      {hasSearched && !accountHistoryMutation.isError && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <div className="mb-4">
            <h3 className="text-lg font-medium">
              Transaction History {accountNumber ? "for " + accountNumber : ""}
            </h3>
            {accountNumber && (
              <p className="text-sm text-gray-500">
                Showing {data.length} of {totalRecords} results for account:{" "}
                {accountNumber}
              </p>
            )}
          </div>
          {data.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-gray-500">
              <Search className="h-12 w-12 mb-4 text-gray-300" />
              <p className="text-lg font-medium">No transactions found</p>
              <p className="text-sm">
                No transactions found for account {accountNumber} between{" "}
                {startDate} and {endDate}.
              </p>
            </div>
          ) : (
            <TransactionsTable
              data={data}
              isLoading={accountHistoryMutation.isPending}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default TransactionsClient;
