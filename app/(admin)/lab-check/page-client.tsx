"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, RefreshCw, KeyRound, Mail } from "lucide-react";
import { ReprocessSsoResponse } from "./types";
import { toast } from "sonner";

// Mock Response
const MOCK_SUCCESS_RESPONSE: ReprocessSsoResponse = {
  data: [],
  isSuccessful: true,
  message: "Operation successful",
  code: "0",
};

const MOCK_FAILURE_RESPONSE: ReprocessSsoResponse = {
  data: [],
  isSuccessful: false,
  message: "User not found or operation failed",
  code: "99",
};

const ReprocessSsoClient = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ReprocessSsoResponse | null>(null);

  const handleReprocess = () => {
    if (!email.trim() || !password.trim()) {
      toast.error("Validation Error", {
        description: "Please enter both email and password.",
      });
      return;
    }

    setIsLoading(true);
    setResult(null);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Demo logic: Success for 'success@example.com' or generally valid inputs, fail for specific trigger
      if (email.toLowerCase().includes("fail")) {
        setResult(MOCK_FAILURE_RESPONSE);
        toast.error("Operation Failed", {
          description: MOCK_FAILURE_RESPONSE.message,
        });
      } else {
        setResult(MOCK_SUCCESS_RESPONSE);
        toast.success("Success", {
          description: "SSO Password reprocessed successfully.",
        });
      }
    }, 1500);
  };

  return (
    <div className="mx-8 my-5 space-y-6">
      <p className="text-gray-500">Reprocess user SSO password credentials.</p>

      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 max-w-lg mx-auto">
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <RefreshCw className="h-6 w-6 text-[#0284B2]" />
          </div>
          <h2 className="text-lg font-semibold text-gray-800">
            Reprocess SSO Password
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Enter the user&apos;s email and new password to reprocess their SSO
            credentials.
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                type="email"
                placeholder="user@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <KeyRound className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          <Button
            onClick={handleReprocess}
            disabled={isLoading || !email || !password}
            className="w-full bg-[#0284B2] hover:bg-[#026a8f] text-white h-11"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                Reprocessing...
              </>
            ) : (
              "Reprocess Credentials"
            )}
          </Button>
        </div>
      </div>

      {result && (
        <div
          className={`max-w-lg mx-auto p-4 rounded-lg border ${
            result.isSuccessful
              ? "bg-green-50 border-green-200 text-green-700"
              : "bg-red-50 border-red-200 text-red-700"
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-2 h-2 rounded-full ${
                result.isSuccessful ? "bg-green-500" : "bg-red-500"
              }`}
            ></div>
            <div>
              <p className="font-medium text-sm">{result.message}</p>
              <p className="text-xs opacity-80 mt-0.5">
                Response Code: {result.code}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReprocessSsoClient;
