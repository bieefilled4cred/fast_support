"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Loader2 } from "lucide-react";
import { ProfileTable } from "./components/ProfileTable";
import { ProfileRecord } from "./types";
import { useProfileSearchMutation } from "@/app/query-options/profileSearchQueryOption";

const ProfileSearchClient = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [profiles, setProfiles] = useState<ProfileRecord[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const profileSearchMutation = useProfileSearchMutation();

  const handleSearch = () => {
    if (!searchTerm.trim()) return;

    profileSearchMutation.mutate(searchTerm.trim(), {
      onSuccess: (response) => {
        setProfiles(response.data || []);
        setHasSearched(true);
      },
      onError: (error) => {
        console.error("Error searching profiles:", error);
        setProfiles([]);
        setHasSearched(true);
      },
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="mx-8 my-5 space-y-6">
      <p className="text-gray-500">View and managed profile search details.</p>

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
          disabled={!searchTerm.trim() || profileSearchMutation.isPending}
          className="bg-[#0284B2] hover:bg-[#026a8f] text-white w-full md:w-auto disabled:opacity-50"
        >
          {profileSearchMutation.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Searching...
            </>
          ) : (
            <>
              <Search className="mr-2 h-4 w-4" />
              Search Profile
            </>
          )}
        </Button>
      </div>

      {/* Error Message */}
      {profileSearchMutation.isError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          <p className="font-medium">Unable to load profiles</p>
          <p className="text-sm">Please try again.</p>
        </div>
      )}

      {hasSearched && !profileSearchMutation.isError && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-medium">Search Results</h3>
            <span className="text-sm text-gray-500">
              Found {profiles.length} results
            </span>
          </div>

          {profiles.length > 0 ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-100">
              <ProfileTable
                data={profiles}
                isLoading={profileSearchMutation.isPending}
              />
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
