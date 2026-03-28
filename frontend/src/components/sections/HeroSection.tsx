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
   Browser Window — reusable mini-browser chrome wrapper
   ────────────────────────────────────────────────────────── */

function BrowserWindow({
  url,
  children,
  accent = "indigo",
}: {
  url: string;
  children: React.ReactNode;
  accent?: "indigo" | "amber" | "neutral" | "blue";
}) {
  const glowMap = {
    indigo: "shadow-[0_8px_50px_-6px_rgba(99,102,241,0.35)]",
    amber: "shadow-[0_8px_50px_-6px_rgba(200,160,80,0.25)]",
    neutral: "shadow-[0_8px_50px_-6px_rgba(100,100,120,0.2)]",
    blue: "shadow-[0_8px_50px_-6px_rgba(30,95,170,0.25)]",
  };
  return (
    <div className={`rounded-xl border border-white/[0.08] bg-[#1a1a2e]/80 backdrop-blur-xl ${glowMap[accent]} overflow-hidden ring-1 ring-white/[0.04]`}>
      {/* Title bar — slightly lighter so it reads on dark bg */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-white/[0.08] bg-white/[0.04]">
        <div className="flex gap-1.5">
          <div className="w-[7px] h-[7px] rounded-full bg-[#ff5f57]" />
          <div className="w-[7px] h-[7px] rounded-full bg-[#febc2e]" />
          <div className="w-[7px] h-[7px] rounded-full bg-[#28c840]" />
        </div>
        <div className="flex-1 flex justify-center">
          <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-md bg-white/[0.06] border border-white/[0.08] text-[9px] text-white/40 font-mono tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/70" />
            {url}
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   Demo card previews — faithful mini-representations of real
   /demos/* pages, each with a distinct layout. Clicking opens
   the full demo page.
   ────────────────────────────────────────────────────────── */

const demoCards: {
  url: string;
  path: string;
  accent: "indigo" | "amber" | "neutral" | "blue";
  content: React.ReactNode;
}[] = [
  /* ── Boulangerie: warm hero + product grid (matches /demos/boulangerie) ── */
  {
    url: "boulangerie-martin.fr",
    path: "boulangerie",
    accent: "indigo",
    content: (
      <div className="bg-[#FFF8F0] h-[230px] flex flex-col">
        <div className="relative h-[120px] shrink-0 overflow-hidden">
          <Image src="https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=800&h=300&fit=crop&q=80" alt="" fill className="object-cover" sizes="500px" />
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
            { name: "Baguette tradition", price: "1,30 €", img: "https://images.unsplash.com/photo-1530610476181-d83430b64dcd?w=200&h=130&fit=crop&q=70" },
            { name: "Croissant", price: "1,40 €", img: "https://images.unsplash.com/photo-1623334044303-241021148842?w=200&h=130&fit=crop&q=70" },
            { name: "Tarte pommes", price: "3,80 €", img: "https://images.unsplash.com/photo-1568571780765-9276ac8b75a2?w=200&h=130&fit=crop&q=70" },
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

  /* ── Restaurant: dark full-bleed + centered text + nav bar (matches /demos/restaurant) ── */
  {
    url: "bistrot-normand.fr",
    path: "restaurant",
    accent: "amber",
    content: (
      <div className="bg-[#1A1A1A] h-[230px] flex flex-col">
        <div className="relative flex-1 overflow-hidden">
          <Image src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=400&fit=crop&q=80" alt="" fill className="object-cover" sizes="500px" />
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

  /* ── Architecte: light split layout — image left, text+stats right (matches /demos/architecte) ── */
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
            <Image src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop&q=80" alt="" fill className="object-cover" sizes="300px" />
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

  /* ── Plombier: blue header + service cards with icons + CTA (matches /demos/plombier) ── */
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
          <Image src="https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=800&h=300&fit=crop&q=80" alt="" fill className="object-cover" sizes="500px" />
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
   Floating Screens — animated card-stack carousel
   One card in front, others stacked behind, auto-cycling
   ────────────────────────────────────────────────────────── */

function FloatingScreens({
  isInView,
  active,
  onNext,
  onSelect,
  onOpenGallery,
}: {
  isInView: boolean;
  active: number;
  onNext: () => void;
  onSelect: (i: number) => void;
  onOpenGallery: (i: number) => void;
}) {
  const total = demoCards.length;

  /* Position config for each slot in the stack (0 = front) */
  const slotStyles = [
    { x: 0, y: 0, scale: 1, z: 40, opacity: 1 },       // front
    { x: 24, y: -16, scale: 0.94, z: 20, opacity: 0.7 },  // behind-right
    { x: 48, y: -32, scale: 0.88, z: 0, opacity: 0.45 },   // further back
    { x: 72, y: -48, scale: 0.82, z: -20, opacity: 0.25 }, // deepest
  ];

  return (
    <div
      className="relative w-full h-[480px] lg:h-[520px]"
      style={{ perspective: "1800px" }}
    >
      {/* Ambient glow */}
      <div
        className="absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full bg-indigo-500/12 blur-[110px]"
        aria-hidden="true"
      />

      {/* Card stack container — isometric tilt */}
      <div
        className="relative w-full h-full flex items-center justify-center"
        style={{
          transform: "rotateY(-10deg) rotateX(5deg)",
          transformStyle: "preserve-3d",
        }}
      >
        {demoCards.map((card, i) => {
          /* Which slot is this card in? 0 = front, 1 = behind, etc. */
          const slot = (i - active + total) % total;
          const s = slotStyles[slot];

          return (
            <motion.div
              key={card.url}
              animate={{
                x: s.x,
                y: s.y,
                scale: s.scale,
                opacity: isInView ? s.opacity : 0,
              }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-[8%] left-0 w-[95%] cursor-pointer"
              style={{
                zIndex: total - slot,
                transformStyle: "preserve-3d",
                transform: `translateZ(${s.z}px)`,
              }}
              onClick={() => slot === 0 ? onOpenGallery(i) : onNext()}
            >
              <BrowserWindow url={card.url} accent={card.accent}>
                {card.content}
              </BrowserWindow>
            </motion.div>
          );
        })}
      </div>

      {/* Navigation dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-50">
        {demoCards.map((card, i) => (
          <button
            key={card.url}
            onClick={() => onSelect(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === active
                ? "bg-indigo-400 shadow-[0_0_6px_2px_rgba(129,140,248,0.4)] scale-125"
                : "bg-white/20 hover:bg-white/40"
            }`}
            aria-label={`Voir ${card.url}`}
          />
        ))}
      </div>

      {/* Floating particles */}
      {[
        { top: "5%", left: "5%", size: 3, delay: 0.5, glow: true },
        { top: "15%", left: "95%", size: 2, delay: 0.7, glow: false },
        { top: "85%", left: "90%", size: 3, delay: 1.0, glow: true },
      ].map((dot, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: dot.glow ? 0.7 : 0.3, scale: 1 } : {}}
          transition={{ delay: dot.delay, duration: 0.5 }}
          className={`absolute rounded-full ${dot.glow ? "bg-indigo-400/80 shadow-[0_0_8px_3px_rgba(129,140,248,0.4)]" : "bg-white/20"}`}
          style={{ top: dot.top, left: dot.left, width: dot.size, height: dot.size }}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   Mobile-only simplified illustration — 2 overlapping demos
   ────────────────────────────────────────────────────────── */

function MobileIllustration({ isInView, onOpenGallery }: { isInView: boolean; onOpenGallery: (i: number) => void }) {
  return (
    <div className="relative">
      {/* Glow behind */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-40 rounded-full bg-indigo-500/12 blur-[60px]"
        aria-hidden="true"
      />

      {/* 2 demo previews — hero images only, clean and balanced */}
      <div className="relative grid grid-cols-2 gap-2">
        {/* Bakery — full hero image */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <button onClick={() => onOpenGallery(0)} className="block text-left w-full">
            <BrowserWindow url="boulangerie-martin.fr">
              <div className="relative h-[100px] overflow-hidden bg-[#FFF8F0]">
                <Image src="https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=300&h=200&fit=crop&q=60" alt="" fill className="object-cover" sizes="200px" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#3D2B1F]/90 via-[#3D2B1F]/30 to-transparent" />
                <div className="absolute bottom-0 inset-x-0 p-2.5">
                  <p className="text-[8px] font-light text-white/80">Pain artisanal,</p>
                  <p className="text-[9px] font-semibold text-[#E8C496]">fait avec passion.</p>
                </div>
              </div>
            </BrowserWindow>
          </button>
        </motion.div>

        {/* Restaurant — full hero image */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.45, duration: 0.5 }}
        >
          <button onClick={() => onOpenGallery(1)} className="block text-left w-full">
            <BrowserWindow url="bistrot-normand.fr" accent="amber">
              <div className="relative h-[100px] overflow-hidden bg-[#1A1A1A]">
                <Image src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300&h=200&fit=crop&q=60" alt="" fill className="object-cover" sizes="200px" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/90 via-[#1A1A1A]/30 to-transparent" />
                <div className="absolute bottom-0 inset-x-0 p-2.5 text-center">
                  <p className="text-[6px] text-[#C9A96E]/70 tracking-[0.15em] uppercase">Restaurant</p>
                  <p className="text-[10px] font-light text-white">Le Bistrot <span className="italic text-[#C9A96E]">Normand</span></p>
                </div>
              </div>
            </BrowserWindow>
          </button>
        </motion.div>
      </div>

      {/* See all demos */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.6, duration: 0.4 }}
        className="flex justify-center mt-2.5"
      >
        <button
          onClick={() => onOpenGallery(0)}
          className="inline-flex items-center gap-1.5 text-[11px] text-text-tertiary hover:text-accent-action transition-colors"
        >
          Voir les 4 démos
          <ArrowDown size={11} />
        </button>
      </motion.div>
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
      {/* Background layers */}
      <div
        className="absolute inset-0 gradient-mesh pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-dot-pattern opacity-30 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 grain-overlay pointer-events-none"
        aria-hidden="true"
      />
      {/* Extra central glow for depth */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[300px] sm:w-[600px] h-[200px] sm:h-[400px] rounded-full bg-accent-action/8 blur-[80px] sm:blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 container-main">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left — Content */}
          <motion.div
            initial="initial"
            animate={isHeroInView ? "animate" : "initial"}
            variants={staggerContainer}
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
              {/* Mobile: FlipWord on its own line so width changes don't shift text */}
              <span className="sm:hidden">
                Un site web<br />
                <span className="font-semibold text-accent-action">
                  <FlipWords words={flipWords} activeIndex={activeDemo} />
                </span>
                <br />
                <span className="font-semibold">pour votre entreprise</span>
                <span className="text-accent-action">.</span>
              </span>
              {/* Desktop: original flow */}
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

            {/* Subtitle — shorter on mobile */}
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

            {/* CTAs — single primary on mobile, dual on sm+ */}
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
            <FloatingScreens isInView={isHeroInView} active={activeDemo} onNext={nextDemo} onSelect={setActiveDemo} onOpenGallery={(i) => setGalleryOpen(i)} />
          </motion.div>
        </div>

        {/* Mobile illustration — compact single demo preview */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="mt-6 lg:hidden"
        >
          <MobileIllustration isInView={isHeroInView} onOpenGallery={(i) => setGalleryOpen(i)} />
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
