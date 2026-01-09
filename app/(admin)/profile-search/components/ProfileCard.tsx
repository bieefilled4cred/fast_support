import { ProfileRecord } from "../types";
import {
  User,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  Calendar,
  CreditCard,
  Wallet,
  Users,
  CheckCircle2,
  XCircle,
} from "lucide-react";

export function ProfileCard({ data }: { data: ProfileRecord }) {
  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
      {/* Header / Banner */}
      <div className="bg-linear-to-r from-[#0284B2] to-[#026a8f] h-24 relative">
        <div className="absolute -bottom-10 left-6">
          <div className="h-20 w-20 rounded-full bg-white p-1 shadow-md">
            <div className="h-full w-full rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
              {data.avatar ? (
                <img
                  src={data.avatar}
                  alt="Avatar"
                  className="h-full w-full object-cover"
                />
              ) : (
                <User size={32} className="text-gray-400" />
              )}
            </div>
          </div>
        </div>
        <div className="absolute top-4 right-4">
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold ${
              data.status === "Active"
                ? "bg-green-400/20 text-white border border-white/20"
                : "bg-red-400/20 text-white border border-white/20"
            }`}
          >
            {data.status}
          </span>
        </div>
      </div>

      <div className="pt-12 px-6 pb-6 space-y-6">
        {/* Name & Basic Info */}
        <div>
          <h3 className="text-xl font-bold text-gray-900">
            {data.firstName} {data.lastName}
          </h3>
          <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
            <span>@{data.referralCode}</span>
            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
            <span>{data.profileType}</span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
              Contact Info
            </h4>
            <InfoRow icon={<Mail size={14} />} label={data.email} />
            <InfoRow
              icon={<Phone size={14} />}
              label={data.phoneNumber}
              verified={data.phoneVerified}
            />
            <InfoRow
              icon={<MapPin size={14} />}
              label={data.address || "No address provided"}
            />
          </div>

          {/* Account Details */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
              Account Info
            </h4>
            <InfoRow
              icon={<CreditCard size={14} />}
              label={data.accountNumber}
              subtext={data.coreBankId}
            />
            <InfoRow
              icon={<ShieldCheck size={14} />}
              label={`BVN: ${data.bvn}`}
              verified={data.bvnIsVerified}
            />
            <InfoRow icon={<User size={14} />} label={`Tier: ${data.tier}`} />
          </div>
        </div>

        {/* Limits & Balance */}
        <div className="bg-gray-50 rounded-lg p-4 grid grid-cols-3 gap-4 border border-gray-100">
          <div>
            <p className="text-xs text-gray-500 mb-1">Total Limit</p>
            <p className="font-semibold text-gray-900">
              {formatCurrency(data.totalLimit)}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Accrued</p>
            <p className="font-semibold text-gray-900">
              {formatCurrency(data.accruedLimit)}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Balance</p>
            <p className="font-bold text-[#0284B2]">
              {formatCurrency(data.balance)}
            </p>
          </div>
        </div>

        {/* Additional Meta */}
        <div className="flex flex-wrap gap-2 text-xs text-gray-500 border-t pt-4">
          <span className="flex items-center gap-1">
            <Calendar size={12} /> Joined {formatDate(data.createdDate)}
          </span>
          <span className="flex items-center gap-1">
            <Users size={12} /> Referrals: {data.totalReferrals}
          </span>
          <span className="flex items-center gap-1 ml-auto">
            Referred by: {data.referredBy || "None"}
          </span>
        </div>
      </div>
    </div>
  );
}

function InfoRow({
  icon,
  label,
  subtext,
  verified,
}: {
  icon: React.ReactNode;
  label: string;
  subtext?: string;
  verified?: boolean;
}) {
  return (
    <div className="flex items-start gap-2 text-sm text-gray-700">
      <div className="mt-0.5 text-gray-400">{icon}</div>
      <div className="flex-1">
        <div className="flex items-center gap-1">
          <span className="font-medium mr-1">{label}</span>
          {verified !== undefined &&
            (verified ? (
              <CheckCircle2 size={12} className="text-green-500" />
            ) : (
              <XCircle size={12} className="text-red-400" />
            ))}
        </div>
        {subtext && <p className="text-xs text-gray-500">{subtext}</p>}
      </div>
    </div>
  );
}
