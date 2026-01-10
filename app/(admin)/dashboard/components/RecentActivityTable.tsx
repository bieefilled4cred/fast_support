import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckCircle2, XCircle, AlertCircle } from "lucide-react";

const RECENT_ACTIVITIES = [
  {
    id: "TXN-8293",
    action: "NIP Status Check",
    user: "Admin User",
    status: "Success",
    time: "2 mins ago",
  },
  {
    id: "TXN-8292",
    action: "BVN Verification",
    user: "Support Team",
    status: "Failed",
    time: "15 mins ago",
  },
  {
    id: "TXN-8291",
    action: "Profile Activation",
    user: "Super Admin",
    status: "Success",
    time: "42 mins ago",
  },
  {
    id: "TXN-8290",
    action: "Statement Generation",
    user: "Admin User",
    status: "Pending",
    time: "1 hour ago",
  },
  {
    id: "TXN-8289",
    action: "Email Update",
    user: "Support Lead",
    status: "Success",
    time: "2 hours ago",
  },
];

export function RecentActivityTable() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Success":
        return (
          <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none">
            <CheckCircle2 className="w-3 h-3 mr-1" /> Success
          </Badge>
        );
      case "Failed":
        return (
          <Badge className="bg-red-100 text-red-700 hover:bg-red-100 border-none">
            <XCircle className="w-3 h-3 mr-1" /> Failed
          </Badge>
        );
      case "Pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100 border-none">
            <AlertCircle className="w-3 h-3 mr-1" /> Pending
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden ">
      <div className="p-6 border-b border-gray-100">
        <h3 className="font-bold text-gray-800">Recent System Activity</h3>
      </div>
      <Table>
        <TableHeader className="bg-[#E3F2FD] text-[#0284B2]  font-medium py-2 ">
          <TableRow>
            <TableHead>Reference ID</TableHead>
            <TableHead>Action Type</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {RECENT_ACTIVITIES.map((activity) => (
            <TableRow key={activity.id} className="hover:bg-gray-50/50">
              <TableCell className="font-mono text-xs">{activity.id}</TableCell>
              <TableCell>{activity.action}</TableCell>
              <TableCell className="text-gray-500 text-sm">
                {activity.user}
              </TableCell>
              <TableCell>{getStatusBadge(activity.status)}</TableCell>
              <TableCell className="text-right text-gray-400 text-sm">
                {activity.time}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
