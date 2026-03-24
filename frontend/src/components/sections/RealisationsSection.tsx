"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, EnvelopeSimple } from "@phosphor-icons/react";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const clarmindStack = [
  "Next.js",
  "React",
  "Supabase",
  "Stripe",
  "TypeScript",
  "Tailwind",
];

function scrollToContact() {
  const section = document.getElementById("contact");
  if (section) {
    const offsetTop = section.offsetTop - 80;
    window.scrollTo({ top: offsetTop, behavior: "smooth" });
  }
}

export function RealisationsSection() {
  return (
    <section
      id="realisations"
      className="section border-t border-accent-border"
    >
      <motion.div {...fadeIn}>
        <h2 className="text-3xl font-light tracking-[-0.02em] mb-4">
          Ce que je construis.
        </h2>
        <p className="text-text-secondary prose-width leading-relaxed mb-12">
          Projets réels, en production, utilisés par de vrais utilisateurs.
        </p>
      </motion.div>

      {/* Clarmind - Main project card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <div className="p-8 md:p-10 rounded-lg border border-accent-border bg-background-elevated/50 hover:border-text-tertiary/50 transition-colors duration-200">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="px-2.5 py-1 rounded-full bg-status-success/10 text-status-success text-xs font-medium border border-status-success/20">
              En production
            </span>
            <span className="px-2.5 py-1 rounded-full bg-background-overlay text-text-tertiary text-xs font-medium border border-accent-border">
              SaaS
            </span>
          </div>

          <h3 className="text-2xl md:text-3xl font-light tracking-[-0.02em] mb-4">
            Clarmind — Suivi émotionnel TCC
          </h3>

          <p className="text-text-secondary leading-[1.7] mb-6 max-w-[640px]">
            Application complète de suivi émotionnel pour psychologues TCC et
            leurs patients. 186 tests, conformité RGPD, intégration Stripe,
            dashboard temps réel, export PDF.
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            {clarmindStack.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-md bg-background-overlay text-text-tertiary text-xs font-mono border border-accent-border"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            <a
              href="https://clarmind.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent-primary text-background font-medium rounded-md hover:bg-accent-hover transition-all text-sm btn-primary"
            >
              Voir le projet
              <ArrowUpRight size={16} weight="bold" />
            </a>
          </div>
        </div>
      </motion.div>

      {/* Placeholder slots */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="grid md:grid-cols-2 gap-6"
      >
        <div className="p-8 rounded-lg border border-dashed border-accent-border bg-transparent hover:border-text-tertiary/50 transition-colors duration-200">
          <h4 className="text-lg font-medium mb-3 tracking-[-0.01em]">
            Votre site vitrine ?
          </h4>
          <p className="text-text-secondary text-sm leading-[1.6] mb-6">
            Ce slot attend votre projet. Un site moderne qui vous ressemble.
          </p>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollToContact();
            }}
            className="inline-flex items-center gap-2 text-sm text-accent-primary hover:underline"
          >
            <EnvelopeSimple size={16} />
            Me contacter
          </a>
        </div>

        <div className="p-8 rounded-lg border border-dashed border-accent-border bg-transparent hover:border-text-tertiary/50 transition-colors duration-200">
          <h4 className="text-lg font-medium mb-3 tracking-[-0.01em]">
            Votre application ?
          </h4>
          <p className="text-text-secondary text-sm leading-[1.6] mb-6">
            Parlons de votre prochain projet. Dashboard, espace client, outil
            métier.
          </p>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollToContact();
            }}
            className="inline-flex items-center gap-2 text-sm text-accent-primary hover:underline"
          >
            <EnvelopeSimple size={16} />
            Me contacter
          </a>
        </div>
      </motion.div>
    </section>
  );
}
