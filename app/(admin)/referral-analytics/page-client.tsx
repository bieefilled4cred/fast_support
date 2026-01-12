"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import ReferralPieChart from "./components/ReferralPieChart";
import ReferralAreaChart from "./components/ReferralAreaChart";
import { ReferralTable, PaginatedResponse } from "./components/ReferralTable";
import {
  useReferralAnalyticsMutation,
  useProfilesByRangeMutation,
  generateRanges,
  // DEFAULT_RANGES,
} from "@/app/query-options/referralAnalyticsQueryOption";
import { ReferralProfile } from "@/app/types";
import { Skeleton } from "@/components/ui/skeleton";

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
  min: number;
  max: number;
}

// Map API user to table user format
interface TableUser {
  id: string;
  accountNumber: string;
  firstName: string;
  lastName: string;
  phone: string;
  referralCode: string;
  totalReferred: number;
}

const ReferralAnalyticsClient = () => {
  const [minVal, setMinVal] = useState<string>("0");
  const [maxVal, setMaxVal] = useState<string>("5");
  const [data, setData] = useState<RangeData[]>([]);
  const [selectedRange, setSelectedRange] = useState<{
    range: string;
    min: number;
    max: number;
  } | null>(null);
  const [profiles, setProfiles] = useState<TableUser[]>([]);
  const [profilesLoading, setProfilesLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const { mutate: fetchAnalytics, isPending: isAnalyticsLoading } =
    useReferralAnalyticsMutation();
  const { mutate: fetchProfiles, isPending: isProfilesLoading } =
    useProfilesByRangeMutation();

  // Auto-fetch on mount with default ranges
  useEffect(() => {
    handleGenerate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGenerate = () => {
    const min = parseInt(minVal) || 0;
    const max = parseInt(maxVal) || 5;
    if (max < min) {
      toast.error("Max value must be greater than or equal to min value");
      return;
    }

    const ranges = generateRanges(min, max);
    const payload = {
      isStaff: true,
      ranges: ranges,
    };
    console.log("payload", payload);

    fetchAnalytics(payload, {
      onSuccess: (response) => {
        // Response is array directly
        if (Array.isArray(response)) {
          const mappedData: RangeData[] = response.map((item, index) => {
            // Parse min/max from range string (e.g., "0-5" or ">59")
            let min = 0;
            let max = 0;
            if (item.range.startsWith(">")) {
              min = parseInt(item.range.substring(1)) + 1;
              max = min + 100; // Large number for "greater than" ranges
            } else {
              const parts = item.range.split("-");
              min = parseInt(parts[0]) || 0;
              max = parseInt(parts[1]) || 0;
            }
            return {
              range: item.range,
              count: item.count,
              fill: COLORS[index % COLORS.length],
              min,
              max,
            };
          });
          setData(mappedData);
          setSelectedRange(null);
          setProfiles([]);
        }
      },
      onError: (error) => {
        toast.error(error.message || "Failed to fetch referral analytics");
      },
    });
  };

  const handleRangeClick = (item: RangeData) => {
    setSelectedRange({ range: item.range, min: item.min, max: item.max });
    setProfilesLoading(true);
    setCurrentPage(1);

    fetchProfiles(
      { isStaff: true, min: item.min, max: item.max },
      {
        onSuccess: (response) => {
          const mappedProfiles: TableUser[] = (response.profiles || []).map(
            (profile: ReferralProfile) => ({
              id: profile.id,
              accountNumber: profile.accountNumber || "",
              firstName: profile.firstName || "",
              lastName: profile.lastName || "",
              phone: profile.phoneNumber || "",
              referralCode: profile.referralCode || "",
              totalReferred: profile.totalReferrals || 0,
            })
          );
          setProfiles(mappedProfiles);
          setProfilesLoading(false);
        },
        onError: (error) => {
          toast.error(error.message || "Failed to fetch profiles");
          setProfilesLoading(false);
          setProfiles([]);
        },
      }
    );
  };

  const tableData: PaginatedResponse<TableUser> = {
    data: {
      data: profiles,
      totalPages: 1,
      currentPage: currentPage,
      totalItems: profiles.length,
    },
  };

  return (
    <div className="mx-8 my-5 space-y-6">
      <p className="text-gray-500">
        View and manage referral analytics details.
      </p>
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
          disabled={isAnalyticsLoading}
          className="bg-primary hover:bg-primary/80 text-white px-8"
        >
          {isAnalyticsLoading ? "Loading..." : "Generate Ranges"}
        </Button>
      </div>

      {isAnalyticsLoading ? (
        <div className="flex items-center justify-center h-[400px] gap-4 lg:flex-row flex-col">
          <Skeleton className="h-[400px]" />
          <Skeleton className="h-[400px]" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pie Chart Section */}
          <ReferralPieChart data={data} />

          {/* Line/Area Chart Section */}
          <ReferralAreaChart data={data} />
        </div>
      )}

      {/* Range section */}
      <div className="mt-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Click on a range to view profiles
        </h3>
        <div className="flex flex-wrap gap-3">
          {data.map((item, index) => (
            <button
              key={index}
              onClick={() => handleRangeClick(item)}
              className={`px-4 py-2 rounded-md border text-sm font-medium transition-colors
                ${
                  selectedRange?.range === item.range
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
              Profiles in range: {selectedRange.range}
            </h3>
          </div>
          {profilesLoading ? (
            <Skeleton className="h-[400px]" />
          ) : (
            <ReferralTable
              data={tableData}
              isLoading={profilesLoading || isProfilesLoading}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
              onEdit={(user) => console.log("Edit user", user)}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default ReferralAnalyticsClient;
