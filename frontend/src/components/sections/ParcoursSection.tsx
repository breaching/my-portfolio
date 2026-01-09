"use client";

import { motion } from "framer-motion";
import { timeline, skills } from "@/data/posts";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

export function ParcoursSection() {
  return (
    <section id="parcours" className="section border-t border-accent-border">
      <motion.div {...fadeIn}>
        <h2 className="text-3xl font-light tracking-[-0.02em] mb-4">
          Parcours
        </h2>
        <p className="text-text-secondary prose-width leading-relaxed mb-12">
          Profil autodidacte fort en compétences. Pas de diplôme
          d&apos;ingénieur, mais des projets réels et une compréhension
          technique solide.
        </p>

        <div className="grid lg:grid-cols-5 gap-16">
          {/* Timeline */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-medium text-text-tertiary uppercase tracking-[0.08em] mb-8">
              Expérience
            </h3>
            <div className="space-y-6">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="relative pl-6 sm:pl-0 sm:grid sm:grid-cols-[120px_24px_1fr] sm:gap-x-2 sm:items-start"
                >
                  {/* Mobile: vertical line */}
                  <div className="absolute left-0 top-1.5 bottom-0 w-px bg-accent-border sm:hidden" />

                  {/* Mobile: dot */}
                  <motion.span
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.2, duration: 0.3, type: "spring" }}
                    className="absolute left-[-4px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-accent-primary bg-background sm:hidden"
                  />

                  {/* Date */}
                  <div className="text-xs sm:text-sm text-text-tertiary font-mono tabular-nums whitespace-nowrap mb-1 sm:mb-0 sm:text-right sm:pr-2 sm:pt-0.5">
                    {item.period}
                  </div>

                  {/* Desktop: Timeline dot + line */}
                  <div className="hidden sm:flex flex-col items-center">
                    <motion.span
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.2, duration: 0.3, type: "spring" }}
                      className="w-3 h-3 rounded-full border-2 border-accent-primary bg-background flex-shrink-0"
                    />
                    <div className="w-px flex-1 bg-accent-border mt-2" />
                  </div>

                  {/* Content */}
                  <div className="pb-6">
                    <h4 className="font-medium tracking-[-0.01em]">
                      {item.title}
                    </h4>
                    <p className="text-sm text-text-secondary">{item.subtitle}</p>
                    <p className="text-sm text-text-secondary leading-relaxed mt-2">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-medium text-text-tertiary uppercase tracking-[0.08em] mb-8">
              Compétences
            </h3>
            <div className="space-y-8">
              {Object.entries(skills).map(([category, items], catIndex) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: catIndex * 0.1 }}
                >
                  <h4 className="text-sm font-medium mb-4 tracking-[-0.01em] font-mono">
                    <span className="text-text-tertiary opacity-60">//</span>{" "}
                    {category}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {items.map((skill, skillIndex) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: catIndex * 0.1 + skillIndex * 0.05,
                        }}
                        className="px-3 py-1.5 text-sm text-text-secondary bg-background-elevated rounded-md border border-accent-border hover:border-text-tertiary/30 hover:text-text-primary transition-colors cursor-default"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
