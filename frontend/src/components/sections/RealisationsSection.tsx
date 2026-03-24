"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, EnvelopeSimple, Plus } from "@phosphor-icons/react";

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

const clarmindMetrics = [
  { value: "186", label: "Tests" },
  { value: "RGPD", label: "Conforme" },
  { value: "Stripe", label: "Billing intégré" },
  { value: "UE", label: "Hébergement" },
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
        <div className="rounded-lg border border-accent-border bg-background-elevated/50 hover:border-accent-action/50 transition-colors duration-300 overflow-hidden">
          {/* Decorative header gradient */}
          <div className="h-32 bg-gradient-to-br from-accent-action-subtle via-background-elevated to-background overflow-hidden">
            <div className="flex items-center justify-center h-full text-text-tertiary text-sm font-mono">
              clarmind.com
            </div>
          </div>

          <div className="p-8 md:p-10">
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

            {/* Tech stack tags - colored */}
            <div className="flex flex-wrap gap-2 mb-8">
              {clarmindStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-md bg-accent-action-subtle text-accent-action text-xs font-mono border border-accent-action/20"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 mb-8">
              <a
                href="https://clarmind.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent-action text-background font-medium rounded-md hover:bg-accent-action-hover transition-all text-sm btn-primary"
              >
                Voir le projet
                <ArrowUpRight size={16} weight="bold" />
              </a>
            </div>

            {/* Metrics */}
            <div className="flex flex-wrap gap-6 pt-6 border-t border-accent-border">
              {clarmindMetrics.map((metric) => (
                <div key={metric.label} className="text-center">
                  <p className="text-lg font-medium text-text-primary">
                    {metric.value}
                  </p>
                  <p className="text-xs text-text-tertiary">{metric.label}</p>
                </div>
              ))}
            </div>
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
        {[
          {
            title: "Votre site vitrine ?",
            text: "Ce slot attend votre projet. Un site moderne qui vous ressemble.",
          },
          {
            title: "Votre application ?",
            text: "Parlons de votre prochain projet. Dashboard, espace client, outil métier.",
          },
        ].map((placeholder) => (
          <motion.div
            key={placeholder.title}
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
          >
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToContact();
              }}
              className="group block p-8 rounded-lg border border-dashed border-accent-border bg-transparent hover:border-accent-action hover:bg-accent-action-subtle transition-all duration-300 text-center h-full"
            >
              <Plus
                size={32}
                className="text-text-tertiary group-hover:text-accent-action transition-colors mx-auto mb-4"
              />
              <h4 className="text-lg font-medium mb-3 tracking-[-0.01em]">
                {placeholder.title}
              </h4>
              <p className="text-text-secondary text-sm leading-[1.6] mb-4">
                {placeholder.text}
              </p>
              <span className="inline-flex items-center gap-2 text-sm text-text-tertiary group-hover:text-accent-action transition-colors">
                <EnvelopeSimple size={16} />
                Me contacter
              </span>
            </a>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
