"use client";

import { useState, Children } from "react";

const PER_PAGE = 4;

export default function Carousel({ children }: { children: React.ReactNode }) {
  const items = Children.toArray(children);
  const [index, setIndex] = useState(0);

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={() => setIndex((i) => i - 1)}
        disabled={index === 0}
        aria-label="Previous"
        className="flex-shrink-0 w-10 h-10 rounded-full border border-zinc-200 text-zinc-400 hover:border-zinc-400 hover:text-zinc-700 disabled:cursor-not-allowed disabled:opacity-20"
      >
        ←
      </button>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 flex-1">
        {items.slice(index, index + PER_PAGE)}
      </div>

      <button
        onClick={() => setIndex((i) => i + 1)}
        disabled={index + PER_PAGE >= items.length}
        aria-label="Next"
        className="flex-shrink-0 w-10 h-10 rounded-full border border-zinc-200 text-zinc-400 hover:border-zinc-400 hover:text-zinc-700 disabled:cursor-not-allowed disabled:opacity-20"
      >
        →
      </button>
    </div>
  );
}
