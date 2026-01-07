import {
  Activity,
  ArrowRightLeft,
  BarChart3,
  FileSearch,
  FileText,
  FlaskConical,
  LayoutDashboard,
  Mail,
  PieChart,
  RefreshCw,
  ScrollText,
  Search,
  ShieldCheck,
  UserCheck,
  UserRoundSearch,
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
    title: "Home",
    url: "/dashboard",
    icon: LayoutDashboard,
    group: "General",
    roles: [
      "Super Admin",
      "KYC Initiator",
      "KYC Supervisor",
      "KYC Final Approver",
      "Field Officer",
    ],
  },
  {
    title: "Referral Analytics",
    url: "/referral-analytics",
    icon: PieChart,
    group: "General",
    roles: ["Super Admin"],
  },
  {
    title: "Deposit Analytics",
    url: "/deposit-analytics",
    icon: BarChart3,
    group: "General",
    roles: ["Super Admin"],
  },

  // Operations & Support
  {
    title: "Transactions",
    url: "/transactions",
    icon: ArrowRightLeft,
    group: "Operations & Support",
    roles: ["Super Admin"],
  },
  {
    title: "Account Search",
    url: "/account-search",
    icon: UserRoundSearch,
    group: "Operations & Support",
    roles: ["Super Admin"],
  },
  {
    title: "Profile Search",
    url: "/profile-search",
    icon: Search,
    group: "Operations & Support",
    roles: ["Super Admin"],
  },
  {
    title: "Transaction Summary",
    url: "/transaction-summary",
    icon: FileText,
    group: "Operations & Support",
    roles: ["Super Admin"],
  },
  {
    title: "Lab Check",
    url: "/lab-check",
    icon: FlaskConical,
    group: "Operations & Support",
    roles: ["Super Admin"],
  },

  // Tech Support
  {
    title: "Bvn LookUp",
    url: "/bvn-lookup",
    icon: ShieldCheck,
    group: "Tech Support",
    roles: ["Super Admin"],
  },

  // Advanced Support
  {
    title: "Email Update",
    url: "/email-update",
    icon: Mail,
    group: "Advanced Support",
    roles: ["Super Admin"],
  },
  {
    title: "Profile Activation",
    url: "/profile-activation",
    icon: UserCheck,
    group: "Advanced Support",
    roles: ["Super Admin"],
  },

  // Advanced Ops
  {
    title: "Requery VAS",
    url: "/requery-vas",
    icon: RefreshCw,
    group: "Advanced Ops",
    roles: ["Super Admin"],
  },
  {
    title: "Check Transaction",
    url: "/check-transaction",
    icon: FileSearch,
    group: "Advanced Ops",
    roles: ["Super Admin"],
  },
  {
    title: "NIP Status",
    url: "/nip-status",
    icon: Activity,
    group: "Advanced Ops",
    roles: ["Super Admin"],
  },
  {
    title: "View Statements",
    url: "/view-statements",
    icon: ScrollText,
    group: "Advanced Ops",
    roles: ["Super Admin"],
  },
];
