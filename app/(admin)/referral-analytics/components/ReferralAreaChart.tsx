"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface RangeData {
  range: string;
  count: number;
  fill: string;
}

interface ReferralAreaChartProps {
  data: RangeData[];
}

const ReferralAreaChart = ({ data }: ReferralAreaChartProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="p-6 h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#36A2EB" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#36A2EB" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={true}
              horizontal={true}
              stroke="#e5e7eb"
            />
            <XAxis dataKey="range" tick={{ fontSize: 12, fill: "#6b7280" }} />
            <YAxis tick={{ fontSize: 12, fill: "#6b7280" }} />
            <RechartsTooltip />
            <Legend verticalAlign="top" height={36} />
            <Area
              type="monotone"
              dataKey="count"
              name="Referral Count"
              stroke="#36A2EB"
              strokeWidth={3}
              activeDot={{ r: 6 }}
              fillOpacity={1}
              fill="url(#colorCount)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ReferralAreaChart;
