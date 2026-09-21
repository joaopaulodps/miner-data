"use client";

import Tooltip from "./Tooltip";

interface InfoRowProps {
  label: string;
  value: string;
  tip: string;
}

export default function InfoRow({ label, value, tip }: InfoRowProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 py-3 border-b border-gray-100 last:border-0">
      <span className="font-semibold text-sm text-gray-500 sm:w-48 shrink-0 flex items-center gap-1.5">
        {label}
        <Tooltip content={tip}>
          <svg
            className="w-4 h-4 text-gray-400 hover:text-primary transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
            <path
              strokeLinecap="round"
              strokeWidth="1.5"
              d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3M12 17h.01"
            />
          </svg>
        </Tooltip>
      </span>
      <span className="text-foreground">{value}</span>
    </div>
  );
}
