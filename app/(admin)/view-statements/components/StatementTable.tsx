"use client";

import { BankStatementRecord } from "@/app/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StatementTableProps {
  data: BankStatementRecord[];
  onExport: () => void;
}

export function StatementTable({ data, onExport }: StatementTableProps) {
  // Helper to format currency
  const formatCurrency = (amount: number | null) => {
    if (amount === null || amount === undefined) return "-";
    // Check if valid number
    if (isNaN(amount)) return "-";

    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">
          Statement Result{" "}
          <span className="text-sm font-normal text-gray-500 ml-2">
            ({data.length} records)
          </span>
        </h3>
        <Button
          variant="outline"
          size="sm"
          onClick={onExport}
          className="text-[#0284B2] border-[#0284B2] hover:bg-blue-50"
        >
          <FileDown className="w-4 h-4 mr-2" />
          Export to Excel
        </Button>
      </div>

      <div className="rounded-md border bg-white overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-[#E3F2FD]">
              <TableRow>
                <TableHead className="font-medium text-[#0284B2] whitespace-nowrap py-[10px]">
                  Reference
                </TableHead>
                {/* <TableHead className="font-medium text-[#0284B2] whitespace-nowrap py-[10px]">
                  Particulars
                </TableHead> */}
                <TableHead className="font-medium text-right whitespace-nowrap py-[10px] text-red-600">
                  Debit (₦)
                </TableHead>
                <TableHead className="font-medium text-right whitespace-nowrap py-[10px] text-green-600">
                  Credit (₦)
                </TableHead>
                <TableHead className="font-medium text-right whitespace-nowrap py-[10px] text-[#0284B2]">
                  Balance (₦)
                </TableHead>
                <TableHead className="font-medium text-[#0284B2] whitespace-nowrap py-[10px]">
                  GL Date
                </TableHead>
                <TableHead className="font-medium text-[#0284B2] whitespace-nowrap py-[10px]">
                  Value Date
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row, index) => (
                <TableRow key={index} className="hover:bg-gray-50/50">
                  <TableCell className="font-mono text-xs">
                    {row.tranremarks || row.tranid}
                  </TableCell>
                  {/* <TableCell
                    className="max-w-xs truncate text-xs"
                    title={row.particulars}
                  >
                    {row.particulars}
                  </TableCell> */}
                  <TableCell className="text-right text-red-600 font-medium whitespace-nowrap">
                    {row.dr !== 0 && row.dr !== null
                      ? formatCurrency(Math.abs(row.dr))
                      : "-"}
                  </TableCell>
                  <TableCell className="text-right text-green-600 font-medium whitespace-nowrap">
                    {row.cr !== 0 && row.cr !== null
                      ? formatCurrency(row.cr)
                      : "-"}
                  </TableCell>
                  <TableCell className="text-right font-bold whitespace-nowrap">
                    {formatCurrency(row.balance)}
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-xs text-gray-500">
                    {formatDate(row.gL_DATE)}
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-xs text-gray-500">
                    {formatDate(row.valuE_DATE)}
                  </TableCell>
                </TableRow>
              ))}
              {data.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="h-24 text-center text-muted-foreground"
                  >
                    No records found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
