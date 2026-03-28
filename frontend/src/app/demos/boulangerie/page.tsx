"use client";

import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Star,
  NavigationArrow,
  InstagramLogo,
  FacebookLogo,
  Envelope,
} from "@phosphor-icons/react";
import Image from "next/image";

/* ─── Animations ─── */
const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

/* ─── Data ─── */
const specialties = [
  {
    name: "Baguette tradition",
    description: "Farine Label Rouge, 24h de fermentation",
    price: "1,30 €",
    image: "/images/demos/boulangerie-pain.jpg",
  },
  {
    name: "Pain au levain",
    description: "Levain naturel, cuisson au feu de bois",
    price: "4,50 €",
    image: "/images/demos/boulangerie-viennoiserie.jpg",
  },
  {
    name: "Croissant pur beurre",
    description: "Beurre AOP Charentes-Poitou, feuilletage 72 couches",
    price: "1,40 €",
    image: "/images/demos/boulangerie-croissant.jpg",
  },
  {
    name: "Pain aux noix",
    description: "Noix du Périgord, mie dense et parfumée",
    price: "5,20 €",
    image: "/images/demos/boulangerie-sandwich.jpg",
  },
  {
    name: "Tarte aux pommes",
    description: "Pommes Normandie, pâte feuilletée maison",
    price: "3,80 €",
    image: "/images/demos/boulangerie-tarte.jpg",
  },
  {
    name: "Fougasse aux olives",
    description: "Olives noires de Nyons, herbes de Provence",
    price: "3,20 €",
    image: "/images/demos/boulangerie-macaron.jpg",
  },
];

const reviews = [
  { name: "Marie L.", text: "Le meilleur pain de Caen, sans hésiter. La baguette tradition est incroyable.", rating: 5 },
  { name: "Jean-Pierre D.", text: "Je viens tous les matins depuis 3 ans. Les croissants sont une tuerie.", rating: 5 },
  { name: "Sophie B.", text: "Accueil chaleureux, produits frais, prix honnêtes. Notre boulangerie de quartier.", rating: 5 },
];

const hours = [
  { day: "Lundi", time: "7h00 — 19h30" },
  { day: "Mardi", time: "7h00 — 19h30" },
  { day: "Mercredi", time: "7h00 — 19h30" },
  { day: "Jeudi", time: "7h00 — 19h30" },
  { day: "Vendredi", time: "7h00 — 19h30" },
  { day: "Samedi", time: "6h30 — 20h00" },
  { day: "Dimanche", time: "6h30 — 13h00" },
];

/* ─── Components ─── */

function BakeryNav() {
  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-[#FFF8F0]/80 backdrop-blur-xl border-b border-[#E8D5C0]">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <span className="font-semibold text-[#3D2B1F] text-lg tracking-tight">
            Boulangerie Martin
          </span>
        </a>
        <div className="hidden md:flex items-center gap-8 text-sm text-[#6B5344]">
          <a href="#specialites" className="hover:text-[#8B5E3C] transition-colors">Nos pains</a>
          <a href="#histoire" className="hover:text-[#8B5E3C] transition-colors">Notre histoire</a>
          <a href="#avis" className="hover:text-[#8B5E3C] transition-colors">Avis</a>
          <a href="#horaires" className="hover:text-[#8B5E3C] transition-colors">Horaires</a>
          <a
            href="#contact"
            className="px-5 py-2 bg-[#8B5E3C] text-white rounded-full text-sm font-medium hover:bg-[#6B4830] transition-colors"
          >
            Nous trouver
          </a>
        </div>
      </div>
    </nav>
  );
}

function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-16 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/demos/boulangerie-banner.jpg"
          alt="Intérieur chaleureux de boulangerie"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#3D2B1F]/90 via-[#3D2B1F]/70 to-[#3D2B1F]/30" />
      </div>

      <motion.div
        className="relative z-10 max-w-6xl mx-auto px-6 py-20"
        initial="hidden"
        animate="visible"
        variants={stagger}
      >
        <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 text-sm mb-8">
          <MapPin size={16} weight="fill" />
          <span>12 Rue Saint-Pierre, Caen</span>
        </motion.div>

        <motion.h1 variants={fadeIn} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white leading-[1.1] mb-6 max-w-2xl">
          Pain artisanal,
          <br />
          <span className="font-semibold text-[#E8C496]">fait avec passion.</span>
        </motion.h1>

        <motion.p variants={fadeIn} className="text-lg text-white/70 max-w-lg mb-10 leading-relaxed">
          Depuis 1987, la famille Martin perpétue la tradition du pain au levain naturel,
          au coeur du centre-ville de Caen.
        </motion.p>

        <motion.div variants={fadeIn} className="flex flex-wrap gap-4">
          <a
            href="#specialites"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#E8C496] text-[#3D2B1F] font-medium rounded-full hover:bg-[#D4A86C] transition-all hover:shadow-lg hover:shadow-[#E8C496]/20"
          >
            Découvrir nos pains
            <NavigationArrow size={18} weight="bold" className="rotate-135" />
          </a>
          <a
            href="tel:+33231000000"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/10 text-white border border-white/20 font-medium rounded-full backdrop-blur-sm hover:bg-white/20 transition-all"
          >
            <Phone size={18} weight="bold" />
            02 31 00 00 00
          </a>
        </motion.div>

        {/* Trust badges */}
        <motion.div variants={fadeIn} className="mt-12 flex flex-wrap gap-6 text-white/50 text-sm">
          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} weight="fill" className="text-[#E8C496]" />
              ))}
            </div>
            <span>4.9/5 sur Google</span>
          </div>
          <span className="hidden sm:inline">·</span>
          <span>Ouvert 7j/7</span>
          <span className="hidden sm:inline">·</span>
          <span>Farine Label Rouge</span>
        </motion.div>
      </motion.div>
    </section>
  );
}

function SpecialtiesSection() {
  return (
    <section id="specialites" className="py-24 md:py-32 bg-[#FFF8F0]">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="text-center mb-16"
        >
          <motion.p variants={fadeIn} className="text-sm font-medium text-[#8B5E3C] tracking-widest uppercase mb-3">
            Nos spécialités
          </motion.p>
          <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-light text-[#3D2B1F]">
            Cuits au four,{" "}
            <span className="font-semibold">avec amour.</span>
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {specialties.map((item) => (
            <motion.div
              key={item.name}
              variants={fadeIn}
              className="group bg-white rounded-2xl overflow-hidden border border-[#E8D5C0]/60 hover:shadow-xl hover:shadow-[#8B5E3C]/5 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-3 mb-1.5">
                  <h3 className="font-semibold text-[#3D2B1F] text-lg">{item.name}</h3>
                  <span className="text-[#8B5E3C] font-mono font-semibold text-sm whitespace-nowrap pt-1">{item.price}</span>
                </div>
                <p className="text-[#6B5344]/70 text-sm leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function StorySection() {
  return (
    <section id="histoire" className="py-24 md:py-32 bg-[#3D2B1F] text-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          {/* Image */}
          <motion.div variants={fadeIn} className="relative">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5]">
              <Image
                src="/images/demos/boulangerie-artisan.jpg"
                alt="Boulanger au travail"
                fill
                className="object-cover"
              />
            </div>
            {/* Floating card */}
            <div className="absolute -bottom-6 -right-4 sm:right-4 bg-[#E8C496] text-[#3D2B1F] p-6 rounded-2xl shadow-2xl max-w-[200px]">
              <p className="text-4xl font-bold font-mono">1987</p>
              <p className="text-sm font-medium mt-1">Depuis presque 40 ans</p>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div variants={fadeIn}>
            <p className="text-sm font-medium text-[#E8C496] tracking-widest uppercase mb-4">Notre histoire</p>
            <h2 className="text-3xl md:text-4xl font-light leading-tight mb-6">
              Trois générations
              <br />
              <span className="font-semibold">de savoir-faire.</span>
            </h2>
            <div className="space-y-4 text-white/70 leading-relaxed">
              <p>
                C&apos;est en 1987 que Pierre Martin ouvre les portes de sa boulangerie
                rue Saint-Pierre, avec une conviction simple : le bon pain prend du temps.
              </p>
              <p>
                Aujourd&apos;hui, son fils Antoine perpétue cette philosophie. Levain naturel
                cultivé depuis plus de 30 ans, farines Label Rouge, cuisson maîtrisée au four
                à sole — chaque étape est un acte de patience.
              </p>
              <p>
                Notre équipe de 8 passionnés se lève chaque nuit à 3h pour que le pain
                soit prêt à votre réveil. Parce que Caen mérite du pain qui a du goût.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-10">
              {[
                { value: "37", label: "ans d'expérience" },
                { value: "6", label: "variétés de pain" },
                { value: "300+", label: "clients par jour" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-2xl md:text-3xl font-bold font-mono text-[#E8C496]">{stat.value}</p>
                  <p className="text-xs text-white/50 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function ReviewsSection() {
  return (
    <section id="avis" className="py-24 md:py-32 bg-[#FAF3EB]">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="text-center mb-16"
        >
          <motion.p variants={fadeIn} className="text-sm font-medium text-[#8B5E3C] tracking-widest uppercase mb-3">
            Avis clients
          </motion.p>
          <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-light text-[#3D2B1F]">
            Ce que disent{" "}
            <span className="font-semibold">nos clients.</span>
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {reviews.map((review) => (
            <motion.div
              key={review.name}
              variants={fadeIn}
              className="bg-white rounded-2xl p-8 border border-[#E8D5C0]/40"
            >
              <div className="flex gap-0.5 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={18} weight="fill" className="text-[#E8C496]" />
                ))}
              </div>
              <p className="text-[#3D2B1F] leading-relaxed mb-6">&ldquo;{review.text}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#E8D5C0] flex items-center justify-center text-[#8B5E3C] font-semibold text-sm">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-[#3D2B1F] text-sm">{review.name}</p>
                  <p className="text-xs text-[#6B5344]/60">Avis Google</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function HoursSection() {
  const today = new Date().getDay();
  // getDay(): 0=Sun, 1=Mon... → map to our array index (Mon=0, Sun=6)
  const todayIndex = today === 0 ? 6 : today - 1;

  return (
    <section id="horaires" className="py-24 md:py-32 bg-[#FFF8F0]">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16"
        >
          {/* Horaires */}
          <motion.div variants={fadeIn}>
            <p className="text-sm font-medium text-[#8B5E3C] tracking-widest uppercase mb-3">Horaires</p>
            <h2 className="text-3xl md:text-4xl font-light text-[#3D2B1F] mb-8">
              Quand nous{" "}
              <span className="font-semibold">trouver.</span>
            </h2>

            <div className="space-y-0 bg-white rounded-2xl border border-[#E8D5C0]/60 overflow-hidden">
              {hours.map((h, i) => (
                <div
                  key={h.day}
                  className={`flex items-center justify-between px-6 py-3.5 text-sm ${
                    i === todayIndex
                      ? "bg-[#8B5E3C] text-white font-medium"
                      : "text-[#3D2B1F] border-b border-[#E8D5C0]/30 last:border-b-0"
                  }`}
                >
                  <span>{h.day}{i === todayIndex && " (aujourd'hui)"}</span>
                  <span className="font-mono">{h.time}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Contact */}
          <motion.div variants={fadeIn} id="contact">
            <p className="text-sm font-medium text-[#8B5E3C] tracking-widest uppercase mb-3">Contact</p>
            <h2 className="text-3xl md:text-4xl font-light text-[#3D2B1F] mb-8">
              Rendez-nous{" "}
              <span className="font-semibold">visite.</span>
            </h2>

            {/* Map placeholder */}
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-[#E8D5C0] mb-6">
              <Image
                src="/images/demos/boulangerie-shop.jpg"
                alt="Localisation de la boulangerie"
                fill
                className="object-cover opacity-60"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/95 backdrop-blur-sm px-6 py-4 rounded-xl shadow-lg text-center">
                  <MapPin size={24} weight="fill" className="text-[#8B5E3C] mx-auto mb-2" />
                  <p className="font-semibold text-[#3D2B1F] text-sm">12 Rue Saint-Pierre</p>
                  <p className="text-[#6B5344] text-xs">14000 Caen</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <a
                href="tel:+33231000000"
                className="flex items-center gap-3 p-4 bg-white rounded-xl border border-[#E8D5C0]/60 hover:border-[#8B5E3C]/30 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-[#8B5E3C]/10 flex items-center justify-center">
                  <Phone size={20} weight="bold" className="text-[#8B5E3C]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#3D2B1F]">02 31 00 00 00</p>
                  <p className="text-xs text-[#6B5344]/60">Du lundi au dimanche</p>
                </div>
              </a>
              <a
                href="mailto:contact@boulangerie-martin.fr"
                className="flex items-center gap-3 p-4 bg-white rounded-xl border border-[#E8D5C0]/60 hover:border-[#8B5E3C]/30 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-[#8B5E3C]/10 flex items-center justify-center">
                  <Envelope size={20} weight="bold" className="text-[#8B5E3C]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#3D2B1F]">contact@boulangerie-martin.fr</p>
                  <p className="text-xs text-[#6B5344]/60">Réponse sous 24h</p>
                </div>
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function BakeryFooter() {
  return (
    <footer className="bg-[#3D2B1F] text-white py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-lg">Boulangerie Martin</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
              <InstagramLogo size={20} weight="bold" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
              <FacebookLogo size={20} weight="bold" />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/40">
          <p>&copy; 2026 Boulangerie Martin — Tous droits réservés</p>
          <p className="flex items-center gap-1.5">
            Site créé par
            <a href="https://dubus.pro" className="text-[#E8C496] hover:underline" target="_blank" rel="noopener noreferrer">
              dubus.pro
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ─── Page ─── */

export default function BoulangerieDemoPage() {
  return (
    <div className="bg-[#FFF8F0] text-[#3D2B1F]" style={{ colorScheme: "light" }}>
      <BakeryNav />
      <HeroSection />
      <SpecialtiesSection />
      <StorySection />
      <ReviewsSection />
      <HoursSection />
      <BakeryFooter />
    </div>
  );
}
