"use client";

import {
  Users,
  CreditCard,
  ArrowLeftRight,
  Search,
  UserCheck,
  FileText,
  ShieldCheck,
  TriangleAlert,
  Mail,
  PieChart,
} from "lucide-react";
import { StatsCard } from "./components/StatsCard";
import { QuickActionCard } from "./components/QuickActionCard";
import { RecentActivityTable } from "./components/RecentActivityTable";

const DashboardClient = () => {
  return (
    <div className="mx-8 my-8 space-y-8">
      <div>
        <p className="text-gray-500">
          Welcome back, Admin. Here's what's happening today.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Users"
          value="24,592"
          change="12"
          isPositive={true}
          icon={Users}
          color="bg-[#00afef]"
        />
        <StatsCard
          title="Daily Transactions"
          value="₦45.2M"
          change="8.5%"
          isPositive={true}
          icon={ArrowLeftRight}
          color="bg-[#ff5f55]"
        />
        <StatsCard
          title="Pending Requests"
          value="18"
          change="3"
          isPositive={false}
          icon={TriangleAlert}
          color="bg-yellow-400"
        />
        <StatsCard
          title="Active Cards"
          value="8,940"
          icon={CreditCard}
          color="bg-[#0282b1]"
        />
      </div>
      <h2 className="text-lg font-bold text-gray-800 mb-4 font-(family-name:--font-inter)">
        Quick Actions
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area - Quick Actions */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <QuickActionCard
              title="Search Accounts"
              description="Find user accounts by ID or number"
              href="/account-search"
              icon={Search}
              colorClass="bg-blue-50 text-blue-600"
            />
            <QuickActionCard
              title="Check Transaction"
              description="Verify transaction status"
              href="/check-transaction"
              icon={FileText}
              colorClass="bg-green-50 text-green-600"
            />
            <QuickActionCard
              title="BVN Lookup"
              description="Verify BVN details"
              href="/bvn-lookup"
              icon={ShieldCheck}
              colorClass="bg-purple-50 text-purple-600"
            />
            <QuickActionCard
              title="Profile Activation"
              description="Activate suspended profiles"
              href="/profile-activation"
              icon={UserCheck}
              colorClass="bg-orange-50 text-orange-600"
            />
            <QuickActionCard
              title="Email Update"
              description="Modify user email addresses"
              href="/email-update"
              icon={Mail}
              colorClass="bg-pink-50 text-pink-600"
            />
            <QuickActionCard
              title="View Statements"
              description="Generate account statements"
              href="/view-statements"
              icon={FileText}
              colorClass="bg-cyan-50 text-cyan-600"
            />
          </div>
        </div>

        {/* Sidebar - fills remaining height */}
        <div className="flex flex-col gap-4">
          <div className="bg-[#0284B2] rounded-xl p-6 text-white shadow-md relative overflow-hidden flex-1">
            <div className="relative z-10">
              <h3 className="font-bold text-lg mb-2 font-(family-name:--font-inter)">
                Referral Analytics
              </h3>
              <p className="text-blue-100 text-sm mb-6">
                Track user growth and referral performance.
              </p>
              <a
                href="/referral-analytics"
                className="inline-flex items-center bg-white text-[#0284B2] px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-50 transition-colors"
              >
                <PieChart className="w-4 h-4 mr-2" /> View Analytics
              </a>
            </div>
            <div className="absolute right-[-20px] bottom-[-20px] opacity-10">
              <PieChart size={120} />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex-1">
            <h3 className="font-bold text-gray-800 mb-4 font-(family-name:--font-inter)">
              System Status
            </h3>
            <div className="space-y-4">
              <StatusItem label="NIP Service" status="Operational" />
              <StatusItem label="BVN Service" status="Operational" />
              <StatusItem label="VAS Gateway" status="Degraded" isWarning />
              <StatusItem label="Email Service" status="Operational" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="w-full ">
        <RecentActivityTable />
      </div>
    </div>
  );
};

function StatusItem({
  label,
  status,
  isWarning,
}: {
  label: string;
  status: string;
  isWarning?: boolean;
}) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-sm text-gray-600 font-medium">{label}</span>
      <div className="flex items-center gap-2">
        <span
          className={`w-2 h-2 rounded-full ${
            isWarning ? "bg-yellow-500" : "bg-green-500"
          }`}
        ></span>
        <span
          className={`text-xs font-bold ${
            isWarning ? "text-yellow-600" : "text-green-600"
          }`}
        >
          {status}
        </span>
      </div>
    </div>
  );
}

export default DashboardClient;
