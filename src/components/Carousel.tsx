'use client';

import { useState, Children } from 'react';

const perPageItems = 4;

export default function Carousel({ children }: { children: React.ReactNode }) {
  const items = Children.toArray(children);
  const total = items.length;

  const [index, setIndex] = useState(0);

  const canPrev = index > 0;
  const canNext = index + perPageItems < total;

  const visible = items.slice(index, index + perPageItems);

  return (
    <div className="relative flex items-center gap-4">
      <button
        onClick={() => setIndex((i) => i - 1)}
        disabled={!canPrev}
        aria-label="Previous"
        className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full border border-zinc-200 text-zinc-400 transition-colors hover:border-zinc-400 hover:text-zinc-700 disabled:opacity-20 disabled:cursor-not-allowed"
      >
        ←
      </button>

      <div className="grid grid-cols-4 gap-4 flex-1">
        {visible}
      </div>

      <button
        onClick={() => setIndex((i) => i + 1)}
        disabled={!canNext}
        aria-label="Next"
        className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full border border-zinc-200 text-zinc-400 transition-colors hover:border-zinc-400 hover:text-zinc-700 disabled:opacity-20 disabled:cursor-not-allowed"
      >
        →
      </button>
    </div>
  );
}
