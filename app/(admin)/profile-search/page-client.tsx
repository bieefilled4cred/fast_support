"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { ProfileTable } from "./components/ProfileTable";
import { ProfileRecord, ProfileSearchResponse } from "./types";

// Mock Data
const MOCK_PROFILE_RESPONSE: ProfileSearchResponse = {
  data: [
    {
      id: "42d3cf86e8c94cc8b0ec8fb733939b13",
      firstName: "OMOTAYO ABDULLAHI",
      lastName: "IBRAHIM",
      avatar: null,
      bvnRealName: null,
      tier: "Tier1",
      accountNumber: "1000045768",
      email: "omotayofolorunso046@gmail.com",
      dob: "1991-04-30T00:00:00",
      bvn: "22183098463",
      bvnIsVerified: true,
      hasProfilePicture: false,
      hasAccountNumber: true,
      phoneVerified: false,
      transactionPinSet: true,
      balance: 0,
      profileType: "Individual",
      productType: null,
      phoneNumber: "2348102796273",
      address: null,
      coreBankId: "00000022",
      requiresOtp: false,
      totalLimit: 10000100,
      accruedLimit: 2000,
      addressDocumentSubmitted: false,
      addressDocumentVerified: false,
      totalReferrals: 6,
      nin: null,
      ninIsVerified: false,
      bvnProfileUrl: null,
      bvnUrlUpdated: false,
      referredBy: "OSEZOZ",
      gender: "M",
      referralCode: "OSEZOZ",
      createdDate: "2025-03-25T13:19:44.10575",
      status: "Active",
    },
  ],
  isSuccessful: true,
  message: "Operation successful",
  code: "0",
};

const ProfileSearchClient = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [profiles, setProfiles] = useState<ProfileRecord[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = () => {
    console.log("Searching for profile:", searchTerm);
    // Simulate API call
    if (searchTerm.trim()) {
      setProfiles(MOCK_PROFILE_RESPONSE.data);
      setHasSearched(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="mx-8 my-5 space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Profile Search</h1>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-end">
        <div className="w-full md:w-2/3">
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            Search Customer Profile
          </label>
          <Input
            placeholder="Search by Name, Email, or Phone Number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <Button
          onClick={handleSearch}
          className="bg-[#0284B2] hover:bg-[#026a8f] text-white w-full md:w-auto"
        >
          <Search className="mr-2 h-4 w-4" /> Search Profile
        </Button>
      </div>

      {hasSearched && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-medium">Search Results</h3>
            <span className="text-sm text-gray-500">
              Found {profiles.length} results
            </span>
          </div>

          {profiles.length > 0 ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-100">
              <ProfileTable data={profiles} isLoading={false} />
            </div>
          ) : (
            <div className="bg-white p-12 rounded-lg shadow-sm border border-gray-100 text-center">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 mb-4">
                <Search className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">
                No profiles found
              </h3>
              <p className="text-gray-500 mt-1">
                We couldn&apos;t find any profiles matching &quot;{searchTerm}
                &quot;.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileSearchClient;
