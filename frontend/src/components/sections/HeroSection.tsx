"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import {
  EnvelopeSimple,
  ArrowDown,
  CurrencyEur,
  Clock,
  CheckCircle,
  MapPin,
  Star,
  Wrench,
} from "@phosphor-icons/react";
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
   Demo card contents — each card is a React node
   ────────────────────────────────────────────────────────── */

const demoCards: { url: string; accent: "indigo" | "amber" | "neutral" | "blue"; content: React.ReactNode }[] = [
  {
    url: "boulangerie-martin.fr",
    accent: "indigo",
    content: (
      <div className="bg-[#FFF8F0]">
        <div className="relative h-[130px] overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=800&h=300&fit=crop&q=80"
            alt="" fill className="object-cover" sizes="500px"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#3D2B1F]/80 via-[#3D2B1F]/50 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-center px-5">
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/10 border border-white/15 text-[8px] text-white/80 mb-1.5 w-fit">
              <MapPin size={8} weight="fill" />
              Caen
            </div>
            <p className="text-[15px] font-light text-white leading-tight">Pain artisanal,</p>
            <p className="text-[15px] font-semibold text-[#E8C496] leading-tight">fait avec passion.</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 p-3">
          {[
            { name: "Baguette", price: "1,20 €", img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200&h=130&fit=crop&q=70" },
            { name: "Tarte citron", price: "3,50 €", img: "https://images.unsplash.com/photo-1568571780765-9276ac8b75a2?w=200&h=130&fit=crop&q=70" },
            { name: "Fougasse", price: "2,80 €", img: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=200&h=130&fit=crop&q=70" },
          ].map((item) => (
            <div key={item.name} className="rounded-lg border border-[#E8D5C0]/50 bg-white overflow-hidden">
              <div className="relative h-[48px]">
                <Image src={item.img} alt="" fill className="object-cover" sizes="150px" />
              </div>
              <div className="px-1.5 py-1">
                <p className="text-[8px] font-medium text-[#3D2B1F] truncate">{item.name}</p>
                <p className="text-[7px] text-[#8B7355]">{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    url: "bistrot-normand.fr",
    accent: "amber",
    content: (
      <div className="bg-[#1A1A1A]">
        <div className="relative h-[120px] overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=300&fit=crop&q=80"
            alt="" fill className="object-cover" sizes="500px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/40 to-transparent" />
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-3">
            <p className="text-[8px] text-[#C9A96E] tracking-[0.2em] uppercase mb-0.5">Restaurant gastronomique</p>
            <p className="text-base font-light text-white">Le Bistrot <span className="italic text-[#C9A96E]">Normand</span></p>
          </div>
        </div>
        <div className="p-3.5 space-y-2">
          {[
            { name: "Tartare de boeuf normand", price: "18 €" },
            { name: "Camembert rôti au miel", price: "14 €" },
            { name: "Tarte tatin maison", price: "12 €" },
          ].map((item) => (
            <div key={item.name} className="flex items-center justify-between py-1.5 border-b border-white/[0.06]">
              <span className="text-[9px] text-white/70">{item.name}</span>
              <span className="text-[9px] text-[#C9A96E] font-light">{item.price}</span>
            </div>
          ))}
          <div className="flex items-center gap-0.5 pt-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={8} weight="fill" className="text-[#C9A96E]" />
            ))}
            <span className="text-[7px] text-white/30 ml-1.5">4.8/5</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    url: "studio-morel.fr",
    accent: "neutral",
    content: (
      <div className="bg-white">
        <div className="relative h-[120px] overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&h=250&fit=crop&q=80"
            alt="" fill className="object-cover" sizes="500px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />
          <div className="absolute bottom-3 left-4">
            <p className="text-[8px] text-neutral-400 tracking-[0.15em] uppercase">Architecture d&apos;intérieur</p>
            <p className="text-[14px] font-light text-neutral-900">Des espaces qui vous <span className="italic">ressemblent.</span></p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 p-3">
          {[
            { title: "Loft Vaugueux", tag: "Rénovation", img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=200&h=130&fit=crop&q=70" },
            { title: "Maison Ouistreham", tag: "Neuf", img: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=200&h=130&fit=crop&q=70" },
          ].map((p) => (
            <div key={p.title} className="rounded-lg overflow-hidden border border-neutral-100">
              <div className="relative h-[48px]">
                <Image src={p.img} alt="" fill className="object-cover" sizes="150px" />
              </div>
              <div className="px-2 py-1.5">
                <p className="text-[6px] text-neutral-400 uppercase tracking-wider">{p.tag}</p>
                <p className="text-[8px] font-medium text-neutral-900 truncate">{p.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    url: "dupont-plomberie.fr",
    accent: "blue",
    content: (
      <div className="bg-gradient-to-b from-[#F0F6FF] to-white p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 rounded bg-[#1E5FAA] flex items-center justify-center">
            <Wrench size={12} weight="bold" className="text-white" />
          </div>
          <span className="text-[10px] font-semibold text-neutral-900">Dupont Plomberie</span>
        </div>
        <p className="text-[13px] font-bold text-neutral-900 leading-tight mb-1.5">
          Votre plombier <span className="text-[#1E5FAA]">de confiance</span>
        </p>
        <p className="text-[8px] text-neutral-500 mb-3">Dépannage urgent 7j/7, Caen et alentours</p>
        <div className="flex gap-2 mb-3">
          <div className="flex-1 rounded-lg bg-[#1E5FAA] text-center py-2">
            <span className="text-[8px] text-white font-medium">Urgence 7j/7</span>
          </div>
          <div className="flex-1 rounded-lg border border-neutral-200 text-center py-2">
            <span className="text-[8px] text-neutral-600 font-medium">Devis gratuit</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-[7px] text-neutral-400">
          <CheckCircle size={10} weight="fill" className="text-emerald-500" />
          Intervention en moins de 2h
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
}: {
  isInView: boolean;
  active: number;
  onNext: () => void;
  onSelect: (i: number) => void;
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
              onClick={onNext}
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

function MobileIllustration({ isInView }: { isInView: boolean }) {
  return (
    <div className="relative w-full max-w-md mx-auto h-[320px]">
      {/* Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-indigo-500/20 blur-[80px]"
        aria-hidden="true"
      />

      {/* Main — Bakery browser */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="relative z-20 w-[80%]"
      >
        <BrowserWindow url="boulangerie-martin.fr">
          <div className="bg-[#FFF8F0]">
            <div className="relative h-[72px] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=400&h=150&fit=crop&q=70"
                alt="" fill className="object-cover" sizes="300px"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#3D2B1F]/80 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-center px-4">
                <p className="text-[10px] font-light text-white">Pain artisanal,</p>
                <p className="text-[10px] font-semibold text-[#E8C496]">fait avec passion.</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-1.5 p-2.5">
              {[
                { name: "Baguette", img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=120&h=80&fit=crop&q=60" },
                { name: "Tarte", img: "https://images.unsplash.com/photo-1568571780765-9276ac8b75a2?w=120&h=80&fit=crop&q=60" },
                { name: "Fougasse", img: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=120&h=80&fit=crop&q=60" },
              ].map((item) => (
                <div key={item.name} className="rounded-md border border-[#E8D5C0]/40 bg-white overflow-hidden">
                  <div className="relative h-[28px]">
                    <Image src={item.img} alt="" fill className="object-cover" sizes="100px" />
                  </div>
                  <p className="text-[6px] font-medium text-[#3D2B1F] px-1 py-0.5 truncate">{item.name}</p>
                </div>
              ))}
            </div>
          </div>
        </BrowserWindow>
      </motion.div>

      {/* Overlapping — Restaurant browser */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="absolute bottom-0 right-[0%] w-[65%] z-30"
      >
        <BrowserWindow url="bistrot-normand.fr" accent="amber">
          <div className="bg-[#1A1A1A]">
            <div className="relative h-[60px] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=150&fit=crop&q=70"
                alt="" fill className="object-cover" sizes="250px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/50 to-transparent" />
              <div className="absolute bottom-2 left-0 right-0 text-center">
                <p className="text-[6px] text-[#C9A96E] tracking-[0.15em] uppercase">Restaurant</p>
                <p className="text-[10px] font-light text-white">Le Bistrot <span className="italic text-[#C9A96E]">Normand</span></p>
              </div>
            </div>
            <div className="p-2.5 space-y-1">
              {[
                { name: "Tartare de boeuf", price: "18 €" },
                { name: "Camembert rôti", price: "14 €" },
              ].map((item) => (
                <div key={item.name} className="flex justify-between border-b border-white/[0.06] pb-1">
                  <span className="text-[7px] text-white/60">{item.name}</span>
                  <span className="text-[7px] text-[#C9A96E]">{item.price}</span>
                </div>
              ))}
            </div>
          </div>
        </BrowserWindow>
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
      className="relative pt-24 md:pt-32 pb-16 md:pb-24 overflow-hidden"
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
          >
            {/* Availability badge */}
            <motion.div variants={fadeInUp} className="mb-8">
              <span className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-accent-border bg-background-elevated/80 backdrop-blur-sm text-sm text-text-secondary">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-status-success opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-status-success" />
                </span>
                Disponible — Caen & remote
              </span>
            </motion.div>

            {/* H1 — close to the mockup */}
            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[3.5rem] xl:text-6xl font-light tracking-[-0.03em] mb-6 leading-[1.1]"
            >
              Un site web
              <br />
              <span className="font-semibold text-accent-action">
                <FlipWords words={flipWords} activeIndex={activeDemo} />
              </span>
              <br />
              <span className="font-semibold">pour votre entreprise</span>
              <span className="text-accent-action">.</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeInUp}
              className="text-text-secondary text-lg md:text-xl leading-[1.65] mb-10 max-w-[540px]"
            >
              Développeur web freelance en Normandie. Je crée des sites
              vitrines sur mesure qui inspirent confiance — et vous
              amènent des clients.
            </motion.p>

            {/* Dual CTAs */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 mb-6"
            >
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("contact");
                }}
                className="btn-glow inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-accent-action text-background font-medium rounded-lg hover:bg-accent-action-hover transition-all text-base shadow-[0_0_20px_var(--accent-action-glow)]"
              >
                <EnvelopeSimple size={20} weight="bold" />
                <span>Demander un devis gratuit</span>
              </a>
              <a
                href="#realisations"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("realisations");
                }}
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-lg border border-accent-border text-text-secondary hover:text-text-primary hover:border-accent-action/50 transition-all text-base backdrop-blur-sm bg-background-elevated/30"
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
            <FloatingScreens isInView={isHeroInView} active={activeDemo} onNext={nextDemo} onSelect={setActiveDemo} />
          </motion.div>
        </div>

        {/* Mobile illustration */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-8 lg:hidden"
        >
          <MobileIllustration isInView={isHeroInView} />
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            delay: 0.6,
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="mt-16"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="group flex items-center gap-4 p-5 rounded-xl border border-accent-border bg-background-elevated/60 backdrop-blur-sm hover:border-accent-action/40 transition-all duration-300"
                >
                  <div className="flex items-center justify-center w-11 h-11 rounded-lg bg-accent-action-subtle border border-accent-action/20 shrink-0">
                    <Icon
                      size={22}
                      weight="duotone"
                      className="text-accent-action"
                    />
                  </div>
                  <div>
                    <p className="text-xl font-medium text-text-primary font-mono leading-tight">
                      <NumberTicker
                        value={stat.value}
                        suffix={stat.suffix}
                        delay={0.6}
                      />
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
    </section>
  );
}
