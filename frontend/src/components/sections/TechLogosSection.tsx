"use client";

import { motion } from "framer-motion";
import { Marquee } from "@/components/ui/Marquee";

const technologies = [
  { name: "React", logo: "⚛️" },
  { name: "Next.js", logo: "▲" },
  { name: "TypeScript", logo: "TS" },
  { name: "Tailwind CSS", logo: "🎨" },
  { name: "Vercel", logo: "▲" },
  { name: "Stripe", logo: "💳" },
  { name: "Supabase", logo: "⚡" },
  { name: "Node.js", logo: "🟢" },
];

function TechItem({ name, logo }: { name: string; logo: string }) {
  return (
    <div className="flex items-center gap-2.5 px-4 py-2 rounded-lg border border-accent-border bg-background-elevated/50 text-text-tertiary hover:text-text-primary hover:border-accent-action/30 transition-all duration-300 select-none">
      <span className="text-base opacity-60" aria-hidden="true">
        {logo}
      </span>
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
        <p className="text-center text-xs text-text-tertiary font-mono uppercase tracking-widest mb-8">
          Technologies maîtrisées
        </p>

        <div className="relative">
          {/* Gradient fade edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 sm:w-32 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 sm:w-32 bg-gradient-to-l from-background to-transparent" />

          <Marquee pauseOnHover className="[--duration:30s] [--gap:1rem]">
            {technologies.map((tech) => (
              <TechItem key={tech.name} name={tech.name} logo={tech.logo} />
            ))}
          </Marquee>
        </div>
      </motion.div>
    </section>
  );
}
