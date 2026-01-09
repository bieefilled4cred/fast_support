import { AccountRecord } from "../types";
import {
  User,
  CreditCard,
  Wallet,
  Settings,
  MapPin,
  Phone,
  Mail,
  Calendar,
  ShieldCheck,
  Building2,
  Briefcase,
} from "lucide-react";

export function AccountDetails({ data }: { data: AccountRecord }) {
  if (!data) return null;

  const formatCurrency = (amount: number | undefined) => {
    if (amount === undefined) return "N/A";
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount);
  };

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header Card */}
      <div className="bg-linear-to-r from-[#0284B2] to-[#026a8f] rounded-xl p-8 text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10 transform translate-x-10 -translate-y-10">
          <CreditCard size={200} />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-3xl font-bold">{data.accountName}</h2>
              <span
                className={`text-xs font-bold px-3 py-1 rounded-full ${
                  data.accountStatus === "Active"
                    ? "bg-green-400/20 text-green-100 border border-green-400/30"
                    : "bg-red-400/20 text-red-100 border border-red-400/30"
                }`}
              >
                {data.accountStatus}
              </span>
            </div>
            <p className="text-blue-100 text-lg flex items-center gap-2">
              <span className="opacity-75">Account Number:</span>
              <span className="font-mono font-medium tracking-wide">
                {data.accountNumber}
              </span>
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20">
            <p className="text-blue-100 text-sm mb-1">Available Balance</p>
            <p className="text-3xl font-bold">
              {formatCurrency(data.availableBalance)}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal Profile */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gray-50 border-b border-gray-100 p-4 flex items-center gap-2">
            <User className="w-5 h-5 text-[#0284B2]" />
            <h3 className="font-bold text-gray-800">Personal Profile</h3>
          </div>
          <div className="p-6 space-y-5">
            <div className="grid grid-cols-1 gap-4">
              <InfoItem
                icon={<User size={16} />}
                label="Customer ID"
                value={data.customerID}
              />
              <InfoItem
                icon={<Phone size={16} />}
                label="Phone"
                value={data.phoneNumber}
              />
              <InfoItem
                icon={<Mail size={16} />}
                label="Email"
                value={data.email}
              />
              <InfoItem
                icon={<ShieldCheck size={16} />}
                label="BVN"
                value={data.bvn}
              />
              <InfoItem
                icon={<MapPin size={16} />}
                label="Address"
                value={data.address}
              />
              <div className="grid grid-cols-2 gap-4">
                <InfoItem
                  icon={<Calendar size={16} />}
                  label="DOB"
                  value={formatDate(data.dateOfBirth)}
                />
                <InfoItem
                  icon={<User size={16} />}
                  label="Gender"
                  value={data.gender}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Account Overview */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gray-50 border-b border-gray-100 p-4 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-[#0284B2]" />
            <h3 className="font-bold text-gray-800">Account Overview</h3>
          </div>
          <div className="p-6 space-y-5">
            <InfoItem label="Product Name" value={data.productName} />
            <InfoItem label="Account Type" value={data.accountType} />
            <div className="grid grid-cols-2 gap-4">
              <InfoItem label="Tier Level" value={data.accountTierLevel} />
              <InfoItem label="Access Level" value={data.accessLevel} />
            </div>
            <InfoItem
              icon={<Building2 size={16} />}
              label="Branch"
              value={data.branchName}
            />
            <InfoItem
              icon={<User size={16} />}
              label="Account Officer"
              value={data.accountOfficerName}
            />
            <InfoItem
              label="Creation Channel"
              value={data.accountCreationChannel}
            />
          </div>
        </div>

        {/* Financials & Settings */}
        <div className="space-y-6">
          {/* Financials */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-gray-50 border-b border-gray-100 p-4 flex items-center gap-2">
              <Wallet className="w-5 h-5 text-[#0284B2]" />
              <h3 className="font-bold text-gray-800">Financial Details</h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-500">Ledger Balance</span>
                <span className="font-bold text-gray-900">
                  {formatCurrency(data.ledgerBalance)}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-500">Min. Balance</span>
                <span className="font-bold text-gray-900">
                  {formatCurrency(data.minimumBalanceRequired)}
                </span>
              </div>
            </div>
          </div>

          
        </div>
        {/* Preferences */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-gray-50 border-b border-gray-100 p-4 flex items-center gap-2">
              <Settings className="w-5 h-5 text-[#0284B2]" />
              <h3 className="font-bold text-gray-800">Preferences</h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Notifications</span>
                <div className="flex gap-2">
                  <Badge active={data.enableEmailNotification} text="Email" />
                  <Badge active={data.enableSMSNotification} text="SMS" />
                </div>
              </div>
              <div className="border-t pt-4">
                <span className="text-xs font-semibold text-gray-500 uppercase">
                  Statement Delivery
                </span>
                <div className="mt-2 flex justify-between text-sm">
                  <span className="text-gray-600">
                    Mode:{" "}
                    <span className="text-gray-900 font-medium">
                      {data.statementDeliveryMode}
                    </span>
                  </span>
                  <span className="text-gray-600">
                    Freq:{" "}
                    <span className="text-gray-900 font-medium">
                      {data.statementDeliveryFrequency}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
}

function InfoItem({
  icon,
  label,
  value,
}: {
  icon?: React.ReactNode;
  label: string;
  value: string | number | undefined | null;
}) {
  return (
    <div className="group">
      <div className="flex items-center gap-2 mb-1">
        {icon && (
          <span className="text-gray-400 group-hover:text-[#0284B2] transitionCondensed">
            {icon}
          </span>
        )}
        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
          {label}
        </span>
      </div>
      <div className="font-medium text-gray-900 break-words pl-[26px]">
        {value || "N/A"}
      </div>
    </div>
  );
}

function Badge({
  active,
  text,
}: {
  active: boolean | undefined;
  text: string;
}) {
  return (
    <span
      className={`text-xs font-bold px-2 py-1 rounded ${
        active
          ? "bg-blue-100 text-blue-700"
          : "bg-gray-100 text-gray-400 line-through"
      }`}
    >
      {text}
    </span>
  );
}
