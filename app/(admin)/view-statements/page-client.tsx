"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Loader2 } from "lucide-react";
import { StatementTable } from "./components/StatementTable";
import { BankStatementRecord } from "./types";
import { toast } from "sonner";

// Mock Data
const MOCK_STATEMENT_data: BankStatementRecord[] = [
  {
    accountname: "DIGITVANT MICROFINANCE BANK LTD-SETTLEMENT ACCOUNT",
    rcrE_TIME: "2026-01-07T23:52:11",
    lchG_TIME: "2026-01-07T23:52:11",
    vfD_DATE: "2026-01-07T23:52:11",
    pstD_DATE: "2026-01-07T23:52:11",
    entrY_DATE: "2026-01-07T23:52:11",
    traN_DATE: "2026-01-08T00:00:00",
    valuE_DATE: "2026-01-07T00:00:00",
    tranid: "S40452017",
    particulars: "WMB:000017260107235153951981879672/0126791781/FIP",
    tranremarks: "000017260107235153951981879672",
    dr: -500000,
    cr: null,
    balance: -500000,
    parT_TRAN_SRL_NUM: "   1",
    instrmnT_NUM: null,
    gL_DATE: "2026-01-08T00:00:00",
  },
  {
    accountname: "DIGITVANT MICROFINANCE BANK LTD-SETTLEMENT ACCOUNT",
    rcrE_TIME: "2026-01-07T23:52:11",
    lchG_TIME: "2026-01-07T23:52:11",
    vfD_DATE: "2026-01-07T23:52:11",
    pstD_DATE: "2026-01-07T23:52:11",
    entrY_DATE: "2026-01-07T23:52:11",
    traN_DATE: "2026-01-08T00:00:00",
    valuE_DATE: "2026-01-07T00:00:00",
    tranid: "S40452017",
    particulars: "WMB:000017260107235153951981879672/0126791781/FIP",
    tranremarks: "000017260107235153951981879672",
    dr: -5,
    cr: null,
    balance: -5,
    parT_TRAN_SRL_NUM: "   3",
    instrmnT_NUM: null,
    gL_DATE: "2026-01-08T00:00:00",
  },
  {
    accountname: "DIGITVANT MICROFINANCE BANK LTD-SETTLEMENT ACCOUNT",
    rcrE_TIME: "2026-01-07T23:52:11",
    lchG_TIME: "2026-01-07T23:52:11",
    vfD_DATE: "2026-01-07T23:52:11",
    pstD_DATE: "2026-01-07T23:52:11",
    entrY_DATE: "2026-01-07T23:52:11",
    traN_DATE: "2026-01-08T00:00:00",
    valuE_DATE: "2026-01-07T00:00:00",
    tranid: "S40452017",
    particulars: "WMB:000017260107235153951981879672/0126791781/FIP",
    tranremarks: "000017260107235153951981879672",
    dr: -0.37,
    cr: null,
    balance: -0.37,
    parT_TRAN_SRL_NUM: "   5",
    instrmnT_NUM: null,
    gL_DATE: "2026-01-08T00:00:00",
  },
  {
    accountname: "DIGITVANT MICROFINANCE BANK LTD-SETTLEMENT ACCOUNT",
    rcrE_TIME: "2026-01-07T23:52:34",
    lchG_TIME: "2026-01-08T20:03:00",
    vfD_DATE: "2026-01-07T23:52:34",
    pstD_DATE: "2026-01-07T23:52:34",
    entrY_DATE: "2026-01-07T23:52:34",
    traN_DATE: "2026-01-08T00:00:00",
    valuE_DATE: "2026-01-07T00:00:00",
    tranid: "     M557",
    particulars: "STAMP DUTY ON: S40452017 08-JAN-26",
    tranremarks: "STMPDTY20260107003934422077",
    dr: -50,
    cr: null,
    balance: -50,
    parT_TRAN_SRL_NUM: "   1",
    instrmnT_NUM: null,
    gL_DATE: "2026-01-08T00:00:00",
  },
];

const ViewStatementsClient = () => {
  const [accountReference, setAccountReference] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [statementData, setStatementData] = useState<
    BankStatementRecord[] | null
  >(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = () => {
    setError("");
    setStatementData(null);

    // Optional Validation or logic if needed, but per request fields are optional.
    // if (accountReference && (...)) { ... }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setStatementData(MOCK_STATEMENT_data);
    }, 1500);
  };

  const handleExport = () => {
    toast.success("Export Initiated", {
      description:
        "Your statement is being generated and will download shortly.",
    });
    // In a real app, trigger Excel download logic here
  };

  return (
    <div className="mx-8 my-5 space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">
        View Account Statements
      </h1>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-end">
          <div className="lg:col-span-2 space-y-1">
            <label className="text-xs font-bold text-gray-600 uppercase tracking-wide">
              Account Reference
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Enter Account Number or Reference ID"
                value={accountReference}
                onChange={(e) => {
                  setAccountReference(e.target.value);
                  setError("");
                }}
                className="pl-9"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-600 uppercase tracking-wide">
              Start Date
            </label>
            <Input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-600 uppercase tracking-wide">
              End Date
            </label>
            <Input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>

          <div className="lg:col-span-4 flex justify-end">
            <Button
              onClick={handleSearch}
              disabled={isLoading}
              className="bg-[#0284B2] hover:bg-[#026a8f] text-white min-w-[150px]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Fetching
                  Statement...
                </>
              ) : (
                "Generate Statement"
              )}
            </Button>
          </div>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>

      {statementData && (
        <div className="mt-8">
          <StatementTable data={statementData} onExport={handleExport} />
        </div>
      )}
    </div>
  );
};

export default ViewStatementsClient;
