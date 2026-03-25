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
          {/* Clarmind mockup — CSS-only dashboard preview */}
          <div className="h-48 sm:h-56 bg-gradient-to-br from-accent-action-subtle via-background-elevated to-background overflow-hidden p-4 sm:p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2.5 h-2.5 rounded-full bg-status-error/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-status-warning/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-status-success/60" />
              <span className="ml-2 text-xs text-text-tertiary font-mono">clarmind.com</span>
            </div>
            <div className="flex gap-3 h-[calc(100%-32px)]">
              {/* Sidebar */}
              <div className="hidden sm:flex flex-col gap-2 w-24 shrink-0">
                <div className="h-3 w-16 rounded bg-accent-action/20" />
                <div className="h-3 w-20 rounded bg-accent-border" />
                <div className="h-3 w-14 rounded bg-accent-border" />
                <div className="h-3 w-18 rounded bg-accent-border" />
              </div>
              {/* Main content area */}
              <div className="flex-1 flex flex-col gap-2">
                <div className="flex gap-2">
                  <div className="flex-1 h-14 rounded bg-accent-action/10 border border-accent-action/20 p-2">
                    <div className="h-2 w-10 rounded bg-accent-action/30 mb-1.5" />
                    <div className="h-4 w-8 rounded bg-accent-action/40" />
                  </div>
                  <div className="flex-1 h-14 rounded bg-status-success/10 border border-status-success/20 p-2">
                    <div className="h-2 w-8 rounded bg-status-success/30 mb-1.5" />
                    <div className="h-4 w-6 rounded bg-status-success/40" />
                  </div>
                  <div className="hidden sm:block flex-1 h-14 rounded bg-status-warning/10 border border-status-warning/20 p-2">
                    <div className="h-2 w-12 rounded bg-status-warning/30 mb-1.5" />
                    <div className="h-4 w-7 rounded bg-status-warning/40" />
                  </div>
                </div>
                <div className="flex-1 rounded bg-background-overlay/50 border border-accent-border p-2">
                  <div className="flex items-end gap-1 h-full">
                    {[40, 65, 45, 80, 55, 70, 90, 60, 75, 85, 50, 95].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-t bg-accent-action/30"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
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

      {/* Secondary projects */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="grid md:grid-cols-2 gap-6"
      >
        {/* dubus.pro — this portfolio */}
        <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
          <a
            href="https://github.com/breaching"
            target="_blank"
            rel="noopener noreferrer"
            className="group block p-8 rounded-lg border border-accent-border bg-background-elevated/50 hover:border-accent-action/50 transition-all duration-300 h-full"
          >
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="px-2.5 py-1 rounded-full bg-status-success/10 text-status-success text-xs font-medium border border-status-success/20">
                En production
              </span>
              <span className="px-2.5 py-1 rounded-full bg-background-overlay text-text-tertiary text-xs font-medium border border-accent-border">
                Open source
              </span>
            </div>
            <h4 className="text-lg font-medium mb-2 tracking-[-0.01em]">
              dubus.pro — Ce site
            </h4>
            <p className="text-text-secondary text-sm leading-[1.6] mb-4">
              Portfolio et site de conversion freelance. Next.js 16, React 19,
              SSG, score Lighthouse optimisé, security headers, dark/light auto.
            </p>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {["Next.js 16", "React 19", "Tailwind 4", "Framer Motion"].map(
                (tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded bg-accent-action-subtle text-accent-action text-xs font-mono border border-accent-action/20"
                  >
                    {tech}
                  </span>
                )
              )}
            </div>
            <span className="inline-flex items-center gap-2 text-sm text-text-tertiary group-hover:text-accent-action transition-colors">
              <ArrowUpRight size={16} />
              Voir le code
            </span>
          </a>
        </motion.div>

        {/* Placeholder — votre projet */}
        <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollToContact();
            }}
            className="group block p-8 rounded-lg border border-dashed border-accent-border bg-transparent hover:border-accent-action hover:bg-accent-action-subtle transition-all duration-300 text-center h-full flex flex-col items-center justify-center"
          >
            <Plus
              size={32}
              className="text-text-tertiary group-hover:text-accent-action transition-colors mb-4"
            />
            <h4 className="text-lg font-medium mb-3 tracking-[-0.01em]">
              Votre projet ?
            </h4>
            <p className="text-text-secondary text-sm leading-[1.6] mb-4">
              Site vitrine, application web, outil métier — ce slot attend votre
              projet.
            </p>
            <span className="inline-flex items-center gap-2 text-sm text-text-tertiary group-hover:text-accent-action transition-colors">
              <EnvelopeSimple size={16} />
              Me contacter
            </span>
          </a>
        </motion.div>
      </motion.div>

      {/* Témoignages — placeholder transparent */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mt-12 text-center"
      >
        <p className="text-sm text-text-tertiary">
          Les premiers retours clients arrivent bientôt.
        </p>
      </motion.div>
    </section>
  );
}
