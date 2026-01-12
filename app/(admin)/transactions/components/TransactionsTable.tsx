"use client";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./DataTable";
import { TransactionRecord } from "../types";

interface TransactionsTableProps {
  data: TransactionRecord[];
  isLoading: boolean;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

export function TransactionsTable(props: TransactionsTableProps) {
  const {
    data,
    isLoading,
    currentPage = 1,
    totalPages = 1,
    onPageChange,
  } = props;

  const columns: ColumnDef<TransactionRecord>[] = [
    {
      accessorKey: "transactionDate",
      header: () => <div className="py-[10px] font-medium">Date</div>,
      meta: { width: "12%" },
      cell: ({ row }) => {
        const dateStr = row.getValue("transactionDate") as string;
        const date = new Date(dateStr);
        return (
          <div className="text-[#464646]">
            {date.toLocaleDateString()}{" "}
            <span className="text-gray-400 text-xs">
              {date.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "narration",
      header: () => <div className="py-[10px] font-medium">Description</div>,
      meta: { width: "20%" },
      cell: ({ row }) => (
        <div
          className="text-[#464646] text-sm truncate max-w-[250px]"
          title={row.getValue("narration")}
        >
          {row.getValue("narration")}
        </div>
      ),
    },
    {
      accessorKey: "debit",
      header: () => <div className="py-[10px] font-medium">Debit (₦)</div>,
      meta: { width: "10%" },
      cell: ({ row }) => {
        const val = row.getValue("debit");
        if (!val || val === "") return <div className="text-[#464646]">-</div>;
        const amount = parseFloat(val as string);
        const formatted = new Intl.NumberFormat("en-NG", {
          style: "decimal",
          minimumFractionDigits: 2,
        }).format(amount);
        return <div className="text-red-500 font-medium">{formatted}</div>;
      },
    },
    {
      accessorKey: "credit",
      header: () => <div className="py-[10px] font-medium">Credit (₦)</div>,
      meta: { width: "10%" },
      cell: ({ row }) => {
        const val = row.getValue("credit");
        if (!val || val === "") return <div className="text-[#464646]">-</div>;
        const amount = parseFloat(val as string);
        const formatted = new Intl.NumberFormat("en-NG", {
          style: "decimal",
          minimumFractionDigits: 2,
        }).format(amount);
        return <div className="text-green-500 font-medium">{formatted}</div>;
      },
    },
    {
      accessorKey: "balance",
      header: () => <div className="py-[10px] font-medium">Balance (₦)</div>,
      meta: { width: "12%" },
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("balance"));
        const formatted = new Intl.NumberFormat("en-NG", {
          style: "decimal",
          minimumFractionDigits: 2,
        }).format(amount);
        return <div className="text-[#464646] font-medium">{formatted}</div>;
      },
    },
    {
      accessorKey: "transactionStatus",
      header: () => <div className="py-[10px] font-medium">Status</div>,
      meta: { width: "10%" },
      cell: ({ row }) => {
        const status = row.getValue("transactionStatus") as string;
        return (
          <div
            className={`text-xs font-medium px-2 py-1 rounded-full inline-block ${
              status.toLowerCase() === "successful"
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {status}
          </div>
        );
      },
    },
    {
      accessorKey: "instrumentNumber",
      header: () => <div className="py-[10px] font-medium">Instrument #</div>,
      meta: { width: "13%" },
      cell: ({ row }) => (
        <div
          className="text-[#464646] text-xs truncate max-w-[100px]"
          title={row.getValue("instrumentNumber")}
        >
          {row.getValue("instrumentNumber")}
        </div>
      ),
    },
    {
      accessorKey: "postingReferenceNumber",
      header: () => <div className="py-[10px] font-medium">Session ID</div>,
      meta: { width: "13%" },
      cell: ({ row }) => (
        <div
          className="text-[#464646] text-xs truncate max-w-[100px]"
          title={row.getValue("postingReferenceNumber")}
        >
          {row.getValue("postingReferenceNumber")}
        </div>
      ),
    },
  ];

  return (
    <DataTable
      data={data}
      columns={columns}
      isLoading={isLoading}
      showPagination={totalPages > 1}
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={onPageChange}
    />
  );
}
