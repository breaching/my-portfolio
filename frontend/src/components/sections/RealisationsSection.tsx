"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  EnvelopeSimple,
  Plus,
  TestTube,
  ShieldCheck,
  CreditCard,
  Globe,
} from "@phosphor-icons/react";
import { scrollToSection } from "@/lib/scroll";

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
  { icon: TestTube, value: "186+", label: "Tests", color: "text-accent-action" },
  { icon: ShieldCheck, value: "RGPD", label: "Conforme", color: "text-status-success" },
  { icon: CreditCard, value: "Stripe", label: "Intégré", color: "text-accent-action" },
  { icon: Globe, value: "UE", label: "Hébergement", color: "text-status-success" },
];

function scrollToContact() {
  scrollToSection("contact");
}

export function RealisationsSection() {
  return (
    <section
      id="realisations"
      className="section border-t border-accent-border"
    >
      <motion.div {...fadeIn}>
        <p className="text-accent-action text-sm font-medium font-mono mb-3 tracking-wide uppercase">
          Réalisations
        </p>
        <h2 className="text-3xl md:text-4xl font-light tracking-[-0.02em] mb-4">
          Ce que je construis.
        </h2>
        <p className="text-text-secondary prose-width leading-relaxed mb-14">
          Projets réels, en production, utilisés par de vrais utilisateurs.
        </p>
      </motion.div>

      {/* Clarmind - Main project card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mb-8"
      >
        <div className="rounded-xl border border-accent-border bg-background-elevated/50 hover:border-accent-action/40 transition-all duration-300 overflow-hidden">
          {/* Clarmind mockup — premium browser frame */}
          <div className="relative bg-gradient-to-br from-background-overlay via-background-elevated to-background overflow-hidden">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 px-5 py-3 border-b border-accent-border bg-background-elevated/80">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-status-error/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-status-warning/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-status-success/50" />
              </div>
              <div className="flex-1 mx-4">
                <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-background/60 border border-accent-border max-w-xs">
                  <div className="w-3 h-3 rounded-full bg-status-success/40" />
                  <span className="text-xs text-text-tertiary font-mono truncate">
                    clarmind.com
                  </span>
                </div>
              </div>
            </div>

            {/* Dashboard content */}
            <div className="p-5 sm:p-6 h-44 sm:h-52">
              <div className="flex gap-4 h-full">
                {/* Sidebar skeleton */}
                <div className="hidden sm:flex flex-col gap-3 w-28 shrink-0 py-1">
                  <div className="h-3 w-20 rounded-full bg-accent-action/25" />
                  <div className="h-3 w-24 rounded-full bg-accent-border/60" />
                  <div className="h-3 w-16 rounded-full bg-accent-border/60" />
                  <div className="h-3 w-20 rounded-full bg-accent-border/60" />
                  <div className="mt-auto h-3 w-14 rounded-full bg-accent-border/40" />
                </div>

                {/* Main area */}
                <div className="flex-1 flex flex-col gap-3">
                  {/* KPI row */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div className="p-3 rounded-lg bg-accent-action/8 border border-accent-action/15">
                      <div className="h-2 w-12 rounded-full bg-accent-action/30 mb-2" />
                      <div className="h-5 w-8 rounded bg-accent-action/40" />
                    </div>
                    <div className="p-3 rounded-lg bg-status-success/8 border border-status-success/15">
                      <div className="h-2 w-10 rounded-full bg-status-success/30 mb-2" />
                      <div className="h-5 w-10 rounded bg-status-success/40" />
                    </div>
                    <div className="hidden sm:block p-3 rounded-lg bg-status-warning/8 border border-status-warning/15">
                      <div className="h-2 w-14 rounded-full bg-status-warning/30 mb-2" />
                      <div className="h-5 w-7 rounded bg-status-warning/40" />
                    </div>
                  </div>

                  {/* Chart area */}
                  <div className="flex-1 rounded-lg bg-background/40 border border-accent-border/50 p-3 flex items-end">
                    <div className="flex items-end gap-[3px] w-full h-full">
                      {[35, 55, 40, 72, 48, 65, 85, 52, 68, 78, 45, 90, 58, 75, 62].map(
                        (h, i) => (
                          <motion.div
                            key={i}
                            className="flex-1 rounded-t bg-gradient-to-t from-accent-action/40 to-accent-action/20"
                            initial={{ height: 0 }}
                            whileInView={{ height: `${h}%` }}
                            viewport={{ once: true }}
                            transition={{
                              delay: 0.4 + i * 0.03,
                              duration: 0.6,
                              ease: [0.16, 1, 0.3, 1],
                            }}
                          />
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Project info */}
          <div className="p-7 md:p-10">
            <div className="flex flex-wrap items-center gap-2.5 mb-5">
              <span className="px-2.5 py-1 rounded-full bg-status-success/10 text-status-success text-xs font-medium border border-status-success/20">
                En production
              </span>
              <span className="px-2.5 py-1 rounded-full bg-background-overlay text-text-tertiary text-xs font-medium border border-accent-border">
                SaaS B2B
              </span>
            </div>

            <h3 className="text-2xl md:text-3xl font-light tracking-[-0.02em] mb-4">
              Clarmind — Suivi émotionnel TCC
            </h3>

            <p className="text-text-secondary leading-[1.7] mb-6 max-w-[600px]">
              Application complète de suivi émotionnel pour psychologues TCC et
              leurs patients. Dashboard temps réel, export PDF, gestion des
              abonnements.
            </p>

            {/* Tech stack */}
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
                className="btn-glow inline-flex items-center gap-2 px-5 py-2.5 bg-accent-action text-background font-medium rounded-lg hover:bg-accent-action-hover transition-all text-sm"
              >
                Voir le projet
                <ArrowUpRight size={16} weight="bold" />
              </a>
            </div>

            {/* Metrics — visual cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-accent-border">
              {clarmindMetrics.map((metric) => {
                const Icon = metric.icon;
                return (
                  <div
                    key={metric.label}
                    className="flex items-center gap-3 p-3 rounded-lg bg-background/50"
                  >
                    <Icon
                      size={18}
                      weight="duotone"
                      className={metric.color}
                    />
                    <div>
                      <p className="text-sm font-medium text-text-primary stat-number leading-tight">
                        {metric.value}
                      </p>
                      <p className="text-xs text-text-tertiary">
                        {metric.label}
                      </p>
                    </div>
                  </div>
                );
              })}
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
        className="grid md:grid-cols-2 gap-5"
      >
        {/* dubus.pro */}
        <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.2 }}>
          <a
            href="https://github.com/breaching"
            target="_blank"
            rel="noopener noreferrer"
            className="group block p-7 rounded-xl border border-accent-border bg-background-elevated/50 hover:border-accent-action/40 transition-all duration-300 h-full"
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
              Portfolio et machine de conversion. Next.js 16, React 19,
              SSG, Lighthouse optimisé, security headers, dark/light auto.
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
        <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.2 }}>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollToContact();
            }}
            className="group block p-7 rounded-xl border border-dashed border-accent-border bg-transparent hover:border-accent-action hover:bg-accent-action-subtle transition-all duration-300 text-center h-full flex flex-col items-center justify-center"
          >
            <div className="w-14 h-14 rounded-xl bg-accent-action-subtle border border-accent-action/20 flex items-center justify-center mb-5 group-hover:bg-accent-action/15 transition-colors">
              <Plus
                size={24}
                className="text-text-tertiary group-hover:text-accent-action transition-colors"
              />
            </div>
            <h4 className="text-lg font-medium mb-2 tracking-[-0.01em]">
              Votre projet ?
            </h4>
            <p className="text-text-secondary text-sm leading-[1.6] mb-5 max-w-[260px] mx-auto">
              Site vitrine, application web, outil métier — ce slot attend
              votre projet.
            </p>
            <span className="inline-flex items-center gap-2 text-sm text-text-tertiary group-hover:text-accent-action transition-colors">
              <EnvelopeSimple size={16} />
              Me contacter
            </span>
          </a>
        </motion.div>
      </motion.div>

    </section>
  );
}
