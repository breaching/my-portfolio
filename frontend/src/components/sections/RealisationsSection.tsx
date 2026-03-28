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
    image: "/images/hero/boulangerie-hero.jpg",
    accent: "#E8C496",
    bg: "bg-[#3D2B1F]",
  },
  {
    name: "Le Bistrot Normand",
    sector: "Restaurant",
    path: "restaurant",
    description: "Landing gastronomique, réservation, carte en ligne",
    image: "/images/hero/restaurant-hero.jpg",
    accent: "#C9A96E",
    bg: "bg-[#1A1A1A]",
  },
  {
    name: "Studio Morel",
    sector: "Architecture",
    path: "architecte",
    description: "Portfolio éditorial, galerie projets, minimaliste",
    image: "/images/hero/architecte-hero.jpg",
    accent: "#A8A29E",
    bg: "bg-[#2C2C2C]",
  },
  {
    name: "Dupont Plomberie",
    sector: "Artisan",
    path: "plombier",
    description: "Page services, urgence 24h, devis en ligne",
    image: "/images/hero/plombier-hero.jpg",
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

      {/* Demo sites showcase — hero content for prospects */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <p className="text-sm text-text-tertiary mb-5">
          Exemples de sites vitrines — chaque projet est unique, pas de template.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {demoSites.map((demo, i) => {
            const galleryIndex = demos.findIndex((d) => d.path === demo.path);
            return (
              <motion.div
                key={demo.path}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <button
                  onClick={() => setGalleryOpen(galleryIndex)}
                  className="group block w-full text-left rounded-xl overflow-hidden border border-accent-border hover:border-accent-action/40 transition-all duration-300 cursor-pointer"
                >
                  {/* Image */}
                  <div className={`relative h-40 sm:h-48 ${demo.bg} overflow-hidden`}>
                    <Image
                      src={demo.image}
                      alt={demo.name}
                      fill
                      className="object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 inset-x-0 p-3 sm:p-4">
                      <span
                        className="inline-block px-2 py-0.5 rounded-full text-[10px] font-medium mb-1.5 border border-white/15"
                        style={{ backgroundColor: `${demo.accent}20`, color: demo.accent }}
                      >
                        {demo.sector}
                      </span>
                      <p className="text-sm font-medium text-white leading-tight">{demo.name}</p>
                    </div>
                  </div>
                  {/* Info */}
                  <div className="p-3 sm:p-4 bg-background-elevated/50">
                    <p className="text-xs text-text-tertiary leading-relaxed mb-2.5 line-clamp-2">
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

      {/* Clarmind — compact project card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="grid md:grid-cols-2 gap-5 mb-8"
      >
        <div className="rounded-xl border border-accent-border bg-background-elevated/50 hover:border-accent-action/40 transition-all duration-300 overflow-hidden p-5 sm:p-7">
          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="px-2.5 py-1 rounded-full bg-status-success/10 text-status-success text-xs font-medium border border-status-success/20">
              En production
            </span>
            <span className="px-2.5 py-1 rounded-full bg-background-overlay text-text-tertiary text-xs font-medium border border-accent-border">
              SaaS B2B
            </span>
          </div>

          <h3 className="text-lg sm:text-xl font-medium tracking-[-0.01em] mb-3">
            Clarmind — Suivi émotionnel TCC
          </h3>

          <p className="text-text-secondary text-sm leading-[1.65] mb-4 max-w-[500px]">
            Application SaaS complète pour des professionnels de santé.
            Dashboard temps réel, paiement Stripe, conformité RGPD, 186+ tests.
          </p>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {clarmindStack.map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 rounded bg-accent-action-subtle text-accent-action text-xs font-mono border border-accent-action/20"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Metrics row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-5 pt-4 border-t border-accent-border">
            {clarmindMetrics.map((metric) => {
              const Icon = metric.icon;
              return (
                <div
                  key={metric.label}
                  className="flex items-center gap-2.5 p-2 rounded-lg bg-background/50"
                >
                  <Icon size={16} weight="duotone" className={metric.color} />
                  <div>
                    <p className="text-xs font-medium text-text-primary stat-number leading-tight">
                      {metric.value}
                    </p>
                    <p className="text-[10px] text-text-tertiary">{metric.label}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <a
            href="https://clarmind.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-text-tertiary hover:text-accent-action transition-colors"
          >
            Voir le projet
            <ArrowUpRight size={14} />
          </a>
        </div>

        {/* Placeholder — votre projet */}
        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            scrollToContact();
          }}
          className="group block rounded-xl border border-dashed border-accent-border bg-transparent hover:border-accent-action hover:bg-accent-action-subtle transition-all duration-300 text-center flex flex-col items-center justify-center p-5 sm:p-7"
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

      {/* CTA after realisations */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-center"
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
