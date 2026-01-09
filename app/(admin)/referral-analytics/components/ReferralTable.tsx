"use client";
import { ColumnDef } from "@tanstack/react-table";
import { FilePenLine, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { DataTable } from "./DataTable";

// --- Types (Mocked/Local since not found in context) ---
export interface Application {
  name: string;
  appId?: string;
}

export interface User {
  id: string;
  accountNumber: string;
  firstName: string;
  lastName: string;
  phone: string;
  referralCode: string;
  totalReferred: number;
}

export interface PaginatedResponse<T> {
  data: {
    data: T[];
    totalPages: number;
    currentPage: number;
    totalItems: number;
  };
}

interface ReferralTableProps {
  data: PaginatedResponse<User> | undefined;
  isLoading: boolean;
  onEdit?: (user: User) => void;
  onPageChange: (page: number) => void;
  currentPage: number;
}

export function ReferralTable(props: ReferralTableProps) {
  const { data, isLoading, onEdit, onPageChange, currentPage } = props;

  const users = data?.data?.data || [];
  const totalPages = data?.data?.totalPages || 0;

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "accountNumber",
      header: () => <div className="py-[10px] font-medium">Account Number</div>,
      meta: { width: "20%" },
      cell: ({ row }) => (
        <div className="text-[#464646] font-medium">
          {row.getValue("accountNumber")}
        </div>
      ),
    },
    {
      id: "fullname",
      header: () => <div className="py-[10px] font-medium">Full Name</div>,
      meta: { width: "25%" },
      cell: ({ row }) => {
        const user = row.original;
        return (
          <div className="capitalize flex items-center gap-3">
            <Link
              href={`/user-management/${user?.id}`}
              className="flex items-center gap-3"
            >
              <div>
                <p className="text-[#464646] font-medium">{`${user?.firstName} ${user?.lastName}`}</p>
              </div>
            </Link>
          </div>
        );
      },
    },
    {
      accessorKey: "phone",
      header: () => <div className="py-[10px] font-medium">Phone</div>,
      meta: { width: "20%" },
      cell: ({ row }) => (
        <div className="text-[#464646]">{row.getValue("phone")}</div>
      ),
    },
    {
      accessorKey: "referralCode",
      header: () => <div className="py-[10px] font-medium">Referral Code</div>,
      meta: { width: "15%" },
      cell: ({ row }) => (
        <div className="text-[#0284B2] font-medium bg-[#E3F2FD] px-2 py-1 rounded-md text-xs inline-block">
          {row.getValue("referralCode")}
        </div>
      ),
    },
    {
      accessorKey: "totalReferred",
      header: () => <div className="py-[10px] font-medium">Total Referred</div>,
      meta: { width: "15%" },
      cell: ({ row }) => (
        <div className="text-[#464646] font-medium text-center">
          {row.getValue("totalReferred")}
        </div>
      ),
    },
    // {
    //   id: "actions",
    //   enableHiding: true,
    //   header: () => <div className="py-[10px] font-medium">Actions</div>,
    //   meta: { width: "5%" },
    //   cell: ({ row }) => {
    //     const user = row.original;

    //     return (
    //       <DropdownMenu>
    //         <DropdownMenuTrigger asChild>
    //           <Button
    //             variant="ghost"
    //             className="h-8 w-8 p-0 focus-visible:ring-0"
    //           >
    //             <span className="sr-only">Open menu</span>
    //             <MoreHorizontal className="h-4 w-4" />
    //           </Button>
    //         </DropdownMenuTrigger>
    //         <DropdownMenuContent align="end">
    //           <DropdownMenuItem
    //             onClick={() => onEdit?.(user)}
    //             className="text-[12px] text-[#3D4F5C] cursor-pointer"
    //           >
    //             <FilePenLine className="mr-2 h-4 w-4 text-[#04B2F1]" /> Edit
    //           </DropdownMenuItem>
    //         </DropdownMenuContent>
    //       </DropdownMenu>
    //     );
    //   },
    // },
  ];

  return (
    <DataTable
      data={users}
      columns={columns}
      isLoading={isLoading}
      showPagination={true}
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={onPageChange}
    />
  );
}
