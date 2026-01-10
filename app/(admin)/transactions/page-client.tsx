"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { TransactionsTable } from "./components/TransactionsTable";
import { TransactionRecord, TransactionResponse } from "./types";

// Mock Data
const MOCK_RESPONSE: TransactionResponse = {
  data: {
    data: [
      {
        id: "280c1b81-f71f-4ea6-9b50-19ee9d1c73d1",
        financialDate: "2026-01-07",
        transactionDate: "2026-01-07T14:35:44.25",
        accountNumber: "1000045768",
        accountName: "IBRAHIM OMOTAYO ABDULLAHI",
        branch: null,
        postedBy: null,
        approvedBy: null,
        postingReferenceNumber: "26010715294",
        debit: "10000.00",
        credit: "",
        narration: "Airtime Purchase",
        entryCode: "D-JRNL05",
        instrumentNumber: "3f9ea069abbc4d8d8ba582ad9a3f7eab",
        balance: "7731.00",
        accessLevel: 1,
        identifier: 464179,
        amount: "10000.00",
        charge: "0.00",
        merchant: "",
        transactionChannel: "OpenAPI",
        transactionStatus: "Successful",
      },
      {
        id: "7aa04b88-ef79-4283-9748-2cf60613aca0",
        financialDate: "2026-01-07",
        transactionDate: "2026-01-07T11:50:28.1066667",
        accountNumber: "1000045768",
        accountName: "IBRAHIM OMOTAYO ABDULLAHI",
        branch: null,
        postedBy: null,
        approvedBy: null,
        postingReferenceNumber: "26010710282",
        debit: "5375.00",
        credit: "",
        narration: "FIP:IBRAHIM OMOTAYO ABDULLAHI Gift",
        entryCode: "D-JRNL05",
        instrumentNumber: "d9235910b87a4822be38043692e4404e",
        balance: "17731.00",
        accessLevel: 1,
        identifier: 463561,
        amount: "5375.00",
        charge: "5375.00",
        merchant: "",
        transactionChannel: "OpenAPI",
        transactionStatus: "Successful",
      },
      {
        id: "a7bfc9a8-f8c6-4aad-bb33-92fe36cf509b",
        financialDate: "2026-01-07",
        transactionDate: "2026-01-07T11:50:25.5933333",
        accountNumber: "1000045768",
        accountName: "IBRAHIM OMOTAYO ABDULLAHI",
        branch: null,
        postedBy: null,
        approvedBy: null,
        postingReferenceNumber: "26010710282",
        debit: "22300000.00",
        credit: "",
        narration: "FIP:IBRAHIM OMOTAYO ABDULLAHI Gift",
        entryCode: "D-JRNL05",
        instrumentNumber: "d9235910b87a4822be38043692e4404e",
        balance: "23106.00",
        accessLevel: 1,
        identifier: 463560,
        amount: "22300000.00",
        charge: "5375.00",
        merchant: "",
        transactionChannel: "OpenAPI",
        transactionStatus: "Successful",
      },
      {
        id: "0e8f57ac-fe0a-45bd-ba51-a5d6b40750e3",
        financialDate: "2025-12-31",
        transactionDate: "2026-01-05T20:22:01.9366667",
        accountNumber: "1000045768",
        accountName: "IBRAHIM OMOTAYO ABDULLAHI",
        branch: null,
        postedBy: null,
        approvedBy: null,
        postingReferenceNumber: "E251231533762",
        debit: "66206.00",
        credit: "",
        narration:
          "Withholding Tax Deduction for 2025/12/31 - IBRAHIM OMOTAYO ABDULLAHI/1000045768",
        entryCode: "D-WHTP",
        instrumentNumber: "SP-1000045768-12/31/2025",
        balance: "22323106.00",
        accessLevel: 1,
        identifier: 453438,
        amount: "66206.00",
        charge: "0.00",
        merchant: null,
        transactionChannel: null,
        transactionStatus: "Successful",
      },
      {
        id: "1e77d36a-d90d-479c-bb33-4716b810bf4e",
        financialDate: "2025-12-31",
        transactionDate: "2026-01-05T20:22:01.9366667",
        accountNumber: "1000045768",
        accountName: "IBRAHIM OMOTAYO ABDULLAHI",
        branch: null,
        postedBy: null,
        approvedBy: null,
        postingReferenceNumber: "E251231533762",
        debit: "",
        credit: "662060.00",
        narration: "Savings Interest Received for 2025/12/31",
        entryCode: "C-CSIP",
        instrumentNumber: "SP-1000045768-12/31/2025",
        balance: "22389312.00",
        accessLevel: 1,
        identifier: 453437,
        amount: "662060.00",
        charge: "0.00",
        merchant: null,
        transactionChannel: null,
        transactionStatus: "Successful",
      },
    ],
    recordCount: 5,
  },
  status: true,
  message: "Request successful",
};

const TransactionsClient = () => {
  const [accountNumber, setAccountNumber] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [data, setData] = useState<TransactionRecord[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = () => {
    // In a real application, you would make an API call here using:
    // accountNumber, startDate, endDate
    // console.log("Searching for:", { accountNumber, startDate, endDate });

    // For now, we set the mock data
    setData(MOCK_RESPONSE.data.data);
    setHasSearched(true);
  };

  return (
    <div className="mx-8 my-5 space-y-6">
      <p className="text-gray-500">View and manage customer transactions.</p>

      {/* Search Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Account Number
            </label>
            <Input
              placeholder="Enter Account Number"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Start Date
            </label>
            <Input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              End Date
            </label>
            <Input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-end">
          <Button
            onClick={handleSearch}
            className="bg-[#0284B2] hover:bg-[#026a8f] text-white"
          >
            <Search className="mr-2 h-4 w-4" /> Search Transactions
          </Button>
        </div>
      </div>

      {/* Results Table */}
      {hasSearched && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <div className="mb-4">
            <h3 className="text-lg font-medium">
              Transaction History {accountNumber ? "for " + accountNumber : ""}
            </h3>
            {accountNumber && (
              <p className="text-sm text-gray-500">
                Showing results for account: {accountNumber}
              </p>
            )}
          </div>
          <TransactionsTable data={data} isLoading={false} />
        </div>
      )}
    </div>
  );
};

export default TransactionsClient;
