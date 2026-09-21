"use client";

import { useState } from "react";

export default function Tooltip({
  children,
  content,
}: {
  children: React.ReactNode;
  content: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <span className="relative inline-flex items-center">
      <span
        className="cursor-help"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onClick={() => setOpen((prev) => !prev)}
      >
        {children}
      </span>
      {open && (
        <span className="absolute bottom-full left-0 mb-2 w-60 px-3 py-2 text-xs text-white bg-gray-800 rounded-lg shadow-lg z-10 text-left leading-relaxed">
          {content}
          <span className="absolute top-full left-3 border-4 border-transparent border-t-gray-800" />
        </span>
      )}
    </span>
  );
}
