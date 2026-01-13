"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import {
  DepositTable,
  PaginatedResponse,
  DepositRecord,
} from "./components/DepositTable";
import { useMonthlyDepositQuery } from "@/app/query-options/depositAnalyticsQueryOption";
import { exportToCSV } from "@/app/lib/exportUtils";

const DEFAULT_PAGE_SIZE = 20;

const DepositAnalyticsClient = () => {
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch live data using the query hook
  const { data, isLoading, isError, error } = useMonthlyDepositQuery({
    pageNo: currentPage,
    pageSize: DEFAULT_PAGE_SIZE,
  });

  // Transform data to match the expected format
  const tableData: PaginatedResponse<DepositRecord> | undefined = data
    ? {
        data: data.data,
        currentPage: data.currentPage,
        pageSize: data.pageSize,
        totalRecords: data.totalRecords,
        totalPages: data.totalPages,
      }
    : undefined;

  const handleDownload = () => {
    if (!data?.data || data.data.length === 0) return;

    const dateStr = new Date().toISOString().split("T")[0];

    exportToCSV(data.data, {
      filename: `deposit_analytics_${dateStr}`,
      headers: {
        fullName: "Full Name",
        accountNumber: "Account Number",
        phoneNumber: "Phone Number",
        totalDepositAmount: "Total Deposit",
        referralCode: "Referral Code",
        dateMonth: "Date",
      },
      includeFields: [
        "fullName",
        "accountNumber",
        "phoneNumber",
        "totalDepositAmount",
        "referralCode",
        "dateMonth",
      ],
    });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="mx-8 my-5 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">
          {/* Deposit Analytics */}
        </h1>
        <Button
          onClick={handleDownload}
          disabled={!data?.data || data.data.length === 0}
          className="bg-primary hover:bg-primary/80 text-white flex items-center gap-2 disabled:opacity-50"
        >
          <Download size={16} />
          Export to Excel
        </Button>
      </div>

      {isError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          <p className="font-medium">Error loading data</p>
          <p className="text-sm">
            {error?.message || "Failed to fetch deposit analytics"}
          </p>
        </div>
      )}

      <div className="">
        <DepositTable
          data={tableData}
          isLoading={isLoading}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default DepositAnalyticsClient;
