"use client";

import { useState, useMemo } from "react";
import LetterFilter from "./LetterFilter";
import MineralCard from "./MineralCard";
import type { Mineral } from "@/lib/schema";

export default function MineralList({ minerals }: { minerals: Mineral[] }) {
  const [search, setSearch] = useState("");
  const [selectedLetter, setSelectedLetter] = useState("");

  const availableLetters = useMemo(() => {
    const set = new Set<string>();
    minerals.forEach((m) => {
      const first = m.name.charAt(0).toUpperCase();
      if (/[A-Z]/.test(first)) set.add(first);
    });
    return set;
  }, [minerals]);

  const filtered = useMemo(() => {
    return minerals.filter((m) => {
      const matchesSearch = m.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesLetter = selectedLetter
        ? m.name.toUpperCase().startsWith(selectedLetter)
        : true;
      return matchesSearch && matchesLetter;
    });
  }, [minerals, search, selectedLetter]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
        MINERAIS
      </h1>

      {/* Search + Letter filter */}
      <div className="flex flex-col md:flex-row md:items-start gap-4 mb-8">
        <div className="flex-1 overflow-x-auto">
          <LetterFilter
            selected={selectedLetter}
            onSelect={setSelectedLetter}
            availableLetters={availableLetters}
          />
        </div>
        <input
          type="text"
          placeholder="Buscar mineral..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-auto px-4 h-9 rounded-lg text-sm font-medium bg-white text-foreground border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent shrink-0"
        />
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
          {filtered.map((mineral) => (
            <MineralCard key={mineral.id} mineral={mineral} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-400">
          <p className="text-lg">Nenhum mineral encontrado.</p>
          <p className="text-sm mt-2">
            Tente buscar por outro nome ou letra.
          </p>
        </div>
      )}
    </div>
  );
}
