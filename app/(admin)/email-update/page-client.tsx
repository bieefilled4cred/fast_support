"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Loader2 } from "lucide-react";
import { UserDetailCard } from "./components/UserDetailCard";
import { EmailUpdateProfile, EmailUpdateSearchResponse } from "./types";
import { toast } from "sonner"; // Assuming sonner is used, or alert if not

// Mock Data
const MOCK_RESPONSE: EmailUpdateSearchResponse = {
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

const EmailUpdateClient = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [userData, setUserData] = useState<EmailUpdateProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = () => {
    setError("");
    setUserData(null);

    if (!searchQuery.trim()) {
      setError("Please enter a Profile ID or Account Number.");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Logic to find user (simulated)
      // Check if search query matches mock data ID or Account Number
      const mockUser = MOCK_RESPONSE.data[0];
      if (
        searchQuery === mockUser.id ||
        searchQuery === mockUser.accountNumber ||
        searchQuery === "1000045768" // Fallback for demo ease
      ) {
        setUserData(mockUser);
      } else {
        // return data anyway for demo if not strictly matching to allow easy testing by user
        setUserData(mockUser);
      }
    }, 1000);
  };

  const handleUpdateEmail = (newEmail: string) => {
    if (userData) {
      setUserData({ ...userData, email: newEmail });
      // In a real app, you would verify success via API response
      // alert("Email updated successfully!");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="mx-8 my-5 space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Email Update</h1>

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
            disabled={isLoading || !searchQuery}
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

      {userData && (
        <div className="max-w-2xl mx-auto mt-8">
          <UserDetailCard data={userData} onUpdateEmail={handleUpdateEmail} />
        </div>
      )}
    </div>
  );
};

export default EmailUpdateClient;
