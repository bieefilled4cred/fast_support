"use client";

import { EmailUpdateProfile } from "../types";
import { User, Mail, CreditCard, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export function UserDetailCard({
  data,
  onUpdateEmail,
}: {
  data: EmailUpdateProfile;
  onUpdateEmail: (newEmail: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [newEmail, setNewEmail] = useState(data.email);
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdate = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      onUpdateEmail(newEmail);
      setIsLoading(false);
      setOpen(false);
    }, 1000);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-[#0284B2] h-24 relative">
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
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {data.firstName} {data.lastName}
            </h2>
            <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
              <span className="bg-blue-50 text-blue-700 text-xs px-2 py-0.5 rounded-full font-medium">
                {data.tier}
              </span>
              <span>•</span>
              <span>{data.status}</span>
            </p>
          </div>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#0284B2] hover:bg-[#026a8f] text-white">
                Edit Email
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Update Email Address</DialogTitle>
                <DialogDescription>
                  Change the email address for this user. This will update their
                  login and notification preferences.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="current-email">Current Email</Label>
                  <Input
                    id="current-email"
                    value={data.email}
                    disabled
                    className="bg-gray-50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-email">New Email</Label>
                  <Input
                    id="new-email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="Enter new email address"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={handleUpdate}
                  className="bg-[#0284B2] hover:bg-[#026a8f] text-white"
                  disabled={isLoading || !newEmail || newEmail === data.email}
                >
                  {isLoading ? "Updating..." : "Update Email"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
              Contact Information
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <div className="p-2 bg-gray-50 rounded-lg text-gray-500">
                  <Mail size={16} />
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Email Address</p>
                  <p className="font-medium text-gray-900">{data.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm">
                {/* Reusing existing components logic or just raw HTML for speed/consistency */}
                <div className="p-2 bg-gray-50 rounded-lg text-gray-500">
                  <User size={16} />
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Phone Number</p>
                  <p className="font-medium text-gray-900">
                    {data.phoneNumber}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
              Account Details
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <div className="p-2 bg-gray-50 rounded-lg text-gray-500">
                  <CreditCard size={16} />
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Account Number</p>
                  <p className="font-medium text-gray-900">
                    {data.accountNumber}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="p-2 bg-gray-50 rounded-lg text-gray-500">
                  <ShieldCheck size={16} />
                </div>
                <div>
                  <p className="text-gray-500 text-xs">BVN</p>
                  <p className="font-medium text-gray-900">{data.bvn}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
