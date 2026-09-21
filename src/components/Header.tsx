"use client";

import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-nav-bg text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="h-full py-2">
            <Image
              src="/logo-alt.png"
              alt="MinerData"
              width={100}
              height={64}
              className="h-full w-auto"
            />
          </Link>

          <Link
            href="/login"
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            title="Área administrativa"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </Link>
        </div>
      </div>
    </header>
  );
}
