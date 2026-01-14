// ... imports kept (will ensure proper closure)
import { ActivationProfile } from "../types";
import {
  User,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ShieldCheck,

  Phone,
  Calendar,
  Loader2,
  CreditCard,
  Hash,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";

export function ProfileActivationCard({
  data,
  onActivate,
  isUpdating,
}: {
  data: ActivationProfile;
  onActivate: () => Promise<boolean>;
  isUpdating: boolean;
}) {
  const [open, setOpen] = useState(false);

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const handleConfirmAction = async () => {
    const success = await onActivate();
    if (success) {
      setOpen(false);
    }
  };

  const isActive = data.status?.toLowerCase() === "active";

  const gradientClass = isActive
    ? "bg-linear-to-br from-[#0284B2] via-[#0369a1] to-[#0c4a6e]"
    : "bg-linear-to-br from-red-600 via-red-700 to-red-900";

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden max-w-5xl mx-auto animate-in fade-in zoom-in-95 duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-5">
        {/* Left Column - User Profile */}
        <div
          className={`lg:col-span-2 ${gradientClass} p-8 relative overflow-hidden min-h-[400px] flex flex-col justify-center items-center`}
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white rounded-full" />
            <div className="absolute bottom-20 right-5 w-24 h-24 border-2 border-white rounded-full" />
            <div className="absolute top-1/2 left-5 w-16 h-16 border border-white rounded-full" />
          </div>

          <div className="absolute top-4 right-4 text-white opacity-20">
            {isActive ? <CheckCircle2 size={80} /> : <XCircle size={80} />}
          </div>

          {/* Profile Image Container */}
          <div className="relative z-10 mb-6">
            <div className="w-48 h-48 rounded-2xl bg-white/10 backdrop-blur-sm p-2 shadow-2xl border border-white/20 transform hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full rounded-xl bg-gray-100 flex items-center justify-center overflow-hidden shadow-inner">
                {data.avatar ? (
                  <img
                    src={data.avatar}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User size={64} className="text-gray-400" />
                )}
              </div>
            </div>
          </div>

          {/* Name and Basic Info */}
          <div className="text-center relative z-10">
            <h2 className="text-3xl md:text-3xl font-bold text-white mb-2 drop-shadow-lg">
              {data.firstName} {data.lastName}
            </h2>

            <p className="text-white/70 text-sm mt-3 font-mono">{data.email}</p>
            <p className="text-white/70 text-xl mt-3 font-mono">
              {data.accountNumber}
            </p>
            <div
              className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 backdrop-blur-md mt-4 ${
                isActive ? "bg-primary/20" : "bg-red-500/20"
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  isActive ? "bg-green-400" : "bg-red-400"
                } shadow-[0_0_10px_rgba(74,222,128,0.5)]`}
              />
              <span className="font-medium text-white tracking-wide text-xs">
                {isActive ? "Active" : "Inactive"}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column - Details & Actions */}
        <div className="lg:col-span-3 p-8 lg:p-10 bg-linear-to-br from-white to-gray-50/50 flex flex-col">
          {/* Header */}
          <div className="mb-8 pb-6 border-b border-gray-100 flex justify-between items-start">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#0284B2]/10 rounded-lg">
                <User size={24} className="text-[#0284B2]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">
                  Profile Details
                </h3>
                <p className="text-sm text-gray-500">
                  Manage account status and view information
                </p>
              </div>
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                {isActive ? (
                  <Button className="bg-red-600 hover:bg-red-700 text-white shadow-md shadow-red-200">
                    <XCircle className="w-4 h-4 mr-2" />
                    Suspend
                  </Button>
                ) : (
                  <Button className="bg-green-600 hover:bg-green-700 text-white shadow-md shadow-green-200">
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Activate
                  </Button>
                )}
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {isActive ? "Suspend" : "Activate"} User Profile
                  </DialogTitle>
                  <DialogDescription>
                    {isActive
                      ? "Are you sure you want to suspend this profile? This will restrict the user's access to account services."
                      : "Are you sure you want to activate this profile? This will restore full access to the user's account services."}
                  </DialogDescription>
                </DialogHeader>

                <div className="bg-yellow-50 border border-yellow-100 rounded-md p-4 my-2 flex gap-3">
                  <AlertTriangle
                    className="text-yellow-600 shrink-0"
                    size={20}
                  />
                  <div className="text-sm text-yellow-800">
                    <p className="font-semibold">Verification Required</p>
                    <p>
                      {isActive
                        ? "Ensure you have a valid reason for suspending this account."
                        : "Ensure you have verified the user's identity before proceeding with activation."}
                    </p>
                  </div>
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={() => setOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    onClick={handleConfirmAction}
                    className={
                      isActive
                        ? "bg-red-600 hover:bg-red-700 text-white"
                        : "bg-green-600 hover:bg-green-700 text-white"
                    }
                    disabled={isUpdating}
                  >
                    {isUpdating ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        {isActive ? "Suspending..." : "Activating..."}
                      </>
                    ) : (
                      `Confirm ${isActive ? "Suspension" : "Activation"}`
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <InfoCard
              label="Wallet Balance"
              value={formatCurrency(data.balance)}
              icon={<Wallet size={24} className="text-white" />}
              variant="primary"
              className="md:col-span-2"
            />

            <InfoCard
              label="Account Tier"
              value={data.tier}
              icon={<Hash size={24} className="text-gray-600" />}
              variant="secondary"
            />

            <InfoGroup
              label="Account Number"
              value={data.accountNumber}
              icon={<CreditCard size={20} />}
            />

            <InfoGroup
              label="Account Id"
              value={data.id}
              icon={<User size={20} />}
            />
            <InfoGroup
              label="Phone Number"
              value={data.phoneNumber}
              icon={<Phone size={20} />}
            />
            <InfoGroup
              label="BVN"
              value={data.bvn}
              icon={<ShieldCheck size={20} />}
            />
            <InfoGroup
              label="Date Joined"
              value={formatDate(data.createdDate)}
              icon={<Calendar size={20} />}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoCard({
  label,
  value,
  icon,
  variant = "secondary",
  className = "",
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
}) {
  const isPrimary = variant === "primary";

  return (
    <div
      className={`relative overflow-hidden rounded-2xl p-6 flex items-center gap-5 transition-transform hover:scale-[1.01] duration-300 ${
        isPrimary
          ? "bg-linear-to-r from-[#0284B2] to-[#026a8f] text-white shadow-lg shadow-blue-200"
          : "bg-gray-50 border border-gray-100"
      } ${className}`}
    >
      {/* Abstract Background pattern for primary */}
      {isPrimary && (
        <div className="absolute top-0 right-0 opacity-10">
          <svg
            width="200"
            height="200"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="150" cy="50" r="100" fill="white" />
          </svg>
        </div>
      )}

      <div
        className={`p-3 rounded-xl shrink-0 ${
          isPrimary ? "bg-white/20 backdrop-blur-sm" : "bg-white shadow-sm"
        }`}
      >
        {icon}
      </div>

      <div className="relative z-10">
        <h4
          className={`text-xs font-bold uppercase tracking-widest mb-1 ${
            isPrimary ? "text-blue-100" : "text-gray-400"
          }`}
        >
          {label}
        </h4>
        <p
          className={`font-bold leading-none ${
            isPrimary ? "text-3xl" : "text-2xl text-gray-800"
          }`}
        >
          {value || "--"}
        </p>
      </div>
    </div>
  );
}

function InfoGroup({
  label,
  value,
  icon,
  highlight,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  highlight?: boolean;
}) {
  return (
    <div
      className={`group flex items-start gap-4 p-4 rounded-xl bg-white border ${
        highlight ? "border-[#0284B2]/30 shadow-md" : "border-gray-100"
      } shadow-sm hover:shadow-md hover:border-[#0284B2]/20 transition-all duration-300`}
    >
      <div
        className={`p-3 rounded-xl ${
          highlight
            ? "bg-[#0284B2]/20 text-[#0284B2]"
            : "bg-linear-to-br from-gray-100 to-gray-50 text-gray-500"
        } shrink-0 group-hover:from-[#0284B2]/20 group-hover:to-[#0284B2]/10 group-hover:text-[#0284B2] transition-colors duration-300`}
      >
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
          {label}
        </h4>
        <p
          className={`text-sm font-semibold truncate ${
            highlight ? "text-[#0284B2] text-lg" : "text-gray-800"
          }`}
        >
          {value || "--"}
        </p>
      </div>
    </div>
  );
}
