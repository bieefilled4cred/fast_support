"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Loader2 } from "lucide-react";
import { ProfileActivationCard } from "./components/ProfileActivationCard";
import { ActivationProfile } from "./types";
import {
  useActivationProfileMutation,
  useToggleProfileMutation,
} from "@/app/query-options/profileActivationQueryOption";
import { toast } from "sonner";

const ProfileActivationClient = () => {
  const [profileId, setProfileId] = useState("");
  const [profileData, setProfileData] = useState<ActivationProfile | null>(
    null
  );
  const [error, setError] = useState("");

  const profileMutation = useActivationProfileMutation();
  const toggleMutation = useToggleProfileMutation();

  const handleSearch = () => {
    setError("");
    setProfileData(null);

    if (!profileId.trim()) {
      setError("Please enter a Profile ID.");
      return;
    }

    profileMutation.mutate(profileId.trim(), {
      onSuccess: (response) => {
        if (
          response.isSuccessful &&
          response.data &&
          response.data.length > 0
        ) {
          setProfileData(response.data[0]);
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

  const handleActivate = async (): Promise<boolean> => {
    if (!profileData || !profileData.id) {
      toast.error("Cannot toggle profile: Missing profile ID");
      return false;
    }

    return new Promise((resolve) => {
      toggleMutation.mutate(profileData.id, {
        onSuccess: (response) => {
          if (response.isSuccessful) {
            // Toggle the status
            const newStatus =
              profileData.status?.toLowerCase() === "active"
                ? "Suspended"
                : "Active";
            setProfileData({ ...profileData, status: newStatus });
            toast.success(
              newStatus === "Active"
                ? "Profile Activated!"
                : "Profile Suspended!",
              {
                description: `The profile for ${
                  profileData.firstName
                } has been ${
                  newStatus === "Active" ? "activated" : "suspended"
                }.`,
              }
            );
            resolve(true);
          } else {
            toast.error("Unable to update profile status. Please try again.");
            resolve(false);
          }
        },
        onError: (err) => {
          console.error("Error toggling profile:", err);
          toast.error("Unable to update profile status. Please try again.");
          resolve(false);
        },
      });
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="mx-8 my-5 space-y-6">
      <p className="text-gray-500">
        View and manage profile activation status.
      </p>

      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 max-w-2xl mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-lg font-semibold text-gray-800">
            Search Profile
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Enter the Profile ID to find and manage the user's activation
            status.
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
            disabled={profileMutation.isPending || !profileId}
            className="bg-[#0284B2] hover:bg-[#026a8f] text-white h-12 px-6"
          >
            {profileMutation.isPending ? (
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
            isUpdating={toggleMutation.isPending}
          />
        </div>
      )}
    </div>
  );
};

export default ProfileActivationClient;
