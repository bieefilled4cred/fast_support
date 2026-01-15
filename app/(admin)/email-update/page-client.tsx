"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Loader2, UserMinus } from "lucide-react";
import { UserDetailCard } from "./components/UserDetailCard";
import { EmailUpdateProfile } from "./types";
import {
  useEmailUpdateProfileMutation,
  useUpdateEmailMutation,
} from "@/app/query-options/emailUpdateQueryOption";
import { toast } from "sonner";

const EmailUpdateClient = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [userData, setUserData] = useState<EmailUpdateProfile | null>(null);
  const [error, setError] = useState("");

  const profileMutation = useEmailUpdateProfileMutation();
  const updateEmailMutation = useUpdateEmailMutation();

  const handleSearch = () => {
    setError("");
    setUserData(null);

    if (!searchQuery.trim()) {
      setError("Please enter a Profile ID or Account Number.");
      return;
    }

    profileMutation.mutate(searchQuery.trim(), {
      onSuccess: (response) => {
        if (
          response.isSuccessful &&
          response.data &&
          response.data.length > 0
        ) {
          setUserData(response.data[0]);
        } else if (
          response.isSuccessful &&
          (!response.data || response.data.length === 0)
        ) {
          setError("No account found for this user.");
        } else {
          setError(response.message || "No profile found");
        }
      },
      onError: (err) => {
        console.error("Error fetching profile:", err);
        setError("Unable to load profile. Please try again.");
      },
    });
  };

  const handleUpdateEmail = async (newEmail: string): Promise<boolean> => {
    if (!userData || !userData.coreBankId) {
      toast.error("Cannot update email: Missing core bank ID");
      return false;
    }

    return new Promise((resolve) => {
      updateEmailMutation.mutate(
        {
          coreBankId: userData.coreBankId,
          email: newEmail,
        },
        {
          onSuccess: (response) => {
            if (response.isSuccessful) {
              setUserData({ ...userData, email: newEmail });
              toast.success("Email updated successfully!");
              resolve(true);
            } else {
              toast.error("Unable to update email. Please try again.");
              resolve(false);
            }
          },
          onError: (err) => {
            console.error("Error updating email:", err);
            toast.error("Unable to update email. Please try again.");
            resolve(false);
          },
        }
      );
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="mx-8 my-5 space-y-6">
      <p className="text-gray-500">View and managed email details.</p>

      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 max-w-2xl mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-lg font-semibold text-gray-800">
            Search Account
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Enter the Profile ID or Account Number to find the user.
          </p>
        </div>

        <div className="flex gap-2 max-w-md mx-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Profile ID or Account Number"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setError("");
              }}
              onKeyDown={handleKeyDown}
              className="pl-10 h-12"
            />
          </div>
          <Button
            onClick={handleSearch}
            disabled={profileMutation.isPending || !searchQuery}
            className="bg-[#0284B2] hover:bg-[#026a8f] text-white h-12 px-6 disabled:opacity-50"
          >
            {profileMutation.isPending ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              "Search"
            )}
          </Button>
        </div>
        {error && (
          <div className="bg-red-50 border border-red-100 rounded-lg p-6 mt-6 flex flex-col items-center justify-center text-center animate-in fade-in slide-in-from-top-2">
            <div className="bg-red-100 p-3 rounded-full mb-3">
              <UserMinus className="text-red-500 w-6 h-6" />
            </div>
            <h3 className="text-red-800 font-semibold mb-1">
              Invalid Account Number
            </h3>
            <p className="text-red-600 text-sm max-w-xs">{error}</p>
          </div>
        )}
      </div>

      {userData && (
        <div className="max-w-5xl mx-auto mt-8">
          <UserDetailCard
            data={userData}
            onUpdateEmail={handleUpdateEmail}
            isUpdating={updateEmailMutation.isPending}
          />
        </div>
      )}
    </div>
  );
};

export default EmailUpdateClient;
