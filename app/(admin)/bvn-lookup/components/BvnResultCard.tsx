import { BvnRecord } from "../types";
import { User, Phone, ShieldCheck, Calendar, UserCheck } from "lucide-react";

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
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden max-w-3xl mx-auto animate-in fade-in zoom-in-95 duration-300">
      <div className="bg-linear-to-r from-[#0284B2] to-[#026a8f] p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10 transform translate-x-4 -translate-y-4">
          <ShieldCheck size={120} />
        </div>
        <div className="relative z-10 flex items-center gap-6">
          <div className="h-24 w-24 rounded-full bg-white p-1 shadow-lg shrink-0">
            <div className="h-full w-full rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
              {data.image ? (
                <img
                  src={`data:image/png;base64,${data.image}`}
                  alt="BVN Photo"
                  className="h-full w-full object-cover"
                />
              ) : (
                <User size={40} className="text-gray-400" />
              )}
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold">
              {data.first_name} {data.middle_name} {data.last_name}
            </h2>
            <div className="flex items-center gap-2 mt-2 text-indigo-100">
              <ShieldCheck size={16} />
              <span className="font-mono text-lg tracking-wider font-semibold">
                {data.bvn}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            <InfoGroup
            label="First Name"
            value={data.first_name}
            icon={<User size={18} />}
            
          />
          <InfoGroup
            label="Middle Name"
            value={data.middle_name}
            icon={<User size={18} />}
            
          />
          <InfoGroup
            label="Last Name"
            value={data.last_name}
            icon={<User size={18} />}
            
          />
          <InfoGroup
            label="Phone Number"
            value={data.phone_number1}
            icon={<Phone size={18} />}
            
          />
          {data.phone_number2 && (
            <InfoGroup
              label="Alternate Phone"
              value={data.phone_number2}
              icon={<Phone size={18} />}
            />
          )}
          <InfoGroup
            label="Date of Birth"
            value={formatDate(data.date_of_birth)}
            icon={<Calendar size={18} />}
          />
          <InfoGroup
            label="Gender"
            value={data.gender}
            icon={<UserCheck size={18} />}
          />
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
    <div className="flex items-start gap-4">
      <div className="p-2.5 rounded-lg  text-[#0284B2] shrink-0">
        {icon}
      </div>
      <div>
        <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
          {label}
        </h4>
        <p className="mt-1 text-lg font-semibold text-gray-900">{value || "--"}</p>
      </div>
    </div>
  );
}
