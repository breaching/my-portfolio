"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";
import {
  EnvelopeSimple,
  ArrowDown,
  CurrencyEur,
  Clock,
  CheckCircle,
  MapPin,
  Wrench,
  Drop,
  ThermometerHot,
} from "@phosphor-icons/react";
import { DemoGallery } from "@/components/ui/DemoGallery";
import { scrollToSection } from "@/lib/scroll";
import { FlipWords } from "@/components/ui/FlipWords";
import { NumberTicker } from "@/components/ui/NumberTicker";

/* Words synced 1:1 with demoCards — same order, same count */
const flipWords = ["professionnel", "élégant", "sur mesure", "de confiance"];

const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
};

const stats = [
  {
    icon: CurrencyEur,
    value: 800,
    suffix: " €",
    label: "à partir de",
  },
  {
    icon: Clock,
    value: 10,
    suffix: " jours",
    label: "délai de création",
  },
  {
    icon: CheckCircle,
    value: 100,
    suffix: "%",
    label: "responsive & optimal",
  },
];

/* ──────────────────────────────────────────────────────────
   Demo card data — faithful mini-representations of real
   /demos/* pages, each with a distinct layout.
   ────────────────────────────────────────────────────────── */

const demoCards: {
  url: string;
  path: string;
  accent: "indigo" | "amber" | "neutral" | "blue";
  content: React.ReactNode;
}[] = [
  /* ── Boulangerie ── */
  {
    url: "boulangerie-martin.fr",
    path: "boulangerie",
    accent: "indigo",
    content: (
      <div className="bg-[#FFF8F0] h-[230px] flex flex-col">
        <div className="relative h-[120px] shrink-0 overflow-hidden">
          <Image src="/images/hero/boulangerie-hero.jpg" alt="" fill className="object-cover" sizes="500px" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#3D2B1F]/80 via-[#3D2B1F]/50 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-center px-5">
            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/10 border border-white/15 text-[7px] text-white/80 mb-1 w-fit">
              <MapPin size={7} weight="fill" /> Caen
            </div>
            <p className="text-[13px] font-light text-white leading-tight">Pain artisanal,</p>
            <p className="text-[13px] font-semibold text-[#E8C496] leading-tight">fait avec passion.</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-1.5 p-2.5 flex-1">
          {[
            { name: "Baguette tradition", price: "1,30 €", img: "/images/demos/baguette.jpg" },
            { name: "Croissant", price: "1,40 €", img: "/images/demos/croissant.jpg" },
            { name: "Tarte pommes", price: "3,80 €", img: "/images/demos/tarte-pommes.jpg" },
          ].map((item) => (
            <div key={item.name} className="rounded-lg border border-[#E8D5C0]/50 bg-white overflow-hidden">
              <div className="relative h-[44px]">
                <Image src={item.img} alt="" fill className="object-cover" sizes="150px" />
              </div>
              <div className="px-1.5 py-1">
                <p className="text-[7px] font-medium text-[#3D2B1F] truncate">{item.name}</p>
                <p className="text-[6px] text-[#8B7355]">{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },

  /* ── Restaurant ── */
  {
    url: "bistrot-normand.fr",
    path: "restaurant",
    accent: "amber",
    content: (
      <div className="bg-[#1A1A1A] h-[230px] flex flex-col">
        <div className="relative flex-1 overflow-hidden">
          <Image src="/images/hero/restaurant-hero.jpg" alt="" fill className="object-cover" sizes="500px" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/60 to-[#1A1A1A]/30" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <p className="text-[6px] text-[#C9A96E] tracking-[0.3em] uppercase mb-1.5">Restaurant gastronomique · Caen</p>
            <p className="text-lg font-light text-white leading-tight">Le Bistrot</p>
            <p className="text-lg italic text-[#C9A96E] leading-tight -mt-0.5">Normand</p>
            <div className="w-6 h-px bg-[#C9A96E]/40 mt-2 mb-1.5" />
            <p className="text-[7px] text-white/40 max-w-[160px] leading-relaxed">Cuisine de saison, produits normands d&apos;exception</p>
          </div>
        </div>
        <div className="flex items-center justify-around px-4 py-2 border-t border-[#C9A96E]/15 bg-[#111]">
          {["La carte", "Réserver", "Horaires"].map((l) => (
            <span key={l} className="text-[7px] text-[#C9A96E]/60 tracking-wider uppercase">{l}</span>
          ))}
        </div>
      </div>
    ),
  },

  /* ── Architecte ── */
  {
    url: "studio-morel.fr",
    path: "architecte",
    accent: "neutral",
    content: (
      <div className="bg-[#FAFAF9] h-[230px] flex flex-col">
        <div className="flex items-center justify-between px-4 py-2 border-b border-neutral-100">
          <p className="text-[8px] font-medium text-neutral-800 tracking-tight">Studio <span className="font-light">Morel</span></p>
          <div className="flex gap-3">
            {["Projets", "Approche", "Contact"].map((l) => (
              <span key={l} className="text-[6px] text-neutral-400">{l}</span>
            ))}
          </div>
        </div>
        <div className="flex flex-1 overflow-hidden">
          <div className="relative w-[55%] shrink-0">
            <Image src="/images/hero/architecte-hero.jpg" alt="" fill className="object-cover" sizes="300px" />
          </div>
          <div className="flex-1 flex flex-col justify-center px-4 py-3">
            <p className="text-[6px] text-neutral-400 tracking-[0.15em] uppercase mb-1">Architecture d&apos;intérieur</p>
            <p className="text-[12px] font-light text-neutral-800 leading-snug">Des espaces qui</p>
            <p className="text-[12px] font-medium text-neutral-800 leading-snug">vous <span className="italic text-neutral-500">ressemblent.</span></p>
            <div className="flex gap-4 mt-2.5">
              <div>
                <p className="text-[13px] font-semibold text-neutral-800">4</p>
                <p className="text-[5px] text-neutral-400 uppercase tracking-wide">Projets</p>
              </div>
              <div>
                <p className="text-[13px] font-semibold text-neutral-800">8</p>
                <p className="text-[5px] text-neutral-400 uppercase tracking-wide">Ans</p>
              </div>
            </div>
            <div className="mt-2.5 px-2 py-1 rounded bg-neutral-800 text-[6px] text-white w-fit">Découvrir</div>
          </div>
        </div>
      </div>
    ),
  },

  /* ── Plombier ── */
  {
    url: "dupont-plomberie.fr",
    path: "plombier",
    accent: "blue",
    content: (
      <div className="bg-white h-[230px] flex flex-col">
        <div className="bg-[#1E5FAA] px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded-md bg-white/15 flex items-center justify-center">
              <Wrench size={10} weight="bold" className="text-white" />
            </div>
            <div>
              <p className="text-[9px] font-semibold text-white tracking-tight">Dupont Plomberie</p>
              <p className="text-[5px] text-blue-200/60">Caen & agglomération</p>
            </div>
          </div>
          <div className="px-2 py-0.5 rounded-full bg-orange-500 text-[6px] text-white font-semibold">
            Urgence 24h
          </div>
        </div>
        <div className="relative h-[90px] shrink-0 overflow-hidden">
          <Image src="/images/hero/plombier-hero.jpg" alt="" fill className="object-cover" sizes="500px" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1E5FAA]/80 via-[#1E5FAA]/40 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-center px-4">
            <p className="text-[12px] font-bold text-white leading-tight">Votre plombier</p>
            <p className="text-[12px] font-bold text-[#93C5FD] leading-tight">de confiance.</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-1 px-2.5 py-2 flex-1">
          {[
            { icon: Drop, name: "Plomberie" },
            { icon: ThermometerHot, name: "Chauffage" },
            { icon: Wrench, name: "Dépannage" },
          ].map((svc) => {
            const Icon = svc.icon;
            return (
              <div key={svc.name} className="rounded-md bg-[#F0F6FF] flex flex-col items-center justify-center py-2 px-1">
                <Icon size={14} weight="duotone" className="text-[#1E5FAA] mb-1" />
                <p className="text-[7px] font-semibold text-[#1E5FAA]">{svc.name}</p>
              </div>
            );
          })}
        </div>
        <div className="bg-[#1E5FAA] px-4 py-1.5 flex items-center justify-center gap-2">
          <span className="text-[7px] text-white/70">Devis gratuit</span>
          <span className="text-[7px] font-bold text-white">02 31 00 00 00</span>
        </div>
      </div>
    ),
  },
];

/* ──────────────────────────────────────────────────────────
   FloatingScreens — Premium 3D isometric browser showcase
   with floating performance badges and ambient lighting
   ────────────────────────────────────────────────────────── */

function FloatingScreens({
  isInView,
  activeDemo,
  onOpenGallery,
}: {
  isInView: boolean;
  activeDemo: number;
  onOpenGallery: (i: number) => void;
}) {
  const card = demoCards[activeDemo];

  return (
    <div
      className="relative w-full h-[420px] lg:h-[460px]"
      style={{ perspective: "1400px" }}
    >
      {/* Multi-layer ambient glow — reacts to demo accent */}
      <div
        className="absolute top-[40%] left-[48%] -translate-x-1/2 -translate-y-1/2 w-[550px] h-[420px] rounded-full bg-indigo-500/20 blur-[120px] transition-all duration-1000"
        aria-hidden="true"
      />
      <div
        className="absolute top-[25%] left-[30%] w-72 h-72 rounded-full bg-violet-600/12 blur-[90px]"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-[15%] right-[10%] w-56 h-56 rounded-full bg-sky-500/8 blur-[70px]"
        aria-hidden="true"
      />

      {/* ── Main browser — 3D perspective with hover-ready transform ── */}
      <motion.div
        initial={{ opacity: 0, y: 40, rotateX: 10, rotateY: -14 }}
        animate={
          isInView
            ? { opacity: 1, y: 0, rotateX: 4, rotateY: -8 }
            : {}
        }
        transition={{ delay: 0.3, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-[2%] left-[2%] w-[92%] z-30 cursor-pointer group/browser"
        style={{ transformStyle: "preserve-3d" }}
        onClick={() => onOpenGallery(activeDemo)}
      >
        {/* Browser reflection / shadow underneath */}
        <div
          className="absolute -bottom-8 left-[8%] right-[8%] h-20 bg-indigo-500/10 blur-[30px] rounded-full transition-all duration-500 group-hover/browser:bg-indigo-500/15 group-hover/browser:blur-[40px]"
          style={{ transform: "translateZ(-40px) rotateX(-80deg)" }}
          aria-hidden="true"
        />

        <div className="rounded-2xl border border-white/[0.08] bg-[#0c0c1a]/92 backdrop-blur-2xl shadow-[0_25px_100px_-20px_rgba(99,102,241,0.3),0_0_0_1px_rgba(255,255,255,0.03)_inset] overflow-hidden transition-shadow duration-500 group-hover/browser:shadow-[0_30px_120px_-20px_rgba(99,102,241,0.4),0_0_0_1px_rgba(255,255,255,0.05)_inset]">
          {/* Browser chrome — refined with subtle inner glow */}
          <div className="flex items-center gap-2 px-5 py-3 border-b border-white/[0.06] bg-gradient-to-r from-white/[0.02] to-transparent">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ff5f57] shadow-[0_0_6px_rgba(255,95,87,0.4)]" />
              <div className="w-3 h-3 rounded-full bg-[#febc2e] shadow-[0_0_6px_rgba(254,188,46,0.3)]" />
              <div className="w-3 h-3 rounded-full bg-[#28c840] shadow-[0_0_6px_rgba(40,200,64,0.3)]" />
            </div>
            <div className="flex-1 flex justify-center">
              <div className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] text-[11px] text-white/35 font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400/70 shadow-[0_0_4px_rgba(52,211,153,0.5)]" />
                <AnimatePresence mode="wait">
                  <motion.span
                    key={card.url}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.3 }}
                  >
                    {card.url}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Demo content — cycles with slide transition */}
          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={card.url}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                {card.content}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Glass highlight edge — top edge catch-light */}
        <div
          className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
          aria-hidden="true"
        />
      </motion.div>

      {/* ── Floating performance badge — top right ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
        transition={{ delay: 0.9, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-[-4%] right-[-6%] z-40"
        style={{
          transform: "translateZ(60px)",
          transformStyle: "preserve-3d",
        }}
      >
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="rounded-xl border border-emerald-500/25 bg-[#0a0a18]/90 backdrop-blur-xl shadow-[0_12px_40px_-8px_rgba(16,185,129,0.2)] p-3"
        >
          <div className="flex items-center gap-3">
            {[
              { label: "Perf", score: "98" },
              { label: "SEO", score: "100" },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center gap-1">
                <div className="w-9 h-9 rounded-full border-2 border-emerald-500/50 text-emerald-400 flex items-center justify-center bg-emerald-500/[0.08] shadow-[0_0_12px_rgba(16,185,129,0.15)]">
                  <span className="text-[10px] font-bold font-mono">{item.score}</span>
                </div>
                <span className="text-[7px] text-white/30">{item.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* ── Floating speed badge — bottom left ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
        transition={{ delay: 1.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-[28%] left-[-6%] z-40"
        style={{
          transform: "translateZ(40px)",
          transformStyle: "preserve-3d",
        }}
      >
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          className="rounded-xl border border-indigo-500/25 bg-[#0a0a18]/90 backdrop-blur-xl shadow-[0_12px_40px_-8px_rgba(99,102,241,0.2)] px-4 py-3"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/15 border border-indigo-500/25 flex items-center justify-center">
              <span className="text-[10px] font-bold text-indigo-400 font-mono">0.8s</span>
            </div>
            <div>
              <p className="text-[9px] font-medium text-white/50">Chargement</p>
              <p className="text-[7px] text-emerald-400/70">2x plus rapide</p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* ── Floating SSL badge — bottom right ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 1.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-[28%] right-[-2%] z-40"
        style={{
          transform: "translateZ(30px)",
          transformStyle: "preserve-3d",
        }}
      >
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
          className="rounded-lg border border-emerald-500/20 bg-[#0a0a18]/90 backdrop-blur-xl shadow-lg px-3 py-2 flex items-center gap-2"
        >
          <div className="w-5 h-5 rounded-full bg-emerald-500/15 flex items-center justify-center">
            <CheckCircle size={12} weight="fill" className="text-emerald-400" />
          </div>
          <span className="text-[8px] font-medium text-white/40">SSL · RGPD · A+</span>
        </motion.div>
      </motion.div>

      {/* ── Ambient particles — subtle depth cues ── */}
      {[
        { top: "8%", left: "15%", size: 3, delay: 0.6, dur: 7 },
        { top: "75%", left: "90%", size: 4, delay: 0.9, dur: 5 },
        { top: "45%", left: "95%", size: 2, delay: 1.2, dur: 8 },
        { top: "90%", left: "45%", size: 3, delay: 0.7, dur: 6 },
        { top: "15%", left: "80%", size: 2, delay: 1.0, dur: 9 },
      ].map((dot, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={
            isInView
              ? { opacity: [0, 0.6, 0.3, 0.6], scale: 1 }
              : {}
          }
          transition={{
            delay: dot.delay,
            duration: dot.dur,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute rounded-full bg-indigo-400/60 shadow-[0_0_6px_2px_rgba(129,140,248,0.3)]"
          style={{
            top: dot.top,
            left: dot.left,
            width: dot.size,
            height: dot.size,
          }}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   Mobile illustration — polished browser with floating badges
   ────────────────────────────────────────────────────────── */

function MobileIllustration({
  isInView,
  activeDemo,
  onOpenGallery,
}: {
  isInView: boolean;
  activeDemo: number;
  onOpenGallery: (i: number) => void;
}) {
  const card = demoCards[activeDemo];

  return (
    <div className="relative w-full max-w-sm mx-auto">
      {/* Multi-layer glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-64 rounded-full bg-indigo-500/25 blur-[100px]"
        aria-hidden="true"
      />
      <div
        className="absolute top-[60%] left-[30%] w-40 h-40 rounded-full bg-violet-600/15 blur-[70px]"
        aria-hidden="true"
      />

      {/* ── Main browser — cycling demos ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-20 cursor-pointer"
        onClick={() => onOpenGallery(activeDemo)}
      >
        <div className="rounded-2xl border border-white/[0.10] bg-[#0c0c1a]/92 backdrop-blur-2xl shadow-[0_25px_80px_-15px_rgba(99,102,241,0.3),0_0_0_1px_rgba(255,255,255,0.04)_inset,0_0_60px_-10px_rgba(139,92,246,0.12)] overflow-hidden">
          {/* Chrome */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-gradient-to-r from-white/[0.03] to-transparent">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57] shadow-[0_0_6px_rgba(255,95,87,0.4)]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e] shadow-[0_0_6px_rgba(254,188,46,0.3)]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#28c840] shadow-[0_0_6px_rgba(40,200,64,0.3)]" />
            </div>
            <div className="flex-1 flex justify-center">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/[0.05] border border-white/[0.07] text-[10px] text-white/35 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/70 shadow-[0_0_6px_rgba(52,211,153,0.5)]" />
                <AnimatePresence mode="wait">
                  <motion.span
                    key={card.url}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {card.url}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>
          </div>
          {/* Demo content */}
          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={card.url}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                {card.content}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        {/* Top edge catch-light */}
        <div
          className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
          aria-hidden="true"
        />
        {/* Bottom reflection */}
        <div
          className="absolute -bottom-4 left-[8%] right-[8%] h-8 rounded-full bg-indigo-500/10 blur-xl"
          aria-hidden="true"
        />
      </motion.div>

      {/* ── Floating badges — overlapping browser edges ── */}
      <div className="relative z-30 flex justify-center gap-3 -mt-4 px-2">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="rounded-xl border border-emerald-500/25 bg-[#0a0a18]/95 backdrop-blur-xl shadow-[0_4px_20px_-4px_rgba(52,211,153,0.15)] px-3 py-2 flex items-center gap-2"
        >
          <div className="w-7 h-7 rounded-full border-2 border-emerald-500/50 text-emerald-400 flex items-center justify-center bg-emerald-500/[0.1]">
            <span className="text-[9px] font-bold font-mono">100</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-semibold text-white/70">Perf</span>
            <span className="text-[8px] text-white/30 font-medium">SEO</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="rounded-xl border border-indigo-500/25 bg-[#0a0a18]/95 backdrop-blur-xl shadow-[0_4px_20px_-4px_rgba(99,102,241,0.15)] px-3 py-2 flex items-center gap-2"
        >
          <span className="text-sm font-bold text-indigo-400 font-mono">0.8s</span>
          <span className="text-[9px] text-white/40 font-medium leading-tight">charge-<br/>ment</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="rounded-xl border border-emerald-500/25 bg-[#0a0a18]/95 backdrop-blur-xl shadow-[0_4px_20px_-4px_rgba(52,211,153,0.15)] px-3 py-2 flex items-center gap-2"
        >
          <CheckCircle size={16} weight="fill" className="text-emerald-400" />
          <div className="flex flex-col">
            <span className="text-[10px] font-semibold text-white/70">SSL</span>
            <span className="text-[8px] text-white/30 font-medium">RGPD</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

const CYCLE_MS = 4000;

export function HeroSection() {
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true, margin: "-50px" });

  /* Shared cycling index — drives both FlipWords and FloatingScreens */
  const [activeDemo, setActiveDemo] = useState(0);
  const [galleryOpen, setGalleryOpen] = useState<number | null>(null);
  const total = demoCards.length;
  const nextDemo = useCallback(() => setActiveDemo((a) => (a + 1) % total), [total]);

  useEffect(() => {
    if (!isHeroInView) return;
    const id = setInterval(nextDemo, CYCLE_MS);
    return () => clearInterval(id);
  }, [isHeroInView, nextDemo]);

  return (
    <section
      id="accueil"
      className="relative pt-16 sm:pt-24 md:pt-28 pb-6 sm:pb-10 md:pb-14 overflow-hidden"
      ref={heroRef}
    >
      {/* Background layers — gradient mesh + dot pattern + grain */}
      <div
        className="absolute inset-0 gradient-mesh pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-dot-pattern opacity-20 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 grain-overlay pointer-events-none"
        aria-hidden="true"
      />
      {/* Extra central glow for depth */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-accent-action/8 blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 container-main">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left — Content */}
          <motion.div
            initial="initial"
            animate={isHeroInView ? "animate" : "initial"}
            variants={staggerContainer}
            className="relative z-20"
          >
            {/* Availability badge */}
            <motion.div variants={fadeInUp} className="mb-3 lg:mb-5">
              <span className="inline-flex items-center gap-2 px-3 py-1 sm:px-4 sm:py-2 rounded-full border border-accent-border bg-background-elevated/80 backdrop-blur-sm text-[11px] sm:text-sm text-text-secondary">
                <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-status-success opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-status-success" />
                </span>
                Disponible — Caen & remote
              </span>
            </motion.div>

            {/* H1 */}
            <motion.h1
              variants={fadeInUp}
              className="text-[2rem] sm:text-4xl md:text-5xl lg:text-[3.25rem] xl:text-[3.5rem] font-light tracking-[-0.03em] mb-2 sm:mb-3 lg:mb-4 leading-[1.1]"
            >
              {/* Mobile: FlipWord on its own line */}
              <span className="sm:hidden">
                Un site web<br />
                <span className="font-semibold text-accent-action">
                  <FlipWords words={flipWords} activeIndex={activeDemo} />
                </span>
                <br />
                <span className="font-semibold">pour votre entreprise</span>
                <span className="text-accent-action">.</span>
              </span>
              {/* Desktop */}
              <span className="hidden sm:inline">
                Un site web{" "}
                <span className="font-semibold text-accent-action">
                  <FlipWords words={flipWords} activeIndex={activeDemo} />
                </span>
                <br />
                <span className="font-semibold">pour votre entreprise</span>
                <span className="text-accent-action">.</span>
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeInUp}
              className="text-text-secondary text-sm sm:text-lg md:text-xl leading-[1.5] mb-4 lg:mb-7 max-w-[540px]"
            >
              <span className="hidden sm:inline">
                Développeur web freelance en Normandie. Je crée des sites
                vitrines sur mesure qui inspirent confiance — et vous
                amènent des clients.
              </span>
              <span className="sm:hidden">
                Sites vitrines sur mesure en Normandie — confiance, performance et clients.
              </span>
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-3 mb-2 lg:mb-4"
            >
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("contact");
                }}
                className="btn-glow inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3 sm:py-4 bg-accent-action text-background font-medium rounded-lg hover:bg-accent-action-hover transition-all text-sm sm:text-base shadow-[0_0_20px_var(--accent-action-glow)] w-full sm:w-auto"
              >
                <EnvelopeSimple size={18} weight="bold" />
                <span>Demander un devis gratuit</span>
              </a>
              <a
                href="#realisations"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("realisations");
                }}
                className="hidden sm:inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-lg border border-accent-border text-text-secondary hover:text-text-primary hover:border-accent-action/50 transition-all text-base backdrop-blur-sm bg-background-elevated/30"
              >
                <span>Voir mes réalisations</span>
                <ArrowDown size={18} />
              </a>
            </motion.div>

            {/* Micro-copy */}
            <motion.p
              variants={fadeInUp}
              className="text-xs text-text-tertiary"
            >
              Devis gratuit · Réponse sous 24h · Sans engagement
            </motion.p>
          </motion.div>

          {/* Right — Floating screens illustration (desktop) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isHeroInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="hidden lg:block"
          >
            <FloatingScreens
              isInView={isHeroInView}
              activeDemo={activeDemo}
              onOpenGallery={(i) => setGalleryOpen(i)}
            />

            {/* Dots + counter */}
            <div className="flex items-center justify-center gap-3 -mt-2">
              <div className="flex gap-2">
                {demoCards.map((c, i) => (
                  <button
                    key={c.url}
                    onClick={() => setActiveDemo(i)}
                    className={`rounded-full transition-all duration-300 ${
                      i === activeDemo
                        ? "w-6 h-2 bg-accent-action shadow-[0_0_8px_2px_var(--accent-action-glow)]"
                        : "w-2 h-2 bg-white/20 hover:bg-white/40"
                    }`}
                    aria-label={`Voir ${c.url}`}
                  />
                ))}
              </div>
              <span className="text-[11px] text-text-tertiary font-mono tabular-nums">
                {String(activeDemo + 1).padStart(2, "0")}/{String(demoCards.length).padStart(2, "0")}
              </span>
            </div>
          </motion.div>
        </div>

        {/* Mobile illustration + dots */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-4 lg:hidden"
        >
          <MobileIllustration
            isInView={isHeroInView}
            activeDemo={activeDemo}
            onOpenGallery={(i) => setGalleryOpen(i)}
          />

          {/* Dots + counter — mobile */}
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="flex gap-2">
              {demoCards.map((c, i) => (
                <button
                  key={c.url}
                  onClick={() => setActiveDemo(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === activeDemo
                      ? "w-6 h-2 bg-accent-action shadow-[0_0_8px_2px_var(--accent-action-glow)]"
                      : "w-2 h-2 bg-white/20 hover:bg-white/40"
                  }`}
                  aria-label={`Voir ${c.url}`}
                />
              ))}
            </div>
            <span className="text-[11px] text-text-tertiary font-mono tabular-nums">
              {String(activeDemo + 1).padStart(2, "0")}/{String(demoCards.length).padStart(2, "0")}
            </span>
          </div>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            delay: 0.5,
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="mt-6 lg:mt-10"
        >
          {/* Mobile: inline compact stats */}
          <div className="flex items-center justify-between gap-2 sm:hidden">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="flex items-center gap-2 flex-1">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-accent-action-subtle border border-accent-action/20 shrink-0">
                    <Icon size={16} weight="duotone" className="text-accent-action" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-primary font-mono leading-none">
                      <NumberTicker value={stat.value} suffix={stat.suffix} delay={0.5} />
                    </p>
                    <p className="text-[10px] text-text-tertiary leading-tight mt-0.5">
                      {stat.label}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* sm+: card-style stats */}
          <div className="hidden sm:grid grid-cols-3 gap-3">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="group flex items-center gap-3.5 p-4 rounded-xl border border-accent-border bg-background-elevated/60 backdrop-blur-sm hover:border-accent-action/40 transition-all duration-300"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent-action-subtle border border-accent-action/20 shrink-0">
                    <Icon size={22} weight="duotone" className="text-accent-action" />
                  </div>
                  <div>
                    <p className="text-xl font-medium text-text-primary font-mono leading-tight">
                      <NumberTicker value={stat.value} suffix={stat.suffix} delay={0.6} />
                    </p>
                    <p className="text-sm text-text-tertiary leading-snug">
                      {stat.label}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
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
