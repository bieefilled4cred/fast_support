"use client";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./DataTable";
import { ProfileRecord } from "../types";
import { CheckCircle2, XCircle } from "lucide-react";

interface ProfileTableProps {
  data: ProfileRecord[];
  isLoading: boolean;
}

export function ProfileTable(props: ProfileTableProps) {
  const { data, isLoading } = props;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString();
  };

  const columns: ColumnDef<ProfileRecord>[] = [
    {
      accessorKey: "firstName",
      header: () => <div className="py-[10px] font-medium">Name</div>,
      meta: { width: "18%" },
      cell: ({ row }) => (
        <div>
          <div className="font-medium text-gray-900">
            {row.original.firstName} {row.original.lastName}
          </div>
          <div className="text-xs text-gray-500">
            @{row.original.referralCode}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "email",
      header: () => <div className="py-[10px] font-medium">Email</div>,
      meta: { width: "18%" },
      cell: ({ row }) => (
        <div
          className="text-sm text-gray-700 truncate max-w-[180px]"
          title={row.getValue("email")}
        >
          {row.getValue("email")}
        </div>
      ),
    },
    {
      accessorKey: "phoneNumber",
      header: () => <div className="py-[10px] font-medium">Phone</div>,
      meta: { width: "12%" },
      cell: ({ row }) => (
        <div className="flex items-center gap-1 text-sm text-gray-700">
          {row.getValue("phoneNumber")}
          {row.original.phoneVerified ? (
            <CheckCircle2 size={12} className="text-green-500" />
          ) : (
            <XCircle size={12} className="text-gray-300" />
          )}
        </div>
      ),
    },
    {
      accessorKey: "accountNumber",
      header: () => <div className="py-[10px] font-medium">Account</div>,
      meta: { width: "12%" },
      cell: ({ row }) => (
        <div className="font-mono text-sm text-gray-900">
          {row.getValue("accountNumber")}
        </div>
      ),
    },
    {
      accessorKey: "tier",
      header: () => <div className="py-[10px] font-medium">Tier</div>,
      meta: { width: "8%" },
      cell: ({ row }) => (
        <span className="text-xs font-medium px-2 py-1 rounded-full bg-blue-50 text-blue-700">
          {row.getValue("tier")}
        </span>
      ),
    },
    {
      accessorKey: "balance",
      header: () => <div className="py-[10px] font-medium">Balance</div>,
      meta: { width: "12%" },
      cell: ({ row }) => (
        <div className="font-medium text-[#0284B2]">
          {formatCurrency(row.getValue("balance"))}
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: () => <div className="py-[10px] font-medium">Status</div>,
      meta: { width: "10%" },
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        const isActive = status.toLowerCase() === "active";
        return (
          <span
            className={`text-xs font-medium px-2 py-1 rounded-full inline-block ${
              isActive
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {status}
          </span>
        );
      },
    },
    {
      accessorKey: "createdDate",
      header: () => <div className="py-[10px] font-medium">Joined</div>,
      meta: { width: "10%" },
      cell: ({ row }) => (
        <div className="text-sm text-gray-500">
          {formatDate(row.getValue("createdDate"))}
        </div>
      ),
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
