"use client";

import { motion } from "framer-motion";
import { Marquee } from "@/components/ui/Marquee";

const technologies = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Vercel",
  "Stripe",
  "Supabase",
  "Node.js",
];

function TechItem({ name }: { name: string }) {
  return (
    <div className="flex items-center gap-3 px-5 py-2.5 rounded-lg border border-accent-border bg-background-elevated/50 text-text-tertiary hover:text-text-primary hover:border-accent-action/30 transition-all duration-300 select-none">
      <span className="w-1.5 h-1.5 rounded-full bg-accent-action/50 shrink-0" />
      <span className="text-sm font-medium font-mono tracking-tight whitespace-nowrap">
        {name}
      </span>
    </div>
  );
}

export function TechLogosSection() {
  return (
    <section className="py-12 md:py-16 border-t border-accent-border overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-center text-xs text-text-tertiary font-mono uppercase tracking-widest mb-8 container-main">
          Technologies maîtrisées
        </p>

        <div className="relative">
          {/* Gradient fade edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 sm:w-40 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 sm:w-40 bg-gradient-to-l from-background to-transparent" />

          <Marquee pauseOnHover className="[--duration:30s] [--gap:1rem]">
            {technologies.map((tech) => (
              <TechItem key={tech} name={tech} />
            ))}
          </Marquee>
        </div>
      </motion.div>
    </section>
  );
}
