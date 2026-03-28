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
  Code,
  Terminal,
  Gauge,
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
const flipWords = ["artisanal", "élégant", "sur mesure", "de confiance"];

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
   FloatingScreens — 3D isometric illustration with 4 windows:
   1. Main browser (cycles through demoCards)
   2. Code editor (fixed — page.tsx)
   3. Lighthouse dashboard (fixed — score circles)
   4. Terminal (fixed — npm run build)
   Plus floating particles and connecting lines.
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
    <div className="relative w-full h-[500px] lg:h-[560px]" style={{ perspective: "1200px" }}>
      {/* Ambient glow layers */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] rounded-full bg-indigo-500/25 blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="absolute top-[30%] left-[20%] w-64 h-64 rounded-full bg-violet-600/15 blur-[80px]"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-[20%] right-[15%] w-48 h-48 rounded-full bg-sky-500/10 blur-[60px]"
        aria-hidden="true"
      />

      {/* ── Main browser window — front center, largest ── */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.4, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-[10%] left-[5%] w-[72%] z-30 cursor-pointer"
        style={{ transform: "rotateY(-10deg) rotateX(6deg)", transformStyle: "preserve-3d" }}
        onClick={() => onOpenGallery(activeDemo)}
      >
        <div className="rounded-xl border border-indigo-500/30 bg-[#0c0c1a]/90 backdrop-blur-xl shadow-[0_20px_80px_-15px_rgba(99,102,241,0.25)] overflow-hidden">
          {/* Browser chrome */}
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/[0.06] bg-white/[0.02]">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]/80" />
            </div>
            <div className="flex-1 flex justify-center">
              <div className="flex items-center gap-2 px-4 py-1 rounded-md bg-white/[0.04] border border-white/[0.06] text-[10px] text-white/30 font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400/60" />
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

          {/* Demo content — cycles via AnimatePresence */}
          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={card.url}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                {card.content}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* ── Code editor — back right, peeking behind browser ── */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-[-2%] right-[-2%] w-[50%] z-20"
        style={{ transform: "rotateY(-14deg) rotateX(8deg)", transformStyle: "preserve-3d" }}
      >
        <div className="rounded-xl border border-indigo-500/20 bg-[#0a0a18]/85 backdrop-blur-xl shadow-[0_15px_60px_-10px_rgba(99,102,241,0.15)] overflow-hidden">
          {/* Editor tabs */}
          <div className="flex items-center gap-0 border-b border-white/[0.04] bg-white/[0.01]">
            <div className="flex items-center gap-1.5 px-3 py-2 border-b-2 border-indigo-500/60 bg-white/[0.02] text-[8px] text-white/50 font-mono">
              <Code size={9} className="text-indigo-400/60" />
              page.tsx
            </div>
            <div className="flex items-center gap-1.5 px-3 py-2 text-[8px] text-white/20 font-mono">
              layout.tsx
            </div>
            <div className="flex items-center gap-1.5 px-3 py-2 text-[8px] text-white/20 font-mono">
              globals.css
            </div>
          </div>
          {/* Code with line numbers */}
          <div className="p-3 font-mono text-[8px] leading-[2]">
            <div className="flex gap-3">
              {/* Line numbers */}
              <div className="text-white/10 text-right select-none w-4 shrink-0">
                {[1,2,3,4,5,6,7,8,9,10,11].map(n => (
                  <div key={n}>{n}</div>
                ))}
              </div>
              {/* Code */}
              <div className="space-y-0 overflow-hidden">
                <div><span className="text-violet-400/80">import</span> <span className="text-sky-300/70">{"{"} Hero {"}"}</span> <span className="text-violet-400/80">from</span> <span className="text-emerald-400/70">&apos;@/components&apos;</span></div>
                <div><span className="text-violet-400/80">import</span> <span className="text-sky-300/70">{"{"} Services {"}"}</span> <span className="text-violet-400/80">from</span> <span className="text-emerald-400/70">&apos;@/components&apos;</span></div>
                <div className="text-white/10">&nbsp;</div>
                <div><span className="text-violet-400/80">export</span> <span className="text-sky-400/70">default</span> <span className="text-amber-400/80">function</span> <span className="text-sky-300/80">Page</span><span className="text-white/30">() {"{"}</span></div>
                <div className="pl-4"><span className="text-violet-400/80">return</span> <span className="text-white/30">(</span></div>
                <div className="pl-8"><span className="text-sky-400/60">&lt;</span><span className="text-emerald-400/80">main</span><span className="text-sky-400/60">&gt;</span></div>
                <div className="pl-12"><span className="text-sky-400/60">&lt;</span><span className="text-amber-300/80">Hero</span> <span className="text-indigo-300/70">title</span><span className="text-white/20">=</span><span className="text-emerald-400/70">&quot;Votre site&quot;</span> <span className="text-sky-400/60">/&gt;</span></div>
                <div className="pl-12"><span className="text-sky-400/60">&lt;</span><span className="text-amber-300/80">Services</span> <span className="text-indigo-300/70">grid</span><span className="text-white/20">=</span><span className="text-white/30">{"{"}</span><span className="text-orange-400/70">3</span><span className="text-white/30">{"}"}</span> <span className="text-sky-400/60">/&gt;</span></div>
                <div className="pl-12"><span className="text-sky-400/60">&lt;</span><span className="text-amber-300/80">Contact</span> <span className="text-indigo-300/70">form</span> <span className="text-sky-400/60">/&gt;</span></div>
                <div className="pl-8"><span className="text-sky-400/60">&lt;/</span><span className="text-emerald-400/80">main</span><span className="text-sky-400/60">&gt;</span></div>
                <div className="pl-4"><span className="text-white/30">)</span></div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Lighthouse dashboard — front bottom right, overlapping browser edge ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.9, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-[4%] right-[2%] w-[50%] z-40"
        style={{ transform: "rotateY(-6deg) rotateX(3deg)", transformStyle: "preserve-3d" }}
      >
        <div className="rounded-xl border border-emerald-500/20 bg-[#0a0a18]/90 backdrop-blur-xl shadow-[0_15px_50px_-10px_rgba(16,185,129,0.12)] overflow-hidden">
          <div className="px-4 py-2.5 border-b border-white/[0.04] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Gauge size={12} weight="bold" className="text-emerald-400/80" />
              <span className="text-[9px] font-semibold text-white/50 font-mono">Lighthouse Report</span>
            </div>
            <span className="text-[7px] text-white/20 font-mono">votre-site.fr</span>
          </div>
          <div className="p-4">
            {/* Score circles */}
            <div className="flex items-center justify-around">
              {[
                { label: "Performance", score: 98, color: "text-emerald-400 border-emerald-500/40" },
                { label: "Accessibilité", score: 100, color: "text-emerald-400 border-emerald-500/40" },
                { label: "Bonnes pratiques", score: 100, color: "text-emerald-400 border-emerald-500/40" },
                { label: "SEO", score: 100, color: "text-emerald-400 border-emerald-500/40" },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 1.2 + i * 0.1, duration: 0.4 }}
                  className="flex flex-col items-center gap-1.5"
                >
                  <div className={`w-10 h-10 rounded-full border-2 ${item.color} flex items-center justify-center bg-emerald-500/[0.05]`}>
                    <span className="text-[11px] font-bold font-mono">{item.score}</span>
                  </div>
                  <span className="text-[6px] text-white/30 text-center leading-tight max-w-[50px]">{item.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Terminal — bottom left, tucked behind ── */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 1.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-[8%] left-[-1%] w-[38%] z-10"
        style={{ transform: "rotateY(-4deg) rotateX(3deg)", transformStyle: "preserve-3d" }}
      >
        <div className="rounded-lg border border-white/[0.06] bg-[#0a0a14]/80 backdrop-blur-xl shadow-lg overflow-hidden">
          <div className="px-3 py-1.5 border-b border-white/[0.04] flex items-center gap-1.5">
            <Terminal size={9} className="text-white/25" />
            <span className="text-[7px] text-white/25 font-mono">terminal</span>
          </div>
          <div className="p-3 font-mono text-[7px] leading-[2]">
            <div><span className="text-emerald-400/70">&gt;</span> <span className="text-white/40">npm run build</span></div>
            <div className="text-white/20">  Creating optimized build...</div>
            <div className="text-white/20">  <span className="text-emerald-400/50">✓</span> Compiled in 847ms</div>
            <div className="text-white/20">  <span className="text-emerald-400/50">✓</span> Generating static pages (7/7)</div>
            <div className="text-white/20">  <span className="text-emerald-400/50">✓</span> Collecting build traces</div>
            <div className="text-emerald-400/70">  <span className="text-emerald-400/80">✓</span> Build complete — ready to deploy</div>
          </div>
        </div>
      </motion.div>

      {/* ── Floating particles ── */}
      {[
        { top: "5%", left: "50%", size: 4, delay: 0.5, glow: true },
        { top: "20%", left: "92%", size: 3, delay: 0.7, glow: false },
        { top: "60%", left: "15%", size: 3, delay: 0.9, glow: false },
        { top: "85%", left: "80%", size: 4, delay: 1.1, glow: true },
        { top: "10%", left: "10%", size: 2, delay: 0.8, glow: false },
        { top: "45%", left: "95%", size: 2, delay: 1.0, glow: false },
        { top: "75%", left: "40%", size: 3, delay: 1.2, glow: false },
        { top: "35%", left: "5%", size: 2, delay: 0.6, glow: false },
      ].map((dot, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: dot.glow ? 0.8 : 0.4, scale: 1 } : {}}
          transition={{ delay: dot.delay, duration: 0.6 }}
          className={`absolute rounded-full ${dot.glow ? "bg-indigo-400/80 shadow-[0_0_8px_2px_rgba(129,140,248,0.4)]" : "bg-indigo-400/40"}`}
          style={{ top: dot.top, left: dot.left, width: dot.size, height: dot.size }}
          aria-hidden="true"
        />
      ))}

      {/* ── Connecting lines (subtle grid effect) ── */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        aria-hidden="true"
      >
        <line x1="20%" y1="80%" x2="50%" y2="50%" stroke="rgba(99,102,241,0.06)" strokeWidth="1" />
        <line x1="80%" y1="20%" x2="50%" y2="50%" stroke="rgba(99,102,241,0.06)" strokeWidth="1" />
        <line x1="85%" y1="85%" x2="55%" y2="55%" stroke="rgba(99,102,241,0.04)" strokeWidth="1" />
      </svg>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   Mobile illustration — layered composition:
   browser (cycling demos) + code snippet peek + lighthouse
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
      {/* Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-indigo-500/20 blur-[90px]"
        aria-hidden="true"
      />

      {/* ── Code snippet — peeking top-right behind browser ── */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="relative z-10 w-[55%] ml-auto mr-2 mb-[-28px]"
      >
        <div className="rounded-lg border border-indigo-500/15 bg-[#0a0a18]/80 backdrop-blur-xl shadow-lg overflow-hidden">
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 border-b border-white/[0.04] bg-white/[0.01]">
            <Code size={8} className="text-indigo-400/50" />
            <span className="text-[7px] text-white/35 font-mono">page.tsx</span>
          </div>
          <div className="p-2 font-mono text-[7px] leading-[1.8]">
            <div><span className="text-violet-400/70">export</span> <span className="text-sky-400/60">default</span> <span className="text-amber-400/70">function</span> <span className="text-sky-300/70">Page</span><span className="text-white/25">() {"{"}</span></div>
            <div className="pl-3"><span className="text-violet-400/70">return</span> <span className="text-white/25">(</span></div>
            <div className="pl-5"><span className="text-sky-400/50">&lt;</span><span className="text-amber-300/70">Hero</span> <span className="text-sky-400/50">/&gt;</span></div>
            <div className="pl-5"><span className="text-sky-400/50">&lt;</span><span className="text-amber-300/70">Services</span> <span className="text-sky-400/50">/&gt;</span></div>
            <div className="pl-3"><span className="text-white/25">)</span></div>
          </div>
        </div>
      </motion.div>

      {/* ── Main browser — cycling demos ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="relative z-20 cursor-pointer"
        onClick={() => onOpenGallery(activeDemo)}
      >
        <div className="rounded-xl border border-indigo-500/25 bg-[#0c0c1a]/90 backdrop-blur-xl shadow-[0_15px_60px_-10px_rgba(99,102,241,0.2)] overflow-hidden">
          {/* Chrome */}
          <div className="flex items-center gap-2 px-3 py-2 border-b border-white/[0.05] bg-white/[0.02]">
            <div className="flex gap-1.5">
              <div className="w-2 h-2 rounded-full bg-[#ff5f57]/70" />
              <div className="w-2 h-2 rounded-full bg-[#febc2e]/70" />
              <div className="w-2 h-2 rounded-full bg-[#28c840]/70" />
            </div>
            <div className="flex-1 flex justify-center">
              <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.06] text-[9px] text-white/30 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/60" />
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
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                {card.content}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* ── Lighthouse + Terminal row — overlapping bottom of browser ── */}
      <div className="relative z-30 flex gap-2 px-2 -mt-3">
        {/* Lighthouse */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="flex-1"
        >
          <div className="rounded-lg border border-emerald-500/20 bg-[#0a0a18]/90 backdrop-blur-xl shadow-lg overflow-hidden">
            <div className="px-2.5 py-1.5 border-b border-white/[0.04] flex items-center gap-1.5">
              <Gauge size={8} className="text-emerald-400/70" />
              <span className="text-[6px] font-medium text-white/40 font-mono">Lighthouse</span>
            </div>
            <div className="p-2 flex justify-around">
              {[
                { label: "Perf", score: "98" },
                { label: "A11y", score: "100" },
                { label: "SEO", score: "100" },
              ].map((item) => (
                <div key={item.label} className="flex flex-col items-center gap-0.5">
                  <div className="w-7 h-7 rounded-full border-[1.5px] border-emerald-500/40 text-emerald-400 flex items-center justify-center bg-emerald-500/[0.05]">
                    <span className="text-[8px] font-bold font-mono">{item.score}</span>
                  </div>
                  <span className="text-[5px] text-white/25">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Mini terminal */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="w-[38%] shrink-0"
        >
          <div className="rounded-lg border border-white/[0.06] bg-[#0a0a14]/85 backdrop-blur-xl shadow-lg overflow-hidden h-full">
            <div className="px-2 py-1.5 border-b border-white/[0.04] flex items-center gap-1">
              <Terminal size={7} className="text-white/25" />
              <span className="text-[6px] text-white/25 font-mono">terminal</span>
            </div>
            <div className="p-2 font-mono text-[6px] leading-[1.7]">
              <div><span className="text-emerald-400/60">&gt;</span> <span className="text-white/35">npm run build</span></div>
              <div className="text-white/15">  <span className="text-emerald-400/45">✓</span> Compiled 847ms</div>
              <div className="text-white/15">  <span className="text-emerald-400/45">✓</span> Static pages</div>
              <div className="text-emerald-400/60">  <span className="text-emerald-400/70">✓</span> Ready</div>
            </div>
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
      className="relative pt-20 sm:pt-24 md:pt-28 pb-8 sm:pb-10 md:pb-14 overflow-hidden"
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
            <motion.div variants={fadeInUp} className="mb-4 lg:mb-5">
              <span className="inline-flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-accent-border bg-background-elevated/80 backdrop-blur-sm text-xs sm:text-sm text-text-secondary">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-status-success opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-status-success" />
                </span>
                Disponible — Caen & remote
              </span>
            </motion.div>

            {/* H1 */}
            <motion.h1
              variants={fadeInUp}
              className="text-[1.75rem] sm:text-4xl md:text-5xl lg:text-[3.25rem] xl:text-[3.5rem] font-light tracking-[-0.03em] mb-3 lg:mb-4 leading-[1.15]"
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
              className="text-text-secondary text-[15px] sm:text-lg md:text-xl leading-[1.5] mb-5 lg:mb-7 max-w-[540px]"
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
              className="flex flex-col sm:flex-row gap-3 mb-3 lg:mb-4"
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
          className="mt-6 lg:hidden"
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
