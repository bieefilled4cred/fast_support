import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  change?: string;
  isPositive?: boolean;
  icon: LucideIcon;
  color: string;
}

export function StatsCard({
  title,
  value,
  change,
  isPositive,
  icon: Icon,
  color,
}: StatsCardProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start justify-between">
      <div>
        <p className="text-gray-500 text-xs uppercase font-bold tracking-wider">
          {title}
        </p>
        <h3 className="text-2xl font-bold text-gray-900 mt-2">{value}</h3>
        {change && (
          <p
            className={`text-xs mt-2 font-medium ${
              isPositive ? "text-green-600" : "text-red-600"
            }`}
          >
            {isPositive ? "+" : ""}
            {change} since last hour
          </p>
        )}
      </div>
      <div className={`p-3 rounded-lg ${color}`}>
        <Icon className="w-5 h-5 text-white" />
      </div>
    </div>
  );
}
