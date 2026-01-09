"use client";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./DataTable";
import { TransactionSummaryRecord } from "../types";
import { ArrowUpRight, ArrowDownLeft } from "lucide-react";

interface TransactionSummaryTableProps {
  data: TransactionSummaryRecord[];
  isLoading: boolean;
}

export function TransactionSummaryTable(props: TransactionSummaryTableProps) {
  const { data, isLoading } = props;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return (
      <div>
        <div className="font-medium text-gray-900">
          {date.toLocaleDateString()}
        </div>
        <div className="text-xs text-gray-500">{date.toLocaleTimeString()}</div>
      </div>
    );
  };

  const columns: ColumnDef<TransactionSummaryRecord>[] = [
    {
      accessorKey: "updatedAt",
      header: () => <div className="py-[10px] font-medium">Date</div>,
      meta: { width: "12%" },
      cell: ({ row }) => formatDate(row.getValue("updatedAt")),
    },
    {
      accessorKey: "transactionRefNo",
      header: () => <div className="py-[10px] font-medium">Reference</div>,
      meta: { width: "15%" },
      cell: ({ row }) => (
        <div>
          <div
            className="font-mono text-xs text-gray-700 truncate max-w-[120px]"
            title={row.getValue("transactionRefNo")}
          >
            {row.getValue("transactionRefNo")}
          </div>
          <div className="text-[10px] text-gray-400">
            Session: {row.original.sessionId.substring(0, 10)}...
          </div>
        </div>
      ),
    },
    {
      accessorKey: "transType",
      header: () => <div className="py-[10px] font-medium">Type</div>,
      meta: { width: "10%" },
      cell: ({ row }) => (
        <span className="text-xs font-medium text-gray-600 px-2 py-1 bg-gray-100 rounded-md">
          {row.getValue("transType")}
        </span>
      ),
    },
    {
      accessorKey: "sourceAccountNumber",
      header: () => <div className="py-[10px] font-medium">Source</div>,
      meta: { width: "12%" },
      cell: ({ row }) => (
        <div className="text-sm text-gray-700 font-mono">
          {row.getValue("sourceAccountNumber")}
        </div>
      ),
    },
    {
      accessorKey: "destinationAccountNumber",
      header: () => <div className="py-[10px] font-medium">Destination</div>,
      meta: { width: "20%" },
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="text-xs font-bold text-gray-800 uppercase">
            {row.original.destinationAccountName || "N/A"}
          </span>
          <span className="text-xs text-gray-500 font-mono">
            {row.original.destinationAccountNumber} (
            {row.original.destinationBank})
          </span>
        </div>
      ),
    },
    {
      accessorKey: "amount",
      header: () => <div className="py-[10px] font-medium">Amount</div>,
      meta: { width: "15%" },
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("amount"));
        return (
          <div className="font-bold text-gray-900">
            {formatCurrency(amount)}
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: () => <div className="py-[10px] font-medium">Status</div>,
      meta: { width: "10%" },
      cell: ({ row }) => {
        const status = (row.getValue("status") as string).toLowerCase();
        let colorClass = "bg-gray-100 text-gray-700"; // default unknown

        if (status === "successful") colorClass = "bg-green-100 text-green-700";
        else if (status === "pending")
          colorClass = "bg-yellow-100 text-yellow-700";
        else if (status === "failed") colorClass = "bg-red-100 text-red-700";
        else if (status === "reversed")
          colorClass = "bg-purple-100 text-purple-700";

        return (
          <span
            className={`text-xs font-medium px-2 py-1 rounded-full inline-block capitalize ${colorClass}`}
          >
            {status}
          </span>
        );
      },
    },
  ];

  return (
    <DataTable
      data={data}
      columns={columns}
      isLoading={isLoading}
      showPagination={false}
      currentPage={1}
      totalPages={1}
      onPageChange={() => {}}
    />
  );
}
