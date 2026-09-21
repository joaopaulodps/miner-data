"use client";

import Link from "next/link";
import Image from "next/image";
import type { Mineral } from "@/lib/schema";

export default function MineralCard({ mineral }: { mineral: Mineral }) {
  return (
    <Link
      href={`/mineral/${mineral.slug}`}
      className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden group"
    >
      <div className="relative aspect-square bg-gray-100">
        <Image
          src={mineral.imageUrl || "/logo.png"}
          alt={mineral.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          loading="eager"
        />
      </div>
      <div className="p-3 text-center">
        <h3 className="font-semibold text-foreground truncate">
          {mineral.name}
        </h3>
        <p className="text-sm text-gray-500 font-mono">{mineral.formula}</p>
      </div>
    </Link>
  );
}
