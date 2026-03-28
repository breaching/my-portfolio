"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { X, CaretLeft, CaretRight } from "@phosphor-icons/react";

export const demos = [
  { url: "boulangerie-martin.fr", path: "boulangerie" },
  { url: "bistrot-normand.fr", path: "restaurant" },
  { url: "studio-morel.fr", path: "architecte" },
  { url: "dupont-plomberie.fr", path: "plombier" },
] as const;

export function DemoGallery({
  initial,
  onClose,
}: {
  initial: number;
  onClose: () => void;
}) {
  const [current, setCurrent] = useState(initial);
  const total = demos.length;

  const go = useCallback(
    (dir: 1 | -1) => setCurrent((c) => (c + dir + total) % total),
    [total],
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose, go]);

  const card = demos[current];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] flex flex-col bg-black"
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 bg-[#111] border-b border-white/10 shrink-0">
        <div className="flex items-center gap-0.5 sm:gap-3 overflow-x-auto scrollbar-none">
          {demos.map((c, i) => (
            <button
              key={c.url}
              onClick={() => setCurrent(i)}
              className={`px-2 sm:px-3 py-1.5 rounded-md text-[11px] sm:text-xs font-medium transition-all whitespace-nowrap ${
                i === current
                  ? "bg-white/15 text-white"
                  : "text-white/40 hover:text-white/70 hover:bg-white/5"
              }`}
            >
              {c.url}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 shrink-0 ml-2">
          <Link
            href={`/demos/${card.path}`}
            target="_blank"
            className="hidden sm:block px-3 py-1.5 rounded-md text-xs font-medium text-white/60 hover:text-white hover:bg-white/10 transition-all"
          >
            Ouvrir dans un nouvel onglet
          </Link>
          <button
            onClick={onClose}
            className="p-2 rounded-md text-white/50 hover:text-white hover:bg-white/10 transition-all"
            aria-label="Fermer"
          >
            <X size={18} weight="bold" />
          </button>
        </div>
      </div>

      {/* Iframe container */}
      <div className="flex-1 relative">
        <button
          onClick={() => go(-1)}
          className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 z-10 p-3 sm:p-2.5 rounded-full bg-black/60 text-white/70 hover:bg-black/80 hover:text-white transition-all backdrop-blur-sm"
          aria-label="Précédent"
        >
          <CaretLeft size={20} weight="bold" />
        </button>
        <button
          onClick={() => go(1)}
          className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 z-10 p-3 sm:p-2.5 rounded-full bg-black/60 text-white/70 hover:bg-black/80 hover:text-white transition-all backdrop-blur-sm"
          aria-label="Suivant"
        >
          <CaretRight size={20} weight="bold" />
        </button>

        {/* Single iframe — remounts on switch so demo animations replay */}
        <iframe
          key={`${card.path}-${current}`}
          src={`/demos/${card.path}`}
          title={card.url}
          className="absolute inset-0 w-full h-full border-0"
        />
      </div>
    </motion.div>
  );
}
