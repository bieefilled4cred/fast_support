"use client";

import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { ArrowUpRight, TrendingUp, Users } from "lucide-react";

type TimeRange = "Day" | "Week" | "Month" | "Year";

// Mock Data Generators (simplified for brevity)
const generateData = (range: TimeRange, type: "users" | "transactions") => {
  if (type === "users") {
    switch (range) {
      case "Day":
        return [
          { name: "Mon", users: 120 },
          { name: "Tue", users: 145 },
          { name: "Wed", users: 132 },
          { name: "Thu", users: 156 },
          { name: "Fri", users: 189 },
          { name: "Sat", users: 204 },
          { name: "Sun", users: 198 },
        ];
      case "Week":
        return [
          { name: "Wk 1", users: 850 },
          { name: "Wk 2", users: 920 },
          { name: "Wk 3", users: 1100 },
          { name: "Wk 4", users: 1250 },
        ];
      case "Month": // Existing data
        return [
          { name: "Jan", users: 12400 },
          { name: "Feb", users: 14500 },
          { name: "Mar", users: 16800 },
          { name: "Apr", users: 18200 },
          { name: "May", users: 19500 },
          { name: "Jun", users: 20100 },
          { name: "Jul", users: 21500 },
          { name: "Aug", users: 22800 },
          { name: "Sep", users: 23400 },
          { name: "Oct", users: 24100 },
          { name: "Nov", users: 24500 },
          { name: "Dec", users: 25800 },
        ];
      case "Year":
        return [
          { name: "2021", users: 5400 },
          { name: "2022", users: 12800 },
          { name: "2023", users: 18900 },
          { name: "2024", users: 24500 },
          { name: "2025", users: 32100 },
        ];
    }
  } else {
    // Transactions
    switch (range) {
      case "Day":
        return [
          { name: "Mon", volume: 0.8 },
          { name: "Tue", volume: 1.2 },
          { name: "Wed", volume: 1.1 },
          { name: "Thu", volume: 1.5 },
          { name: "Fri", volume: 2.1 },
          { name: "Sat", volume: 1.8 },
          { name: "Sun", volume: 1.6 },
        ];
      case "Week":
        return [
          { name: "Wk 1", volume: 8.5 },
          { name: "Wk 2", volume: 9.2 },
          { name: "Wk 3", volume: 11.5 },
          { name: "Wk 4", volume: 12.8 },
        ];
      case "Month":
        return [
          { name: "Jan", volume: 12.5 },
          { name: "Feb", volume: 15.2 },
          { name: "Mar", volume: 18.8 },
          { name: "Apr", volume: 22.4 },
          { name: "May", volume: 21.5 },
          { name: "Jun", volume: 25.8 },
          { name: "Jul", volume: 28.2 },
          { name: "Aug", volume: 32.5 },
          { name: "Sep", volume: 35.8 },
          { name: "Oct", volume: 38.2 },
          { name: "Nov", volume: 42.5 },
          { name: "Dec", volume: 45.2 },
        ];
      case "Year":
        return [
          { name: "2021", volume: 120.5 },
          { name: "2022", volume: 250.2 },
          { name: "2023", volume: 380.8 },
          { name: "2024", volume: 450.4 },
          { name: "2025", volume: 580.6 },
        ];
    }
  }
  return [];
};

export const GrowthMetricsTab = () => {
  const [userGrowthRange, setUserGrowthRange] = useState<TimeRange>("Month");
  const [transactionRange, setTransactionRange] = useState<TimeRange>("Month");

  const userGrowthData = generateData(userGrowthRange, "users");
  const transactionData = generateData(transactionRange, "transactions");

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Users className="w-5 h-5 text-[#00afef]" />
                </div>
                User Growth
              </h3>
            </div>
            <TimeRangeSelector
              selected={userGrowthRange}
              onChange={setUserGrowthRange}
            />
          </div>

          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl font-bold text-gray-900">
              {(
                userGrowthData[userGrowthData.length - 1] as any
              )?.users.toLocaleString()}
            </span>
            <div className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-0.5 rounded-full text-xs font-medium">
              <TrendingUp className="w-3 h-3" />
              <span>+12.5%</span>
            </div>
          </div>

          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={userGrowthData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00afef" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#00afef" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f0f0f0"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9ca3af", fontSize: 12 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9ca3af", fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    borderRadius: "12px",
                    border: "1px solid #e5e7eb",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                  itemStyle={{ color: "#1f2937" }}
                  formatter={(value: any) => [value.toLocaleString(), "Users"]}
                />
                <Area
                  type="monotone"
                  dataKey="users"
                  stroke="#00afef"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorUsers)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Transaction Volume Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <div className="p-2 bg-purple-50 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                </div>
                Transaction Trends
              </h3>
            </div>
            <TimeRangeSelector
              selected={transactionRange}
              onChange={setTransactionRange}
            />
          </div>

          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl font-bold text-gray-900">
              ₦{(transactionData[transactionData.length - 1] as any)?.volume}M
            </span>
            <div className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-0.5 rounded-full text-xs font-medium">
              <ArrowUpRight className="w-3 h-3" />
              <span>+8.2%</span>
            </div>
          </div>

          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={transactionData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f0f0f0"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9ca3af", fontSize: 12 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9ca3af", fontSize: 12 }}
                />
                <Tooltip
                  cursor={{ fill: "#f9fafb" }}
                  contentStyle={{
                    backgroundColor: "#fff",
                    borderRadius: "12px",
                    border: "1px solid #e5e7eb",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                  itemStyle={{ color: "#1f2937" }}
                  formatter={(value: any) => [`₦${value}M`, "Volume"]}
                />
                <Bar
                  dataKey="volume"
                  fill="#8b5cf6"
                  radius={[4, 4, 0, 0]}
                  barSize={20}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

const TimeRangeSelector = ({
  selected,
  onChange,
}: {
  selected: TimeRange;
  onChange: (range: TimeRange) => void;
}) => {
  const ranges: TimeRange[] = ["Day", "Week", "Month", "Year"];
  return (
    <div className="flex items-center bg-gray-100/80 p-1 rounded-lg border border-gray-200">
      {ranges.map((range) => (
        <button
          key={range}
          onClick={() => onChange(range)}
          className={`px-3 py-1 text-xs font-medium rounded-md transition-all duration-200 ${
            selected === range
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-500 hover:text-gray-700 hover:bg-white/50"
          }`}
        >
          {range}
        </button>
      ))}
    </div>
  );
};
