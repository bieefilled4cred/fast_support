"use client";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./DataTable";

// --- Types ---
export interface DepositRecord {
  id: string;
  profileId: string;
  dateMonth: string;
  totalDepositAmount: number;
  fullName: string;
  accountNumber: string;
  phoneNumber: string;
  referralCode: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  currentPage: number;
  pageSize: number;
  totalRecords: number;
  totalPages: number;
}

interface DepositTableProps {
  data: PaginatedResponse<DepositRecord> | undefined;
  isLoading: boolean;
  onPageChange: (page: number) => void;
  currentPage: number;
}

export function DepositTable(props: DepositTableProps) {
  const { data, isLoading, onPageChange, currentPage } = props;

  const records = data?.data || [];
  const totalPages = data?.totalPages || 0;

  const columns: ColumnDef<DepositRecord>[] = [
    {
      accessorKey: "fullName",
      header: () => <div className="py-[10px] font-medium">Full Name</div>,
      meta: { width: "20%" },
      cell: ({ row }) => (
        <div className="text-[#464646] font-medium uppercase">
          {row.getValue("fullName")}
        </div>
      ),
    },
    {
      accessorKey: "accountNumber",
      header: () => <div className="py-[10px] font-medium">Account Number</div>,
      meta: { width: "15%" },
      cell: ({ row }) => {
        const val = row.getValue("accountNumber") as string | null;
        return <div className="text-[#464646] font-medium">{val || "N/A"}</div>;
      },
    },
    {
      accessorKey: "phoneNumber",
      header: () => <div className="py-[10px] font-medium">Phone Number</div>,
      meta: { width: "15%" },
      cell: ({ row }) => (
        <div className="text-[#464646]">{row.getValue("phoneNumber")}</div>
      ),
    },
    {
      accessorKey: "totalDepositAmount",
      header: () => <div className="py-[10px] font-medium">Total Deposit</div>,
      meta: { width: "15%" },
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("totalDepositAmount"));
        const formatted = new Intl.NumberFormat("en-NG", {
          style: "currency",
          currency: "NGN",
        }).format(amount);
        return <div className="text-[#0284B2] font-medium">{formatted}</div>;
      },
    },
    {
      accessorKey: "referralCode",
      header: () => <div className="py-[10px] font-medium">Referral Code</div>,
      meta: { width: "15%" },
      cell: ({ row }) => (
        <div className="bg-[#E3F2FD] text-[#0284B2] px-2 py-1 rounded-md text-xs inline-block font-medium">
          {row.getValue("referralCode")}
        </div>
      ),
    },
    {
      accessorKey: "dateMonth",
      header: () => <div className="py-[10px] font-medium">Date (Month)</div>,
      meta: { width: "10%" },
      cell: ({ row }) => (
        <div className="text-[#464646]">{row.getValue("dateMonth")}</div>
      ),
    },
  ];

  return (
    <DataTable
      data={records}
      columns={columns}
      isLoading={isLoading}
      showPagination={true}
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={onPageChange}
    />
  );
}
