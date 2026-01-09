"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ReferralPieChart from "./components/ReferralPieChart";
import ReferralAreaChart from "./components/ReferralAreaChart";
import {
  ReferralTable,
  User,
  PaginatedResponse,
} from "./components/ReferralTable";

const COLORS = [
  "#FF6B8B",
  "#36A2EB",
  "#FFCE56",
  "#4BC0C0",
  "#9966FF",
  "#FF9F40",
  "#8E44AD",
  "#2ECC71",
  "#E74C3C",
  "#3498DB",
];

interface RangeData {
  range: string;
  count: number;
  fill: string;
}

const ReferralAnalyticsClient = () => {
  const [minVal, setMinVal] = useState<string>("0");
  const [maxVal, setMaxVal] = useState<string>("5");
  const [data, setData] = useState<RangeData[]>(generateMockData(0, 5));
  const [selectedRange, setSelectedRange] = useState<string | null>(null);

  function generateMockData(min: number, max: number): RangeData[] {
    const step = max - min + 1;
    const newData: RangeData[] = [];
    let currentMin = min;

    // Generate about 10 ranges with exponential decay for a realistic "referral" distribution
    // (Most people have few referrals, very few have many)
    let baseCount = 1100; // Starting high count

    for (let i = 0; i < 10; i++) {
      const currentMax = currentMin + step - 1;
      const label =
        i === 9 ? `>${currentMin - 1}` : `${currentMin}-${currentMax}`;

      // Random decay factor between 0.03 and 0.1 for the first drop, then slower
      const decay = i === 0 ? 1 : 0.05 + Math.random() * 0.05;
      const count =
        i === 0 ? baseCount : Math.floor(baseCount * decay * (1 / (i + 1)));

      if (i > 0 && count === 0) {
        // Ensure at least some small numbers for the tail
        newData.push({
          range: label,
          count: Math.floor(Math.random() * 5) + 1,
          fill: COLORS[i % COLORS.length],
        });
      } else {
        newData.push({
          range: label,
          count: Math.max(1, count), // Ensure at least 1
          fill: COLORS[i % COLORS.length],
        });
      }

      // Reset baseCount for next iteration to create a curve
      if (i === 0) baseCount = count;

      currentMin += step;
    }
    return newData;
  }

  const handleGenerate = () => {
    const min = parseInt(minVal) || 0;
    const max = parseInt(maxVal) || 0;
    if (max < min) return; // Simple validation
    setData(generateMockData(min, max));
    setSelectedRange(null);
  };

  return (
    <div className="mx-8 my-5 space-y-6">
      <div className="flex items-end gap-4 p-1">
        <div className="w-32">
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            Min
          </label>
          <Input
            type="number"
            value={minVal}
            onChange={(e) => setMinVal(e.target.value)}
            className="bg-white"
          />
        </div>
        <div className="w-32">
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            Max
          </label>
          <Input
            type="number"
            value={maxVal}
            onChange={(e) => setMaxVal(e.target.value)}
            className="bg-white"
          />
        </div>
        <Button
          onClick={handleGenerate}
          className="bg-[#198754] hover:bg-[#157347] text-white px-8"
        >
          Generate Ranges
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pie Chart Section */}
        <ReferralPieChart data={data} />

        {/* Line/Area Chart Section */}
        <ReferralAreaChart data={data} />
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Click on a range to view profiles
        </h3>
        <div className="flex flex-wrap gap-3">
          {data.map((item, index) => (
            <button
              key={index}
              onClick={() => setSelectedRange(item.range)}
              className={`px-4 py-2 rounded-md border text-sm font-medium transition-colors
                ${
                  selectedRange === item.range
                    ? "bg-gray-800 text-white border-gray-800"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}
            >
              {item.range} ({item.count})
            </button>
          ))}
        </div>
      </div>

      {selectedRange && (
        <div className="mt-6 flex flex-col space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-gray-900">
              Profiles in range: {selectedRange}
            </h3>
          </div>
          <ReferralTable
            data={
              mockTableData[selectedRange] || {
                data: {
                  data: generateMockUsers(Math.floor(Math.random() * 15) + 1), // Generate random number of users
                  totalPages: 1,
                  currentPage: 1,
                  totalItems: 10,
                },
              }
            }
            isLoading={false}
            currentPage={1}
            onPageChange={() => {}}
            onEdit={(user) => console.log("Edit user", user)}
          />
        </div>
      )}
    </div>
  );
};

// --- Mock Data Helpers ---
const emptyTableData: PaginatedResponse<User> = {
  data: { data: [], totalPages: 0, currentPage: 1, totalItems: 0 },
};

const mockTableData: Record<string, PaginatedResponse<User>> = {};

function generateMockUsers(count: number): User[] {
  return Array.from({ length: count }).map((_, i) => ({
    id: `user-${i}-${Math.random()}`,
    accountNumber: `20${Math.floor(Math.random() * 90000000 + 10000000)}`,
    firstName: [
      "John",
      "Jane",
      "Mike",
      "Sarah",
      "David",
      "Chris",
      "Amanda",
      "Daniel",
    ][Math.floor(Math.random() * 8)],
    lastName: [
      "Doe",
      "Smith",
      "Johnson",
      "Williams",
      "Brown",
      "Jones",
      "Miller",
      "Davis",
    ][Math.floor(Math.random() * 8)],
    phone: `080${Math.floor(Math.random() * 90000000 + 10000000)}`,
    referralCode: `REF-${Math.random()
      .toString(36)
      .substring(2, 8)
      .toUpperCase()}`,
    totalReferred: Math.floor(Math.random() * 50) + 1,
  }));
}
// Note: In a real app, we would fetch this data based on the selected range

export default ReferralAnalyticsClient;
