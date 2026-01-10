"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface RangeData {
  range: string;
  count: number;
  fill: string;
  [key: string]: any;
}

interface ReferralPieChartProps {
  data: RangeData[];
}

const ReferralPieChart = ({ data }: ReferralPieChartProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="p-6 flex flex-col items-center justify-center h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <RechartsTooltip />
            <Legend
              layout="horizontal"
              verticalAlign="top"
              align="center"
              wrapperStyle={{ paddingBottom: "20px" }}
            />
            <Pie
              data={data}
              dataKey="count"
              nameKey="range"
              cx="50%"
              cy="50%"
              outerRadius={120}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ReferralPieChart;
