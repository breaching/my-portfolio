"use client";

import { motion } from "framer-motion";

export interface FilterOption<T extends string> {
  value: T;
  label: string;
}

interface FilterTabsProps<T extends string> {
  options: FilterOption<T>[];
  value: T;
  onChange: (value: T) => void;
  layoutId?: string;
  showPrefix?: boolean;
}

export function FilterTabs<T extends string>({
  options,
  value,
  onChange,
  layoutId = "filter-indicator",
  showPrefix = true,
}: FilterTabsProps<T>) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 -mb-2 scrollbar-none">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`relative px-4 py-2 text-sm rounded-md transition-colors duration-200 overflow-hidden whitespace-nowrap flex-shrink-0 ${
            value === option.value
              ? "bg-text-primary text-background font-medium"
              : "text-text-secondary hover:text-text-primary hover:bg-background-elevated border border-accent-border"
          }`}
        >
          {value === option.value && (
            <motion.div
              layoutId={layoutId}
              className="absolute inset-0 bg-text-primary"
              transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
            />
          )}
          <span className="relative z-10">
            {value === option.value && showPrefix && "$ "}
            {option.label}
          </span>
        </button>
      ))}
    </div>
  );
}
