"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Loader2 } from "lucide-react";
import { ProfileActivationCard } from "./components/ProfileActivationCard";
import { ActivationProfile, ActivationResponse } from "./types";
import { toast } from "sonner"; // Using sonner for toasts

// Mock Data
const MOCK_ACTIVATION_PROFILE: ActivationResponse = {
  data: {
    id: "42d3cf86e8c94cc8b0ec8fb733939b13",
    firstName: "OMOTAYO ABDULLAHI",
    lastName: "IBRAHIM",
    email: "omotayofolorunso046@gmail.com",
    phoneNumber: "2348102796273",
    avatar: null,
    status: "Suspended", // Default to suspended to show activation flow
    tier: "Tier 1",
    accountNumber: "1000045768",
    accountBalance: 25000.0,
    bvn: "22183098463",
    dateCreated: "2023-11-15T10:30:00",
    lastLogin: "2026-01-08T18:45:00",
  },
  isSuccessful: true,
  message: "Operation successful",
  code: "0",
};

const ProfileActivationClient = () => {
  const [profileId, setProfileId] = useState("");
  const [profileData, setProfileData] = useState<ActivationProfile | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = () => {
    setError("");
    setProfileData(null);

    if (!profileId.trim()) {
      setError("Please enter a Profile ID.");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // For demo, we just return the mock user regardless of ID for now,
      // but in a real app check ID.
      setProfileData({ ...MOCK_ACTIVATION_PROFILE.data, id: profileId });
    }, 1000);
  };

  const handleActivate = () => {
    if (profileData) {
      // Optimistic update
      setProfileData({ ...profileData, status: "Active" });
      toast.success("Profile Activated", {
        description: `The profile for ${profileData.firstName} has been successfully activated.`,
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="mx-8 my-5 space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Profile Activation</h1>

      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 max-w-2xl mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-lg font-semibold text-gray-800">
            Search Inactive Profile
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Enter the Profile ID to find and activate the user account.
          </p>
        </div>

        <div className="flex gap-2 max-w-md mx-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Enter Profile ID"
              value={profileId}
              onChange={(e) => {
                setProfileId(e.target.value);
                setError("");
              }}
              onKeyDown={handleKeyDown}
              className="pl-10 h-12"
            />
          </div>
          <Button
            onClick={handleSearch}
            disabled={isLoading || !profileId}
            className="bg-[#0284B2] hover:bg-[#026a8f] text-white h-12 px-6"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              "Search"
            )}
          </Button>
        </div>
        {error && (
          <p className="text-red-500 text-sm mt-3 text-center">{error}</p>
        )}
      </div>

      {profileData && (
        <div className="max-w-3xl mx-auto mt-8">
          <ProfileActivationCard
            data={profileData}
            onActivate={handleActivate}
          />
        </div>
      )}
    </div>
  );
};

export default ProfileActivationClient;
