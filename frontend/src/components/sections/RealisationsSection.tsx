"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
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
import { DemoGallery, demos } from "@/components/ui/DemoGallery";

const demoSites = [
  {
    name: "Boulangerie Martin",
    sector: "Commerce",
    path: "boulangerie",
    description: "Catalogue produits, localisation, ambiance artisanale",
    image: "https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=600&h=400&fit=crop&q=80",
    accent: "#E8C496",
    bg: "bg-[#3D2B1F]",
  },
  {
    name: "Le Bistrot Normand",
    sector: "Restaurant",
    path: "restaurant",
    description: "Landing gastronomique, réservation, carte en ligne",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop&q=80",
    accent: "#C9A96E",
    bg: "bg-[#1A1A1A]",
  },
  {
    name: "Studio Morel",
    sector: "Architecture",
    path: "architecte",
    description: "Portfolio éditorial, galerie projets, minimaliste",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop&q=80",
    accent: "#A8A29E",
    bg: "bg-[#2C2C2C]",
  },
  {
    name: "Dupont Plomberie",
    sector: "Artisan",
    path: "plombier",
    description: "Page services, urgence 24h, devis en ligne",
    image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=600&h=400&fit=crop&q=80",
    accent: "#93C5FD",
    bg: "bg-[#1E5FAA]",
  },
];

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
  const [galleryOpen, setGalleryOpen] = useState<number | null>(null);

  return (
    <section
      id="realisations"
      aria-labelledby="realisations-heading"
      className="section border-t border-accent-border"
    >
      <div className="container-main">
      <motion.div {...fadeIn}>
        <p className="text-accent-action text-sm font-medium font-mono mb-3 tracking-wide uppercase">
          Réalisations
        </p>
        <h2 id="realisations-heading" className="text-2xl sm:text-3xl md:text-4xl font-light tracking-[-0.02em] mb-3 sm:mb-4">
          Ce que je construis.
        </h2>
        <p className="text-sm sm:text-base text-text-secondary prose-width leading-relaxed mb-8 sm:mb-14">
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
          <div className="p-5 sm:p-7 md:p-10">
            <div className="flex flex-wrap items-center gap-2.5 mb-5">
              <span className="px-2.5 py-1 rounded-full bg-status-success/10 text-status-success text-xs font-medium border border-status-success/20">
                En production
              </span>
              <span className="px-2.5 py-1 rounded-full bg-background-overlay text-text-tertiary text-xs font-medium border border-accent-border">
                SaaS B2B
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl md:text-3xl font-light tracking-[-0.02em] mb-3 sm:mb-4">
              Clarmind — Suivi émotionnel TCC
            </h3>

            <p className="text-text-secondary leading-[1.7] mb-3 max-w-[600px]">
              Application web complète de suivi émotionnel pour des professionnels
              de santé. Dashboard temps réel, export PDF, gestion des abonnements.
            </p>
            <p className="text-text-tertiary text-sm leading-[1.6] mb-6 max-w-[600px]">
              Ce projet prouve ma capacité à livrer un produit complet : paiement en
              ligne, conformité RGPD, 186 tests qualité. Votre site vitrine bénéficiera
              du même niveau de rigueur.
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
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 pt-5 sm:pt-6 border-t border-accent-border">
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

      {/* Demo sites showcase */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <p className="text-sm text-text-tertiary mb-5">
          Exemples de sites vitrines — chaque projet est unique, pas de template.
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
          {demoSites.map((demo, i) => {
            const galleryIndex = demos.findIndex((d) => d.path === demo.path);
            return (
              <motion.div
                key={demo.path}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <button
                  onClick={() => setGalleryOpen(galleryIndex)}
                  className="group block w-full text-left rounded-xl overflow-hidden border border-accent-border hover:border-accent-action/40 transition-all duration-300 cursor-pointer"
                >
                  {/* Image */}
                  <div className={`relative h-28 sm:h-40 ${demo.bg} overflow-hidden`}>
                    <Image
                      src={demo.image}
                      alt={demo.name}
                      fill
                      className="object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 inset-x-0 p-2.5 sm:p-4">
                      <span
                        className="inline-block px-1.5 sm:px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-medium mb-1 sm:mb-1.5 border border-white/15"
                        style={{ backgroundColor: `${demo.accent}20`, color: demo.accent }}
                      >
                        {demo.sector}
                      </span>
                      <p className="text-xs sm:text-sm font-medium text-white leading-tight">{demo.name}</p>
                    </div>
                  </div>
                  {/* Info */}
                  <div className="p-2.5 sm:p-4 bg-background-elevated/50">
                    <p className="text-[11px] sm:text-xs text-text-tertiary leading-relaxed mb-2 sm:mb-2.5 line-clamp-2">
                      {demo.description}
                    </p>
                    <span className="inline-flex items-center gap-1 text-xs text-text-tertiary group-hover:text-accent-action transition-colors">
                      Voir la démo
                      <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </span>
                  </div>
                </button>
              </motion.div>
            );
          })}
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
        <div>
          <a
            href="https://github.com/breaching"
            target="_blank"
            rel="noopener noreferrer"
            className="group block p-5 sm:p-7 rounded-xl border border-accent-border bg-background-elevated/50 hover:border-accent-action/40 transition-all duration-300 h-full"
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
        </div>

        {/* Placeholder — votre projet */}
        <div>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollToContact();
            }}
            className="group block p-5 sm:p-7 rounded-xl border border-dashed border-accent-border bg-transparent hover:border-accent-action hover:bg-accent-action-subtle transition-all duration-300 text-center h-full flex flex-col items-center justify-center"
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
        </div>
      </motion.div>

      {/* CTA after realisations */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mt-10 text-center"
      >
        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            scrollToContact();
          }}
          className="group/link inline-flex items-center gap-2 text-sm text-text-secondary hover:text-accent-action transition-colors"
        >
          Envie d&apos;un site comme ceux-ci ? Demander un devis
          <ArrowUpRight
            size={16}
            className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform"
          />
        </a>
      </motion.div>
      </div>

      {/* Demo gallery overlay */}
      <AnimatePresence>
        {galleryOpen !== null && (
          <DemoGallery
            initial={galleryOpen}
            onClose={() => setGalleryOpen(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
