"use client";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./DataTable";
import { AccountRecord } from "../types";

interface AccountSearchTableProps {
  data: AccountRecord[];
  isLoading: boolean;
}
export function AccountSearchTable(props: AccountSearchTableProps) {
  const { data, isLoading } = props;

  const columns: ColumnDef<AccountRecord>[] = [
    {
      accessorKey: "accountName",
      header: () => <div className="py-[10px] font-medium">Account Name</div>,
      meta: { width: "20%" },
      cell: ({ row }) => (
        <div className="text-[#464646] font-medium uppercase">
          {row.getValue("accountName")}
        </div>
      ),
    },
    {
      accessorKey: "accountNumber",
      header: () => <div className="py-[10px] font-medium">Account Number</div>,
      meta: { width: "15%" },
      cell: ({ row }) => (
        <div className="text-[#464646] font-medium">
          {row.getValue("accountNumber")}
        </div>
      ),
    },
    {
      accessorKey: "phoneNumber",
      header: () => <div className="py-[10px] font-medium">Bvn</div>,
      meta: { width: "15%" },
      cell: ({ row }) => (
        <div className="text-[#464646]">{row.original.bvn}</div>
      ),
    },
    {
      accessorKey: "productName",
      header: () => <div className="py-[10px] font-medium">Product Name</div>,
      meta: { width: "20%" },
      cell: ({ row }) => (
        <div className="text-[#464646]">{row.getValue("productName")}</div>
      ),
    },
    {
      accessorKey: "accountStatus",
      header: () => <div className="py-[10px] font-medium">Status</div>,
      meta: { width: "10%" },
      cell: ({ row }) => {
        const status = row.getValue("accountStatus") as string;
        const isActive = status.toLowerCase() === "active";
        return (
          <div
            className={`text-xs font-medium px-2 py-1 rounded-full inline-block ${
              isActive
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {status}
          </div>
        );
      },
    },
    {
      id: "balance",
      header: () => <div className="py-[10px] font-medium">Balance</div>,
      meta: { width: "15%" },
      cell: ({ row }) => {
        const balance = row.original.availableBalance;
        const formatted = new Intl.NumberFormat("en-NG", {
          style: "currency",
          currency: "NGN",
        }).format(balance);
        return <div className="text-[#464646] font-medium">{formatted}</div>;
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
