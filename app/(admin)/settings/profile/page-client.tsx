"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useQuery } from "@tanstack/react-query";
import { Play, X, Loader2 } from "lucide-react";
import Link from "next/link";
import { getAuthenticatedUserQueryOptions } from "@/app/query-options/usersQueryOption";
import { Application } from "@/app/types";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { AvatarImage } from "@/components/ui/avatar";

export default function ProfileSettingsPageClient() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    phoneNumber: "",
  });

  const { data: authenticatedUser, isLoading } = useQuery(
    getAuthenticatedUserQueryOptions()
  );

  const user = authenticatedUser?.data;

  React.useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        role: user.roles?.[0] || "",
        phoneNumber: user.phoneNumber || "",
      });
    }
  }, [user]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleUpdate = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mb-4 sm:mb-6 lg:mb-8 w-full bg-white px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="mb-3 sm:mb-4 lg:mb-6">
          <Breadcrumb>
            <BreadcrumbList className=" font-medium text-xs sm:text-sm lg:text-base">
              <BreadcrumbItem className="text-[#A9A9A9]">
                <BreadcrumbLink
                  href="/dashboard"
                  className="hover:text-gray-700"
                >
                  Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <Play className="text-[#CCCCCC] h-2 w-2 sm:h-3 sm:w-3 lg:h-4 lg:w-4" />
              </BreadcrumbSeparator>
              <BreadcrumbItem className="text-[#A9A9A9]">
                <BreadcrumbLink href="#" className="hover:text-gray-700">
                  Settings
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <Play className="text-[#CCCCCC] h-2 w-2 sm:h-3 sm:w-3 lg:h-4 lg:w-4" />
              </BreadcrumbSeparator>
              <BreadcrumbItem className="text-[#464646]">
                <BreadcrumbPage>Profile</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="mb-4 sm:mb-6 lg:mb-8">
          <h1 className="text-base sm:text-lg lg:text-xl font-bold text-[#464646] ">
            Settings
          </h1>
        </div>

        <div className="flex flex-row gap-2 sm:gap-4 lg:gap-8">
          <Link
            href="/settings/profile"
            className=" px-3 sm:px-4 py-2 rounded-none border-b-2 border-[#04B2F1] text-[#04B2F1] transition-colors text-xs sm:text-sm whitespace-nowrap"
          >
            Profile
          </Link>
          <Link
            href="/settings/security"
            className=" px-3 sm:px-4 py-2 rounded-none border-b-2 border-transparent text-gray-500 hover:text-gray-700 transition-colors text-xs sm:text-sm whitespace-nowrap"
          >
            Security
          </Link>
        </div>
      </div>

      <div className="space-y-4 sm:space-y-6 bg-white px-4 sm:px-6 lg:px-8 pb-4 sm:pb-6">
        {isLoading ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <Loader2 className="w-8 h-8 animate-spin text-[#0284B2]" />
          </div>
        ) : (
          <>
            <Card className="shadow-none border-0">
              <CardContent className="p-4 pl-0! pt-0! sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold text-[#464646]  mb-3 sm:mb-4">
                  Your Profile Picture
                </h3>

                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
                  <div className="relative shrink-0">
                    <Avatar>
                      <AvatarImage
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${authenticatedUser?.data.firstName}`}
                        className="rounded-full bg-primary w-24 h-24"
                      />
                      <AvatarFallback className="rounded-full bg-primary">
                        {authenticatedUser?.data.firstName?.[0]}
                        {authenticatedUser?.data.lastName?.[0]}
                      </AvatarFallback>
                    </Avatar>
                  </div>

                  <div className="flex-1 text-center sm:text-left">
                    <h4 className="text-lg sm:text-xl font-bold text-[#464646]  mb-2">
                      {user?.firstName} {user?.lastName}
                    </h4>
                    <div className="space-y-1 text-xs sm:text-sm text-[#464646] ">
                      <p>Role: {user?.roles?.[0] || "N/A"}</p>
                      {user?.apps &&
                        Array.isArray(user.apps) &&
                        user.apps.length > 0 && (
                          <div className="mt-2">
                            <p className="mb-1">Apps:</p>
                            <div className="flex flex-wrap gap-1">
                              {user.apps
                                .filter(
                                  (app): app is Application =>
                                    app !== null &&
                                    typeof app === "object" &&
                                    "name" in app &&
                                    "appId" in app
                                )
                                .map((app, index) => (
                                  <span
                                    key={app.appId || index}
                                    className="inline-block bg-[#E3F2FD] text-[#0284B2] px-2 py-1 rounded-full text-xs font-medium"
                                  >
                                    {app.name}
                                  </span>
                                ))}
                            </div>
                          </div>
                        )}
                      <p className="mt-2">
                        Last seen:{" "}
                        {new Date().toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-none border-0">
              <CardContent className="py-4 sm:p-6 p-0!">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-3 sm:space-y-4">
                    <div>
                      <Label className="text-xs sm:text-sm font-medium text-[#464646] ">
                        First Name
                      </Label>
                      <input
                        type="text"
                        value={user?.firstName || "N/A"}
                        disabled
                        className="w-full h-12 sm:h-14 pt-3 sm:pt-4 pr-3 pb-3 sm:pb-4 pl-3 border border-gray-300 rounded-lg  text-[#A9A9A9] text-sm sm:text-base bg-gray-50 mt-3"
                      />
                    </div>

                    <div>
                      <Label className="text-xs sm:text-sm font-medium text-[#464646] ">
                        Role
                      </Label>
                      <input
                        type="text"
                        value={user?.roles?.[0] || "N/A"}
                        disabled
                        className="w-full h-12 sm:h-14 pt-3 sm:pt-4 pr-3 pb-3 sm:pb-4 pl-3 border border-gray-300 rounded-lg  text-[#A9A9A9] text-sm sm:text-base bg-gray-50 mt-3"
                      />
                    </div>

                    <div>
                      <Label className="text-xs sm:text-sm font-medium text-[#464646] ">
                        Email Address
                      </Label>
                      <input
                        type="email"
                        value={user?.email || "N/A"}
                        disabled
                        className="w-full h-12 sm:h-14 pt-3 sm:pt-4 pr-3 pb-3 sm:pb-4 pl-3 border border-gray-300 rounded-lg  text-[#A9A9A9] text-sm sm:text-base bg-gray-50 break-all mt-3"
                      />
                    </div>
                  </div>

                  <div className="space-y-3 sm:space-y-4">
                    <div>
                      <Label className="text-xs sm:text-sm font-medium text-[#464646] ">
                        Last Name
                      </Label>
                      <input
                        type="text"
                        value={user?.lastName || "N/A"}
                        disabled
                        className="w-full h-12 sm:h-14 pt-3 sm:pt-4 pr-3 pb-3 sm:pb-4 pl-3 border border-gray-300 rounded-lg  text-[#A9A9A9] text-sm sm:text-base bg-gray-50 mt-3"
                      />
                    </div>

                    <div>
                      <Label className="text-xs sm:text-sm font-medium text-[#464646] ">
                        Phone Number
                      </Label>
                      <input
                        type="text"
                        value={user?.phoneNumber || "N/A"}
                        disabled
                        className="w-full h-12 sm:h-14 pt-3 sm:pt-4 pr-3 pb-3 sm:pb-4 pl-3 border border-gray-300 rounded-lg  text-[#A9A9A9] text-sm sm:text-base bg-gray-50 mt-3"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6 sm:mt-8 flex justify-center sm:justify-start">
                  <Button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-primary hover:bg-primary  /90 text-white  px-4 sm:px-6 h-12 sm:h-14 rounded-[4px] text-sm sm:text-base w-full sm:w-auto"
                  >
                    Edit Information
                  </Button>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-xs sm:max-w-md lg:max-w-2xl mx-4 sm:mx-0">
          <DialogHeader className="relative">
            <DialogTitle className="text-lg sm:text-xl font-bold text-[#464646] ">
              Edit Information
            </DialogTitle>
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-0 right-0 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
            </button>
          </DialogHeader>

          <div className="space-y-4 sm:space-y-6 mt-4 sm:mt-6">
            <div className="space-y-3 sm:space-y-4">
              <div>
                <Label
                  htmlFor="modal-name"
                  className="text-xs sm:text-sm font-medium text-[#464646] "
                >
                  Name
                </Label>
                <input
                  type="text"
                  id="modal-name"
                  value={`${formData.firstName} ${formData.lastName}`}
                  onChange={(e) => {
                    const names = e.target.value.split(" ");
                    handleInputChange("firstName", names[0] || "");
                    handleInputChange(
                      "lastName",
                      names.slice(1).join(" ") || ""
                    );
                  }}
                  className="w-full h-12 sm:h-14 pt-3 sm:pt-4 pr-3 pb-3 sm:pb-4 pl-3 border border-gray-300 rounded-lg focus:border-blue-500 text-gray-900 mt-3 text-sm sm:text-base"
                />
              </div>

              <div>
                <Label
                  htmlFor="modal-email"
                  className="text-xs sm:text-sm font-medium text-[#464646] "
                >
                  Email Address
                </Label>
                <input
                  type="email"
                  id="modal-email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="w-full h-12 sm:h-14 pt-3 sm:pt-4 pr-3 pb-3 sm:pb-4 pl-3 border border-gray-300 rounded-lg text-gray-900 mt-3 text-sm sm:text-base"
                />
              </div>

              <div>
                <Label
                  htmlFor="modal-role"
                  className="text-xs sm:text-sm font-medium text-[#464646] "
                >
                  Role
                </Label>
                <Select>
                  <SelectTrigger className="w-full h-[56px]! sm:h-14 px-3 border border-gray-300 rounded-lg text-gray-900 mt-3">
                    <SelectValue placeholder="Select Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="IT Support">IT Support</SelectItem>
                    <SelectItem value="Support Team">Support Team</SelectItem>
                    <SelectItem value="Super Admin">Super Admin</SelectItem>
                    <SelectItem value="KYC Initiator">KYC Initiator</SelectItem>
                    <SelectItem value="KYC Supervisor">
                      KYC Supervisor
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label
                  htmlFor="modal-phone"
                  className="text-xs sm:text-sm font-medium text-[#464646] "
                >
                  Phone Number
                </Label>
                <input
                  type="text"
                  id="modal-phone"
                  value={formData.phoneNumber}
                  onChange={(e) =>
                    handleInputChange("phoneNumber", e.target.value)
                  }
                  className="w-full h-12 sm:h-14 pt-3 sm:pt-4 pr-3 pb-3 sm:pb-4 pl-3 border border-gray-300 rounded-lg focus:border-blue-500 text-gray-900 mt-3 text-sm sm:text-base"
                />
              </div>
            </div>

            <div className="flex justify-center sm:justify-end pt-2 sm:pt-4">
              <Button
                onClick={handleUpdate}
                className="bg-primary hover:bg-primary  /90 text-white  px-6 sm:px-8 h-12 sm:h-14 rounded-lg text-sm sm:text-base w-full sm:w-auto"
              >
                Update Information
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
