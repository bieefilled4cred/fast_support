"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import {
  DepositTable,
  PaginatedResponse,
  DepositRecord,
} from "./components/DepositTable";

// Mock Data from Request
const MOCK_DATA: PaginatedResponse<DepositRecord> = {
  currentPage: 1,
  pageSize: 20,
  totalRecords: 4076,
  totalPages: 204,
  data: [
    {
      id: "b60723cb3db64b8b9bedeb3e720f4ea3",
      profileId: "42d3cf86e8c94cc8b0ec8fb733939b13",
      dateMonth: "2025-07",
      totalDepositAmount: 6195950.04,
      fullName: "OMOTAYO ABDULLAHI IBRAHIM",
      accountNumber: "1000045768",
      phoneNumber: "2348102796273",
      referralCode: "OSEZOZ",
    },
    {
      id: "f56aaff7ca2b446b8023cb8587e204e2",
      profileId: "ef930b1064f9418da23a946598d71dff",
      dateMonth: "2025-07",
      totalDepositAmount: 6108061.76,
      fullName: "PETRA ONYEGBULE",
      accountNumber: "1000059392",
      phoneNumber: "2348133456557",
      referralCode: "GVJIAP",
    },
    {
      id: "03d33f71914848ccb9ef1e2809130249",
      profileId: "8ef8b9d8e6e04883bd99e14714103df1",
      dateMonth: "2025-07",
      totalDepositAmount: 2289395.9,
      fullName: "ADEOLA  MARY ADELEKE",
      accountNumber: "1000046095",
      phoneNumber: "2348066471556",
      referralCode: "P35ZUP",
    },
    {
      id: "7f0f2878de78478ebd693f732f54b330",
      profileId: "97391710a8014f13ae1cec0803483895",
      dateMonth: "2025-07",
      totalDepositAmount: 1821174.73,
      fullName: "ZAINAB DOLAPO ADELAKUN",
      accountNumber: "1000060114",
      phoneNumber: "08135377182",
      referralCode: "IO3W6E",
    },
    {
      id: "a939cf212f7049d0ba5dc2e2941030e8",
      profileId: "57c896818ab24caeb769bd6a407bdff5",
      dateMonth: "2025-07",
      totalDepositAmount: 1229557.16,
      fullName: "ITORO OLADOKUN",
      accountNumber: "1000059543",
      phoneNumber: "2348146461844",
      referralCode: "KGXWI1",
    },
    {
      id: "bdeada5c75ba4d2794727a96ce5ef560",
      profileId: "df8a814c56b54374ab593b32ee5e4180",
      dateMonth: "2025-07",
      totalDepositAmount: 1080498.09,
      fullName: "ABOSEDE  IYABO OSUNGBESAN",
      accountNumber: "1000045665",
      phoneNumber: "07062170195",
      referralCode: "MSHRKX",
    },
    {
      id: "9e87b8c8c5344eeea62c7977a636e693",
      profileId: "af4d39e51afe483882700c0565af5a6d",
      dateMonth: "2025-07",
      totalDepositAmount: 989538.08,
      fullName: "CHINONSO OJOGBUE",
      accountNumber: "1000059495",
      phoneNumber: "2348089993062",
      referralCode: "Y8UVAX",
    },
    {
      id: "0d8c4e51b2784408a1839c27c41cecf8",
      profileId: "33ec2f2ba0b44844822c0119ddda0441",
      dateMonth: "2025-07",
      totalDepositAmount: 933387.29,
      fullName: "IZUCHUKWU OKAFOR",
      accountNumber: "1000059385",
      phoneNumber: "2348167363997",
      referralCode: "ROMI9E",
    },
    {
      id: "53e09c2c4302478c865b007a89579d80",
      profileId: "e0cc26cff77e4ecc97dbba4da1991ecd",
      dateMonth: "2025-07",
      totalDepositAmount: 810622.64,
      fullName: "Elizabeth Folorunsho",
      accountNumber: "1000081782",
      phoneNumber: "08033695141",
      referralCode: "L9M8J9",
    },
    {
      id: "1cfbabb5966a44f3bc87b01ae7786312",
      profileId: "15eb4d8afe694d16b4f7dd04484d8df6",
      dateMonth: "2025-07",
      totalDepositAmount: 731927.83,
      fullName: "Oko-Otu Chukwuemeka",
      accountNumber: "1000059866",
      phoneNumber: "08100330277",
      referralCode: "C0GVY4",
    },
    {
      id: "a365c723a685419f97519c24e06fd30e",
      profileId: "5729f504e45a4fef8ed1141b535fba15",
      dateMonth: "2025-07",
      totalDepositAmount: 699495.19,
      fullName: "Busayomi Adebisi",
      accountNumber: "1000080118",
      phoneNumber: "07089204598",
      referralCode: "VFYZYL",
    },
    {
      id: "780e81e0aaf247ad956281d0145d6635",
      profileId: "01eebd7c12c541219f0e137883761734",
      dateMonth: "2025-07",
      totalDepositAmount: 664773.34,
      fullName: "SAMUEL ADEYEMI",
      accountNumber: "1000060334",
      phoneNumber: "2348030770668",
      referralCode: "THC1O0",
    },
    {
      id: "66874c06e39142198089a465076e3d69",
      profileId: "35cbce1e56324060b3d7625d67ba1d25",
      dateMonth: "2025-07",
      totalDepositAmount: 660145.01,
      fullName: "SALWA GAMBAZAI",
      accountNumber: "1000059464",
      phoneNumber: "2348023443603",
      referralCode: "K2VA1T",
    },
    {
      id: "5fa4510a19d641b2ae0940a262b9c40d",
      profileId: "ad2ef2ec0b014a23a1fdc01a28683dbd",
      dateMonth: "2025-07",
      totalDepositAmount: 569452.78,
      fullName: "OLUSINA FLORENCE OGUNYAMOJU",
      accountNumber: "1000045933",
      phoneNumber: "2348056233374",
      referralCode: "ORPGRQ",
    },
    {
      id: "f8531b2c78e54d5bb151b6af1a678819",
      profileId: "ae828222ac3d44f9984abac83f955f55",
      dateMonth: "2025-07",
      totalDepositAmount: 546365.98,
      fullName: "Joseph Onemola",
      accountNumber: "",
      phoneNumber: "_07039891332",
      referralCode: "LQMODR",
    },
    {
      id: "361ddb20a95a4153a7b6bb8371673e11",
      profileId: "bf63d08a7d4441d690c5e70d915a90d3",
      dateMonth: "2025-07",
      totalDepositAmount: 516685.13,
      fullName: "LAWRITA- MARY  EBERE CHIKEKA",
      accountNumber: "1000045775",
      phoneNumber: "2348124124226",
      referralCode: "WEJON3",
    },
    {
      id: "3f23b39307ce427ca1f4fd5c3a1f1a9c",
      profileId: "589a6afbb2744678bdd5f1dd581a6462",
      dateMonth: "2025-07",
      totalDepositAmount: 501967.47,
      fullName: "JIDE QUADRI",
      accountNumber: "1000056872",
      phoneNumber: "2347034570000",
      referralCode: "Z5DLSG",
    },
    {
      id: "da7adb237cb4494e8d76040ab1826799",
      profileId: "3fd7e03864464f6188cc9d82a4cd35d3",
      dateMonth: "2025-07",
      totalDepositAmount: 463897.64,
      fullName: "KOFOWOROLA OLATOYOSI DISU",
      accountNumber: "1000045854",
      phoneNumber: "2348159432850",
      referralCode: "RWTRY8",
    },
    {
      id: "5f01f4f4f46e4f0fa817a659d415c018",
      profileId: "5ce4e5f2dcd94f93813402a271a441db",
      dateMonth: "2025-07",
      totalDepositAmount: 352827.95,
      fullName: "OLUWASEGUN DOYIN AWODEKO",
      accountNumber: "1000045861",
      phoneNumber: "2348062757988",
      referralCode: "AT54XQ",
    },
    {
      id: "0cb30e7285e648cd9508c130e32ce752",
      profileId: "e870d2ef12134997965045a8e0bf0c63",
      dateMonth: "2025-07",
      totalDepositAmount: 319647.27,
      fullName: "AMAKIEVI LAMBERT",
      accountNumber: "1000059983",
      phoneNumber: "2349066865488",
      referralCode: "UYHD9S",
    },
  ],
};

const DepositAnalyticsClient = () => {
  const [data, setData] = useState<PaginatedResponse<DepositRecord>>(MOCK_DATA);
  const [currentPage, setCurrentPage] = useState(1);

  const handleDownload = () => {
    // Generate CSV content
    const headers = [
      "Full Name",
      "Account Number",
      "Phone Number",
      "Total Deposit",
      "Referral Code",
      "Date",
    ];
    const csvRows = [headers.join(",")];

    data.data.forEach((row) => {
      csvRows.push(
        [
          `"${row.fullName}"`,
          `"${row.accountNumber || ""}"`,
          `"${row.phoneNumber}"`,
          row.totalDepositAmount,
          `"${row.referralCode}"`,
          `"${row.dateMonth}"`,
        ].join(",")
      );
    });

    const csvContent = "data:text/csv;charset=utf-8," + csvRows.join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "deposit_analytics.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="mx-8 my-5 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">
          {/* Deposit Analytics */}
        </h1>
        <Button
          onClick={handleDownload}
          className="bg-[#198754] hover:bg-[#157347] text-white flex items-center gap-2"
        >
          <Download size={16} />
          Export to Excel
        </Button>
      </div>

      <div className="">
        <DepositTable
          data={data}
          isLoading={false}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default DepositAnalyticsClient;
