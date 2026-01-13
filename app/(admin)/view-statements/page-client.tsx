"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Loader2 } from "lucide-react";
import { StatementTable } from "./components/StatementTable";
import { BankStatementRecord } from "@/app/types";
import { toast } from "sonner";
import { useViewStatementMutation } from "@/app/query-options/viewStatementQueryOption";
import {
  exportToCSV,
  BANK_STATEMENT_HEADERS,
  BANK_STATEMENT_EXCLUDE_FIELDS,
} from "@/app/lib/exportUtils";

const ViewStatementsClient = () => {
  const [accountReference, setAccountReference] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [statementData, setStatementData] = useState<
    BankStatementRecord[] | null
  >(null);
  const [error, setError] = useState("");

  const viewStatementMutation = useViewStatementMutation();

  const handleSearch = () => {
    setError("");
    setStatementData(null);

    viewStatementMutation.mutate(
      {
        ref: accountReference.trim() || undefined,
        startDate: startDate || undefined,
        endDate: endDate || undefined,
      },
      {
        onSuccess: (response) => {
          console.log("Full API Response:", response);

          const records = Array.isArray(response) ? response : [];

          if (records.length > 0) {
            setStatementData(records);
            toast.success("Statement Retrieved", {
              description: `Found ${records.length} transaction(s)`,
            });
          } else {
            setStatementData([]);
            toast.info("No Records Found", {
              description: "No transactions found for the specified criteria",
            });
          }
        },
        onError: (error) => {
          const errorMessage =
            error?.message || "Failed to fetch statement. Please try again.";
          setError(errorMessage);
          toast.error("Error", {
            description: errorMessage,
          });
        },
      }
    );
  };

  const handleExport = () => {
    if (!statementData || statementData.length === 0) {
      toast.error("No Data to Export", {
        description: "Please fetch a statement first before exporting.",
      });
      return;
    }

    try {
      const dateStr = new Date().toISOString().split("T")[0];
      const filename = accountReference
        ? `statement_${accountReference}_${dateStr}`
        : `bank_statement_${dateStr}`;

      
      exportToCSV(statementData, {
        filename,
        headers: BANK_STATEMENT_HEADERS,
        excludeFields: BANK_STATEMENT_EXCLUDE_FIELDS,
      });

      toast.success("Export Successful", {
        description: "Your statement has been downloaded as CSV.",
      });
    } catch (err) {
      console.error("Export error:", err);
      toast.error("Export Failed", {
        description: "There was an error exporting the statement.",
      });
    }
  };

  return (
    <div className="mx-8 my-5 space-y-6">
      <p className="text-gray-500">View and managed account statements.</p>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-end">
          <div className="lg:col-span-2 space-y-1">
            <label className="text-xs font-bold text-gray-600 uppercase tracking-wide">
              Account Reference
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by Account Reference e.g 1234567890"
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
              disabled={viewStatementMutation.isPending}
              className="bg-[#0284B2] hover:bg-[#026a8f] text-white min-w-[150px]"
            >
              {viewStatementMutation.isPending ? (
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
