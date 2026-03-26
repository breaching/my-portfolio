"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
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
  Phone,
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
   Floating Screens Illustration — 3D isometric browser windows
   Inspired by the premium freelance landing page mockup
   ────────────────────────────────────────────────────────── */

function FloatingScreens({ isInView }: { isInView: boolean }) {
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

      {/* ── Main browser window — front, largest, angled ── */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.4, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-[8%] left-[3%] w-[78%] z-30"
        style={{ transform: "rotateY(-12deg) rotateX(8deg)", transformStyle: "preserve-3d" }}
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
                boulangerie-martin.fr
              </div>
            </div>
          </div>

          {/* Realistic mini-site content */}
          <div className="bg-[#08080f]">
            {/* Navbar */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.04]">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-md bg-gradient-to-br from-amber-500/40 to-orange-600/30 flex items-center justify-center text-[8px]">🥖</div>
                <span className="text-[10px] font-semibold text-white/70">Boulangerie Martin</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[9px] text-white/30">Nos pains</span>
                <span className="text-[9px] text-white/30">À propos</span>
                <span className="text-[9px] text-white/30">Horaires</span>
                <span className="text-[9px] px-2.5 py-1 rounded-md bg-indigo-500/25 text-indigo-300/90 font-medium">Contact</span>
              </div>
            </div>

            {/* Hero section */}
            <div className="px-5 py-5">
              <div className="flex gap-5 items-start">
                <div className="flex-1 space-y-2.5">
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.8, duration: 0.5 }}
                  >
                    <p className="text-[13px] font-bold text-white/85 leading-tight tracking-tight">
                      Pain artisanal,
                    </p>
                    <p className="text-[13px] font-bold leading-tight tracking-tight">
                      <span className="text-indigo-400/90">fait avec passion.</span>
                    </p>
                  </motion.div>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 1.0, duration: 0.4 }}
                    className="text-[8px] text-white/30 leading-relaxed max-w-[180px]"
                  >
                    Depuis 1987 au cœur de Caen. Farines bio, levain naturel, cuisson au feu de bois.
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 1.15, duration: 0.4 }}
                    className="flex items-center gap-2 pt-1"
                  >
                    <div className="px-3 py-1 rounded-md bg-indigo-500/30 text-[8px] text-indigo-300 font-medium">
                      Nous trouver
                    </div>
                    <div className="px-3 py-1 rounded-md border border-white/[0.08] text-[8px] text-white/40">
                      Commander
                    </div>
                  </motion.div>
                </div>
                {/* Image placeholder */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.9, duration: 0.6 }}
                  className="w-32 h-20 rounded-lg bg-gradient-to-br from-amber-900/30 via-orange-800/20 to-amber-700/15 border border-white/[0.06] flex items-center justify-center shrink-0 overflow-hidden"
                >
                  <span className="text-2xl opacity-40">🥐</span>
                </motion.div>
              </div>
            </div>

            {/* Product categories */}
            <div className="px-5 pb-4">
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { name: "Pains", icon: "🥖", desc: "Tradition, Campagne..." },
                  { name: "Viennoiseries", icon: "🥐", desc: "Croissants, Pains au..." },
                  { name: "Pâtisseries", icon: "🎂", desc: "Tartes, Éclairs..." },
                ].map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 1.3 + i * 0.1, duration: 0.4 }}
                    className="text-center p-3 rounded-lg border border-white/[0.05] bg-white/[0.02] hover:border-indigo-500/20 transition-colors"
                  >
                    <span className="text-base">{item.icon}</span>
                    <p className="text-[9px] font-medium text-white/60 mt-1.5">{item.name}</p>
                    <p className="text-[7px] text-white/25 mt-0.5">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Footer bar */}
            <div className="px-5 py-2.5 border-t border-white/[0.04] flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <MapPin size={9} className="text-indigo-400/70" />
                <span className="text-[8px] text-white/25">12 rue Saint-Pierre, 14000 Caen</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone size={9} className="text-white/20" />
                <span className="text-[8px] text-white/25">02 31 86 ...</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Code editor — back right, overlapping ── */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-[0%] right-[-5%] w-[55%] z-20"
        style={{ transform: "rotateY(-16deg) rotateX(10deg)", transformStyle: "preserve-3d" }}
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

      {/* ── Lighthouse dashboard — front bottom right ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.9, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-[2%] right-[0%] w-[52%] z-40"
        style={{ transform: "rotateY(-8deg) rotateX(4deg)", transformStyle: "preserve-3d" }}
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

      {/* ── Terminal — bottom left, subtle ── */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 1.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-[15%] left-[-3%] w-[40%] z-10"
        style={{ transform: "rotateY(-6deg) rotateX(5deg)", transformStyle: "preserve-3d" }}
      >
        <div className="rounded-lg border border-white/[0.06] bg-[#0a0a14]/80 backdrop-blur-xl shadow-lg overflow-hidden">
          <div className="px-3 py-1.5 border-b border-white/[0.04] flex items-center gap-1.5">
            <Terminal size={9} className="text-white/25" />
            <span className="text-[7px] text-white/25 font-mono">terminal</span>
          </div>
          <div className="p-3 font-mono text-[7px] leading-[2]">
            <div><span className="text-emerald-400/70">❯</span> <span className="text-white/40">npm run build</span></div>
            <div className="text-white/20">  ▸ Creating optimized build...</div>
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
   Mobile-only simplified illustration
   ────────────────────────────────────────────────────────── */

function MobileIllustration({ isInView }: { isInView: boolean }) {
  return (
    <div className="relative w-full max-w-md mx-auto h-[320px]">
      {/* Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-indigo-500/20 blur-[80px]"
        aria-hidden="true"
      />

      {/* Main browser */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="relative z-20 w-[85%] mx-auto"
      >
        <div className="rounded-xl border border-indigo-500/25 bg-[#0c0c1a]/90 backdrop-blur-xl shadow-[0_15px_60px_-10px_rgba(99,102,241,0.2)] overflow-hidden">
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
          {/* Content */}
          <div className="p-4 space-y-3">
            <div className="space-y-1.5">
              <div className="h-2.5 w-[60%] rounded-full bg-white/15" />
              <div className="h-2.5 w-[40%] rounded-full bg-indigo-400/20" />
            </div>
            <div className="h-1.5 w-[75%] rounded-full bg-white/8" />
            <div className="flex gap-2 pt-1">
              <div className="h-5 w-16 rounded-md bg-indigo-500/30" />
              <div className="h-5 w-16 rounded-md border border-white/[0.08]" />
            </div>
            <div className="grid grid-cols-3 gap-2 pt-2">
              {["🥖", "🥐", "🎂"].map((icon) => (
                <div key={icon} className="text-center p-2 rounded-lg border border-white/[0.04] bg-white/[0.02]">
                  <span className="text-sm">{icon}</span>
                  <div className="h-1 w-full rounded-full bg-white/8 mt-1.5" />
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
        className="absolute bottom-0 right-[5%] w-[60%] z-30"
      >
        <div className="rounded-lg border border-emerald-500/20 bg-[#0a0a18]/90 backdrop-blur-xl shadow-lg overflow-hidden">
          <div className="px-3 py-1.5 border-b border-white/[0.04] flex items-center gap-1.5">
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
                <div className="w-8 h-8 rounded-full border-2 border-emerald-500/40 text-emerald-400 flex items-center justify-center bg-emerald-500/[0.05]">
                  <span className="text-[9px] font-bold font-mono">{item.score}</span>
                </div>
                <span className="text-[6px] text-white/25">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
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

            {/* H1 — close to the mockup */}
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

          {/* Right — Floating screens illustration (desktop) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isHeroInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="hidden lg:block"
          >
            <FloatingScreens isInView={isHeroInView} />
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
