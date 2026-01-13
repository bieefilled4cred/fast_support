import { BvnRecord } from "../types";
import {
  User,
  Phone,
  ShieldCheck,
  Calendar,
  UserCheck,
  BadgeCheck,
  Fingerprint,
} from "lucide-react";

export function BvnResultCard({ data }: { data: BvnRecord }) {
  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden max-w-5xl mx-auto animate-in fade-in zoom-in-95 duration-500">
      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-5">
        {/* Left Column - Large Image */}
        <div className="lg:col-span-2 bg-linear-to-br from-[#0284B2] via-[#0369a1] to-[#0c4a6e] p-8 relative overflow-hidden min-h-[400px] flex flex-col justify-center items-center">
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white rounded-full" />
            <div className="absolute bottom-20 right-5 w-24 h-24 border-2 border-white rounded-full" />
            <div className="absolute top-1/2 left-5 w-16 h-16 border border-white rounded-full" />
          </div>
          <div className="absolute -bottom-8 -right-8 opacity-5">
            <Fingerprint size={200} className="text-white" />
          </div>
          <div className="absolute top-4 right-4 opacity-10">
            <ShieldCheck size={80} className="text-white" />
          </div>

          {/* Profile Image Container */}
          <div className="relative z-10 mb-6">
            <div className="w-88 h-auto rounded-2xl bg-white/10 backdrop-blur-sm p-2 shadow-2xl border border-white/20 transform hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full rounded-xl bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden shadow-inner">
                {data.image ? (
                  <img
                    src={`data:image/png;base64,${data.image}`}
                    alt="BVN Photo"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User size={80} className="text-gray-300" />
                )}
              </div>
            </div>
          </div>

          {/* Name and BVN */}
          <div className="text-center relative z-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 drop-shadow-lg">
              {data.first_name} {data.last_name}
            </h2>
            {data.middle_name && (
              <p className="text-white/70 text-sm mb-3">{data.middle_name}</p>
            )}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
              <ShieldCheck size={18} className="text-emerald-300" />
              <span className="font-mono text-lg tracking-widest text-white font-semibold">
                {data.bvn}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column - Information */}
        <div className="lg:col-span-3 p-8 lg:p-10 bg-linear-to-br from-white to-gray-50/50">
          {/* Header */}
          <div className="mb-8 pb-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#0284B2]/10 rounded-lg">
                <Fingerprint size={24} className="text-[#0284B2]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">
                  BVN Verification Details
                </h3>
                <p className="text-sm text-gray-500">
                  Bank Verification Number Information
                </p>
              </div>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InfoGroup
              label="First Name"
              value={data.first_name}
              icon={<User size={20} />}
            />
            <InfoGroup
              label="Middle Name"
              value={data.middle_name}
              icon={<User size={20} />}
            />
            <InfoGroup
              label="Last Name"
              value={data.last_name}
              icon={<User size={20} />}
            />
            <InfoGroup
              label="Phone Number"
              value={data.phone_number1}
              icon={<Phone size={20} />}
            />
            {data.phone_number2 && (
              <InfoGroup
                label="Alternate Phone"
                value={data.phone_number2}
                icon={<Phone size={20} />}
              />
            )}
            <InfoGroup
              label="Date of Birth"
              value={formatDate(data.date_of_birth)}
              icon={<Calendar size={20} />}
            />
            <InfoGroup
              label="Gender"
              value={data.gender}
              icon={<UserCheck size={20} />}
            />
          </div>

          {/* Footer Note */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 px-4 py-3 rounded-xl">
              <BadgeCheck size={20} />
              <span className="text-sm font-medium">
                BVN verified successfully
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoGroup({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="group flex items-start gap-4 p-4 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-[#0284B2]/20 transition-all duration-300">
      <div className="p-3 rounded-xl bg-linear-to-br from-[#0284B2]/10 to-[#0284B2]/5 text-[#0284B2] shrink-0 group-hover:from-[#0284B2]/20 group-hover:to-[#0284B2]/10 transition-colors duration-300">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
          {label}
        </h4>
        <p className="text-base font-semibold text-gray-800 truncate">
          {value || "--"}
        </p>
      </div>
    </div>
  );
}
