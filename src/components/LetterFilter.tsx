"use client";

interface LetterFilterProps {
  selected: string;
  onSelect: (letter: string) => void;
  availableLetters: Set<string>;
}

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function LetterFilter({
  selected,
  onSelect,
  availableLetters,
}: LetterFilterProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {letters.map((letter) => {
        const disabled = !availableLetters.has(letter);
        return (
          <button
            key={letter}
            onClick={() => onSelect(letter)}
            disabled={disabled}
            className={`w-9 h-9 rounded-lg text-sm font-medium transition-all ${
              disabled
                ? "bg-gray-100 text-gray-300 border border-gray-200 cursor-not-allowed"
                : selected === letter
                  ? "bg-primary text-white shadow-md cursor-pointer"
                  : "bg-white text-foreground hover:bg-gray-100 border border-gray-200 cursor-pointer"
            }`}
          >
            {letter}
          </button>
        );
      })}
      <button
        onClick={() => onSelect("")}
        className={`px-4 h-9 rounded-lg text-sm font-medium transition-all ${
          selected === ""
            ? "bg-primary text-white shadow-md"
            : "bg-white text-foreground hover:bg-gray-100 border border-gray-200"
        }`}
      >
        Todos
      </button>
    </div>
  );
}
