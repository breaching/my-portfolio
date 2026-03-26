"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import {
  EnvelopeSimple,
  ArrowDown,
  CurrencyEur,
  Clock,
  CheckCircle,
  Gauge,
  MapPin,
  Phone,
  Star,
  ArrowUpRight,
} from "@phosphor-icons/react";
import { scrollToSection } from "@/lib/scroll";
import { FlipWords } from "@/components/ui/FlipWords";
import { NumberTicker } from "@/components/ui/NumberTicker";

const flipWords = ["moderne", "performant", "sur mesure", "qui convertit", "rapide"];

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
   Browser Mockup — Real demo site preview
   Clean single-window approach with live bakery content
   ────────────────────────────────────────────────────────── */

function BrowserMockup({ isInView }: { isInView: boolean }) {
  return (
    <div className="relative w-full h-[520px] lg:h-[580px]" style={{ perspective: "1200px" }}>
      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[350px] rounded-full bg-indigo-500/20 blur-[100px]"
        aria-hidden="true"
      />
      <div
        className="absolute top-[25%] left-[60%] w-48 h-48 rounded-full bg-violet-600/10 blur-[60px]"
        aria-hidden="true"
      />

      {/* ── Main browser window ── */}
      <motion.div
        initial={{ opacity: 0, y: 40, rotateX: 15 }}
        animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
        transition={{ delay: 0.35, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-x-0 top-0 z-20 mx-auto w-[95%]"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="rounded-xl border border-white/[0.08] bg-[#0c0c1a]/95 backdrop-blur-xl shadow-[0_25px_80px_-15px_rgba(99,102,241,0.3),0_0_0_1px_rgba(99,102,241,0.08)] overflow-hidden">
          {/* Browser chrome */}
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/[0.06] bg-white/[0.02]">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]/70" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]/70" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]/70" />
            </div>
            <div className="flex-1 flex justify-center">
              <div className="flex items-center gap-2 px-4 py-1 rounded-md bg-white/[0.04] border border-white/[0.06] text-[10px] text-white/30 font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400/60" />
                boulangerie-martin.fr
              </div>
            </div>
          </div>

          {/* Site content — realistic bakery preview */}
          <div className="bg-[#FFF8F0]">
            {/* Mini navbar */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-[#E8D5C0]/40">
              <span className="text-[10px] font-semibold text-[#3D2B1F]">Boulangerie Martin</span>
              <div className="flex items-center gap-3">
                <span className="text-[8px] text-[#6B5344]/60">Nos pains</span>
                <span className="text-[8px] text-[#6B5344]/60">Notre histoire</span>
                <span className="text-[8px] text-[#6B5344]/60">Avis</span>
                <span className="text-[8px] px-2 py-0.5 rounded-full bg-[#8B5E3C] text-white font-medium">Nous trouver</span>
              </div>
            </div>

            {/* Hero with real image */}
            <div className="relative h-[140px] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=600&h=250&fit=crop&q=80"
                alt=""
                fill
                className="object-cover"
                sizes="400px"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#3D2B1F]/85 via-[#3D2B1F]/60 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-center px-5">
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.7, duration: 0.5 }}
                >
                  <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/10 border border-white/15 text-[7px] text-white/70 mb-2">
                    <MapPin size={7} weight="fill" />
                    12 Rue Saint-Pierre, Caen
                  </div>
                  <p className="text-[14px] font-light text-white leading-tight">
                    Pain artisanal,
                  </p>
                  <p className="text-[14px] font-semibold text-[#E8C496] leading-tight">
                    fait avec passion.
                  </p>
                  <p className="text-[7px] text-white/50 mt-1.5 max-w-[180px] leading-relaxed">
                    Depuis 1987, la famille Martin perpétue la tradition du pain au levain naturel.
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="px-2.5 py-1 rounded-full bg-[#E8C496] text-[7px] text-[#3D2B1F] font-medium">
                      Découvrir nos pains
                    </div>
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={7} weight="fill" className="text-[#E8C496]" />
                      ))}
                      <span className="text-[6px] text-white/40 ml-1">4.9/5</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Products grid with real images */}
            <div className="px-4 py-3">
              <p className="text-[7px] font-medium text-[#8B5E3C] tracking-widest uppercase mb-2">Nos spécialités</p>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { name: "Baguette tradition", price: "1,30 €", img: "https://images.unsplash.com/photo-1549931319-a545753467c8?w=200&h=120&fit=crop&q=70" },
                  { name: "Pain au levain", price: "4,50 €", img: "https://images.unsplash.com/photo-1585478259715-876acc5be8eb?w=200&h=120&fit=crop&q=70" },
                  { name: "Croissant pur beurre", price: "1,40 €", img: "https://images.unsplash.com/photo-1555507036-ab1f4038024a?w=200&h=120&fit=crop&q=70" },
                ].map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 8 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.9 + i * 0.1, duration: 0.4 }}
                    className="rounded-lg border border-[#E8D5C0]/40 bg-white overflow-hidden"
                  >
                    <div className="relative h-[48px]">
                      <Image
                        src={item.img}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="130px"
                      />
                    </div>
                    <div className="px-2 py-1.5">
                      <p className="text-[7px] font-semibold text-[#3D2B1F] truncate">{item.name}</p>
                      <p className="text-[7px] font-mono text-[#8B5E3C]">{item.price}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Footer bar */}
            <div className="px-4 py-2 border-t border-[#E8D5C0]/30 flex items-center justify-between bg-[#FAF3EB]">
              <div className="flex items-center gap-1">
                <MapPin size={8} className="text-[#8B5E3C]" />
                <span className="text-[7px] text-[#6B5344]/60">12 rue Saint-Pierre, 14000 Caen</span>
              </div>
              <div className="flex items-center gap-1">
                <Phone size={8} className="text-[#8B5E3C]/60" />
                <span className="text-[7px] text-[#6B5344]/60">02 31 00 00 00</span>
              </div>
            </div>
          </div>
        </div>

        {/* "Voir la démo" link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.4, duration: 0.4 }}
          className="mt-3 text-center"
        >
          <a
            href="/demos/boulangerie"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[11px] text-text-tertiary hover:text-accent-action transition-colors"
          >
            Voir la démo interactive
            <ArrowUpRight size={12} />
          </a>
        </motion.div>
      </motion.div>

      {/* ── Lighthouse overlay — floating bottom right ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 1.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-[2%] right-[-3%] w-[48%] z-30"
      >
        <div className="rounded-xl border border-emerald-500/20 bg-[#0a0a18]/92 backdrop-blur-xl shadow-[0_15px_50px_-10px_rgba(16,185,129,0.15)] overflow-hidden">
          <div className="px-3.5 py-2 border-b border-white/[0.04] flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Gauge size={11} weight="bold" className="text-emerald-400/80" />
              <span className="text-[8px] font-semibold text-white/50 font-mono">Lighthouse</span>
            </div>
            <span className="text-[7px] text-white/20 font-mono">boulangerie-martin.fr</span>
          </div>
          <div className="p-3">
            <div className="flex items-center justify-around">
              {[
                { label: "Performance", score: 98 },
                { label: "Accessibilité", score: 100 },
                { label: "Best Practices", score: 100 },
                { label: "SEO", score: 100 },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 1.3 + i * 0.08, duration: 0.35 }}
                  className="flex flex-col items-center gap-1"
                >
                  <div className="w-9 h-9 rounded-full border-2 border-emerald-500/40 text-emerald-400 flex items-center justify-center bg-emerald-500/[0.05]">
                    <span className="text-[10px] font-bold font-mono">{item.score}</span>
                  </div>
                  <span className="text-[5.5px] text-white/30 text-center leading-tight max-w-[45px]">{item.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   Mobile illustration — simplified browser mockup
   ────────────────────────────────────────────────────────── */

function MobileIllustration({ isInView }: { isInView: boolean }) {
  return (
    <div className="relative w-full max-w-md mx-auto h-[350px]">
      {/* Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-indigo-500/20 blur-[80px]"
        aria-hidden="true"
      />

      {/* Browser frame */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="relative z-20 w-[90%] mx-auto"
      >
        <div className="rounded-xl border border-indigo-500/20 bg-[#0c0c1a]/90 backdrop-blur-xl shadow-[0_20px_60px_-10px_rgba(99,102,241,0.2)] overflow-hidden">
          {/* Chrome */}
          <div className="flex items-center gap-2 px-3 py-2 border-b border-white/[0.05] bg-white/[0.02]">
            <div className="flex gap-1.5">
              <div className="w-2 h-2 rounded-full bg-[#ff5f57]/70" />
              <div className="w-2 h-2 rounded-full bg-[#febc2e]/70" />
              <div className="w-2 h-2 rounded-full bg-[#28c840]/70" />
            </div>
            <div className="flex-1 text-center">
              <span className="text-[8px] text-white/25 font-mono">boulangerie-martin.fr</span>
            </div>
          </div>

          {/* Content — bakery preview with real image */}
          <div className="bg-[#FFF8F0]">
            <div className="relative h-[100px] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=400&h=180&fit=crop&q=75"
                alt=""
                fill
                className="object-cover"
                sizes="350px"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#3D2B1F]/85 via-[#3D2B1F]/50 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-center px-4">
                <p className="text-[11px] font-light text-white leading-tight">Pain artisanal,</p>
                <p className="text-[11px] font-semibold text-[#E8C496] leading-tight">fait avec passion.</p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="px-2 py-0.5 rounded-full bg-[#E8C496] text-[6px] text-[#3D2B1F] font-medium">
                    Découvrir
                  </div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={6} weight="fill" className="text-[#E8C496]" />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Products */}
            <div className="grid grid-cols-3 gap-1.5 p-3">
              {[
                { name: "Baguette", img: "https://images.unsplash.com/photo-1549931319-a545753467c8?w=150&h=90&fit=crop&q=60" },
                { name: "Levain", img: "https://images.unsplash.com/photo-1585478259715-876acc5be8eb?w=150&h=90&fit=crop&q=60" },
                { name: "Croissant", img: "https://images.unsplash.com/photo-1555507036-ab1f4038024a?w=150&h=90&fit=crop&q=60" },
              ].map((item) => (
                <div key={item.name} className="rounded-md border border-[#E8D5C0]/40 bg-white overflow-hidden">
                  <div className="relative h-[36px]">
                    <Image src={item.img} alt="" fill className="object-cover" sizes="100px" />
                  </div>
                  <p className="text-[6px] font-semibold text-[#3D2B1F] px-1.5 py-1 truncate">{item.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Lighthouse overlay */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="absolute bottom-0 right-[2%] w-[58%] z-30"
      >
        <div className="rounded-lg border border-emerald-500/20 bg-[#0a0a18]/92 backdrop-blur-xl shadow-lg overflow-hidden">
          <div className="px-2.5 py-1.5 border-b border-white/[0.04] flex items-center gap-1.5">
            <Gauge size={9} className="text-emerald-400/70" />
            <span className="text-[7px] font-medium text-white/40 font-mono">Lighthouse</span>
          </div>
          <div className="p-2.5 flex justify-around">
            {[
              { label: "Perf", score: "98" },
              { label: "A11y", score: "100" },
              { label: "SEO", score: "100" },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center gap-1">
                <div className="w-7 h-7 rounded-full border-2 border-emerald-500/40 text-emerald-400 flex items-center justify-center bg-emerald-500/[0.05]">
                  <span className="text-[8px] font-bold font-mono">{item.score}</span>
                </div>
                <span className="text-[5px] text-white/25">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Demo link */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 1.0, duration: 0.4 }}
        className="mt-3 text-center relative z-20"
      >
        <a
          href="/demos/boulangerie"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-[11px] text-text-tertiary hover:text-accent-action transition-colors"
        >
          Voir la démo interactive
          <ArrowUpRight size={12} />
        </a>
      </motion.div>
    </div>
  );
}

export function HeroSection() {
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true, margin: "-50px" });

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

            {/* H1 */}
            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[3.5rem] xl:text-6xl font-light tracking-[-0.03em] mb-6 leading-[1.1]"
            >
              Un site web
              <br />
              <span className="font-semibold text-accent-action">
                <FlipWords words={flipWords} duration={2800} />
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

          {/* Right — Browser mockup (desktop) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isHeroInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="hidden lg:block"
          >
            <BrowserMockup isInView={isHeroInView} />
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
