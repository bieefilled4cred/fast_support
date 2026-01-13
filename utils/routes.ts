import {
  Activity,
  ArrowRightLeft,
  BarChart2,
  FileSearch,
  Fingerprint,
  FlaskConical,
  LayoutDashboard,
  Mail,
  CirclePile,
  Receipt,
  RefreshCw,
  ScrollText,
  UserCheck,
  Search,
  UserSearch,
} from "lucide-react";
import { ComponentType } from "react";

export interface SidebarLink {
  title: string;
  url: string;
  icon: ComponentType<React.ComponentProps<"svg">>;
  roles: string[];
  group?: string;
}

export const sidebarLinks: SidebarLink[] = [
  // General
  {
    title: "Overview",
    url: "/dashboard",
    icon: LayoutDashboard,
    group: "General",
    roles: [
      "Super Admin",
      "KYC Initiator",
      "KYC Supervisor",
      "KYC Final Approver",
      "Field Officer",
      "IT Administration",
    ],
  },
  {
    title: "Referral Analytics",
    url: "/referral-analytics",
    icon: CirclePile,
    group: "General",
    roles: ["Super Admin", "IT Administration"],
  },
  {
    title: "Deposit Analytics",
    url: "/deposit-analytics",
    icon: BarChart2,
    group: "General",
    roles: ["Super Admin", "IT Administration"],
  },

  // Operations & Support
  {
    title: "Transactions",
    url: "/transactions",
    icon: ArrowRightLeft,
    group: "Operations & Support",
    roles: ["Super Admin", "IT Administration"],
  },
  {
    title: "Account Search",
    url: "/account-search",
    icon: Search,
    group: "Operations & Support",
    roles: ["Super Admin", "IT Administration"],
  },
  {
    title: "Profile Search",
    url: "/profile-search",
    icon: UserSearch,
    group: "Operations & Support",
    roles: ["Super Admin", "IT Administration"],
  },
  {
    title: "Transaction Summary",
    url: "/transaction-summary",
    icon: Receipt,
    group: "Operations & Support",
    roles: ["Super Admin", "IT Administration"],
  },
  {
    title: "Lab Check",
    url: "/lab-check",
    icon: FlaskConical,
    group: "Operations & Support",
    roles: ["Super Admin", "IT Administration"],
  },

  // Tech Support
  {
    title: "Bvn LookUp",
    url: "/bvn-lookup",
    icon: Fingerprint,
    group: "Tech Support",
    roles: ["Super Admin", "IT Administration"],
  },

  // Advanced Support
  {
    title: "Email Update",
    url: "/email-update",
    icon: Mail,
    group: "Advanced Support",
    roles: ["Super Admin", "IT Administration"],
  },
  {
    title: "Profile Activation",
    url: "/profile-activation",
    icon: UserCheck,
    group: "Advanced Support",
    roles: ["Super Admin", "IT Administration"],
  },

  // Advanced Ops
  {
    title: "Requery VAS",
    url: "/requery-vas",
    icon: RefreshCw,
    group: "Advanced Ops",
    roles: ["Super Admin", "IT Administration"],
  },
  {
    title: "Check Transaction",
    url: "/check-transaction",
    icon: FileSearch,
    group: "Advanced Ops",
    roles: ["Super Admin", "IT Administration"],
  },
  {
    title: "NIP Status",
    url: "/nip-status",
    icon: Activity,
    group: "Advanced Ops",
    roles: ["Super Admin", "IT Administration"],
  },
  {
    title: "View Statements",
    url: "/view-statements",
    icon: ScrollText,
    group: "Advanced Ops",
    roles: ["Super Admin", "IT Administration"],
  },
];
