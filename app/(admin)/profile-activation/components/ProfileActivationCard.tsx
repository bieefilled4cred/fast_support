import { ActivationProfile } from "../types";
import {
  User,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ShieldCheck,
  Mail,
  Phone,
  Calendar,
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
}: {
  data: ActivationProfile;
  onActivate: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleConfirmActivation = () => {
    setIsLoading(true);
    // Simulate API delay
    setTimeout(() => {
      onActivate();
      setIsLoading(false);
      setOpen(false);
    }, 1500);
  };

  const isActive = data.status.toLowerCase() === "active";

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div
        className={`h-24 relative ${
          isActive
            ? "bg-linear-to-r from-green-600 to-green-500"
            : "bg-linear-to-r from-red-600 to-red-500"
        }`}
      >
        <div className="absolute top-4 right-4 text-white font-bold opacity-20">
          {isActive ? <CheckCircle2 size={80} /> : <XCircle size={80} />}
        </div>
        <div className="absolute -bottom-10 left-8">
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
      </div>

      <div className="pt-12 px-8 pb-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {data.firstName} {data.lastName}
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  isActive
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {isActive ? "Active Account" : `${data.status} Account`}
              </span>
              <span className="text-gray-300">•</span>
              <span className="text-sm text-gray-500">{data.tier}</span>
            </div>
          </div>

          {!isActive && (
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button className="bg-green-600 hover:bg-green-700 text-white shadow-md shadow-green-200">
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Activate Profile
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Activate User Profile</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to activate this profile? This will
                    restore full access to the user's account services.
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
                      Ensure you have verified the user's identity before
                      proceeding with activation.
                    </p>
                  </div>
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={() => setOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    onClick={handleConfirmActivation}
                    className="bg-green-600 hover:bg-green-700 text-white"
                    disabled={isLoading}
                  >
                    {isLoading ? "Activating..." : "Confirm Activation"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}

          {isActive && (
            <Button
              disabled
              variant="outline"
              className="border-green-200 bg-green-50 text-green-700 cursor-default"
            >
              <CheckCircle2 className="w-4 h-4 mr-2" /> Profile Active
            </Button>
          )}
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b pb-2">
              Personal Details
            </h3>
            <div className="space-y-3">
              <InfoRow
                icon={<Mail size={16} />}
                label="Email"
                value={data.email}
              />
              <InfoRow
                icon={<Phone size={16} />}
                label="Phone"
                value={data.phoneNumber}
              />
              <InfoRow
                icon={<ShieldCheck size={16} />}
                label="BVN"
                value={data.bvn}
              />
              <InfoRow
                icon={<Calendar size={16} />}
                label="Joined"
                value={formatDate(data.dateCreated)}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b pb-2">
              Account Overview
            </h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-3 border border-gray-100">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Account Number</span>
                <span className="font-mono font-medium text-gray-900">
                  {data.accountNumber}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Current Balance</span>
                <span className="font-bold text-[#0284B2] text-base">
                  {formatCurrency(data.accountBalance)}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Last Login</span>
                <span className="text-gray-700">
                  {formatDate(data.lastLogin)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 text-sm group">
      <div className="text-gray-400 group-hover:text-[#0284B2] transition-colors">
        {icon}
      </div>
      <div className="flex-1">
        <span className="text-gray-500 text-xs uppercase mr-2">{label}:</span>
        <span className="font-medium text-gray-900">{value}</span>
      </div>
    </div>
  );
}
