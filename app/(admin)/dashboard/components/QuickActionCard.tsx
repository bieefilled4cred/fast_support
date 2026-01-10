import Link from "next/link";
import { LucideIcon, ArrowRight, ChevronRight } from "lucide-react";

interface QuickActionProps {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  colorClass: string; // e.g., "bg-blue-50 text-blue-600"
  compact?: boolean;
}

export function QuickActionCard({
  title,
  description,
  href,
  icon: Icon,
  colorClass,
  compact,
}: QuickActionProps) {
  if (compact) {
    return (
      <Link
        href={href}
        className="group flex items-center p-3 bg-white rounded-lg border border-gray-100 hover:border-[#0284B2] hover:shadow-sm transition-all"
      >
        <div
          className={`w-8 h-8 rounded-md flex items-center justify-center mr-3 ${colorClass} bg-opacity-50`}
        >
          <Icon className="w-4 h-4" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-gray-900 text-sm truncate group-hover:text-[#0284B2] transition-colors">
            {title}
          </h3>
          <p className="text-xs text-gray-400 truncate hidden sm:block">
            {description}
          </p>
        </div>
        <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-[#0284B2]" />
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className="group flex flex-col p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all hover:-translate-y-1"
    >
      <div
        className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${colorClass}`}
      >
        <Icon className="w-5 h-5" />
      </div>
      <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-[#0284B2] transition-colors">
        {title}
      </h3>
      <p className="text-sm text-gray-500 mb-4 flex-1">{description}</p>
      <div className="flex items-center text-xs font-bold text-gray-400 group-hover:text-[#0284B2] mt-auto">
        OPEN TOOL <ArrowRight className="w-3 h-3 ml-1" />
      </div>
    </Link>
  );
}
