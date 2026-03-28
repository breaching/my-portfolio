"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface FlipWordsProps {
  words: string[];
  duration?: number;
  className?: string;
  /** When provided, overrides internal cycling — component becomes controlled */
  activeIndex?: number;
}

export function FlipWords({
  words,
  duration = 3000,
  className = "",
  activeIndex,
}: FlipWordsProps) {
  const [internalIndex, setInternalIndex] = useState(0);
  const controlled = activeIndex !== undefined;
  const index = controlled ? activeIndex % words.length : internalIndex;

  const next = useCallback(() => {
    setInternalIndex((prev) => (prev + 1) % words.length);
  }, [words.length]);

  useEffect(() => {
    if (controlled) return;
    const interval = setInterval(next, duration);
    return () => clearInterval(interval);
  }, [next, duration, controlled]);

  return (
    <span className={`inline-grid relative ${className}`} style={{ minHeight: "1.2em" }}>
      {/* Invisible sizer: renders the longest word to reserve width */}
      <span className="invisible col-start-1 row-start-1" aria-hidden="true">
        {words.reduce((a, b) => (a.length >= b.length ? a : b))}
      </span>
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="col-start-1 row-start-1"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
