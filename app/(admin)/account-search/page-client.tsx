"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { AccountDetails } from "./components/AccountDetails";
import { AccountRecord, AccountSearchResponse } from "./types";

// Mock Data
const MOCK_RESPONSE: AccountSearchResponse = {
  data: {
    data: [
      {
        id: "a974e7de-c9b7-4b35-9228-764845a562af",
        accountNumber: "1000045768",
        customerID: "00000022",
        customerName: "IBRAHIM OMOTAYO ABDULLAHI",
        accountName: "IBRAHIM OMOTAYO ABDULLAHI",
        accountType: "Savings",
        branchName: "Head Office Branch",
        productName: "DIGITVANT STAFF TARGET SAVINGS ",
        accountOfficerName: "ALADEKOYE SAMUEL",
        accountStatus: "Active",
        ledgerBalance: 0,
        availableBalance: 0,
        firstName: "OMOTAYO",
        lastName: "IBRAHIM",
        phoneNumber: "2348102796273",
        bvn: "22183098463",
        email: "omotayofolorunso046@gmail.com",
        dateOfBirth: "1991-04-30T00:00:00",
        gender: "Male",
        accountTierLevel: 3,
        accessLevel: 1,
        enableEmailNotification: true,
        enableSMSNotification: true,
        statementDeliveryMode: "Email",
        statementDeliveryFrequency: "Monthly",
        minimumBalanceRequired: 0,
        accountCreationChannel: "Web",
        address: "25, MEIRAN ROAD, ALIMOSHO, LAGOS",
        meansOfIdentification: "NationalID",
        idNumber: "51330321447",
      },
    ],
    recordCount: 1,
  },
  status: true,
  message: "Request successful",
};

const AccountSearchClient = () => {
  const [accountNumber, setAccountNumber] = useState("");
  const [data, setData] = useState<AccountRecord[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = () => {
    console.log("Searching for account:", accountNumber);
    // Simulate API call
    setData(MOCK_RESPONSE.data.data);
    setHasSearched(true);
  };

  return (
    <div className="mx-8 my-5 space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Account Search</h1>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-end">
        <div className="w-full md:w-1/2">
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            Account Number
          </label>
          <Input
            placeholder="Enter Account Number"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
          />
        </div>
        <Button
          onClick={handleSearch}
          className="bg-[#0284B2] hover:bg-[#026a8f] text-white"
        >
          <Search className="mr-2 h-4 w-4" /> Search Account
        </Button>
      </div>

      {hasSearched && (
        <div className="">
          <div className="mb-4">
            <h3 className="text-lg font-medium">Search Results</h3>
            {accountNumber && (
              <p className="text-sm text-gray-500">
                Results for: {accountNumber}
              </p>
            )}
          </div>
          {data.length > 0 ? (
            <AccountDetails data={data[0]} />
          ) : (
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center text-gray-500">
              No account found.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AccountSearchClient;
