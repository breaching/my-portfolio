"use client";

import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Star,
  NavigationArrow,
  Clock,
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
const menuItems = [
  {
    name: "Tartare de boeuf normand",
    description: "Boeuf race normande, câpres, cornichons, jaune d'oeuf fermier",
    price: "18 €",
    image: "/images/demos/restaurant-plat1.jpg",
  },
  {
    name: "Camembert rôti",
    description: "Camembert AOP au four, miel de Normandie, noix, pain grillé",
    price: "14 €",
    image: "/images/demos/restaurant-plat2.jpg",
  },
  {
    name: "Filet de bar",
    description: "Bar de ligne, beurre blanc cidré, légumes de saison",
    price: "24 €",
    image: "/images/demos/restaurant-plat3.jpg",
  },
  {
    name: "Tarte Tatin",
    description: "Pommes caramélisées, crème fraîche d'Isigny",
    price: "10 €",
    image: "/images/demos/restaurant-plat4.jpg",
  },
];

const reviews = [
  { name: "Claire M.", text: "Une cuisine authentique et raffinée. Le tartare est exceptionnel. On reviendra sans hésiter.", rating: 5 },
  { name: "Thomas R.", text: "Cadre magnifique, service impeccable. Le meilleur rapport qualité-prix de Caen.", rating: 5 },
  { name: "Isabelle P.", text: "Un vrai bistrot comme on les aime. Produits frais, cuisson parfaite. Bravo au chef !", rating: 5 },
];

const hours = [
  { day: "Lundi", time: "Fermé" },
  { day: "Mardi", time: "12h — 14h · 19h — 22h" },
  { day: "Mercredi", time: "12h — 14h · 19h — 22h" },
  { day: "Jeudi", time: "12h — 14h · 19h — 22h" },
  { day: "Vendredi", time: "12h — 14h · 19h — 22h30" },
  { day: "Samedi", time: "12h — 14h30 · 19h — 22h30" },
  { day: "Dimanche", time: "12h — 15h" },
];

/* ─── Components ─── */

function RestaurantNav() {
  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-[#1A1A1A]/90 backdrop-blur-xl border-b border-[#333]">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <span className="font-light text-white text-lg tracking-[0.15em] uppercase">
            Le Bistrot Normand
          </span>
        </a>
        <div className="hidden md:flex items-center gap-8 text-sm text-white/60">
          <a href="#carte" className="hover:text-[#C9A96E] transition-colors">La carte</a>
          <a href="#histoire" className="hover:text-[#C9A96E] transition-colors">Notre histoire</a>
          <a href="#avis" className="hover:text-[#C9A96E] transition-colors">Avis</a>
          <a
            href="#reservation"
            className="px-5 py-2 bg-[#C9A96E] text-[#1A1A1A] rounded text-sm font-medium hover:bg-[#B8944D] transition-colors"
          >
            Réserver
          </a>
        </div>
      </div>
    </nav>
  );
}

function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-16 overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/demos/restaurant-banner.jpg"
          alt="Intérieur élégant du restaurant"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/60 to-[#1A1A1A]/30" />
      </div>

      <motion.div
        className="relative z-10 max-w-6xl mx-auto px-6 py-20 text-center"
        initial="hidden"
        animate="visible"
        variants={stagger}
      >
        <motion.p variants={fadeIn} className="text-[#C9A96E] tracking-[0.3em] uppercase text-sm mb-6 font-light">
          Restaurant gastronomique
        </motion.p>

        <motion.h1 variants={fadeIn} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white leading-[1.1] mb-6">
          Le Bistrot
          <br />
          <span className="font-serif italic text-[#C9A96E]">Normand</span>
        </motion.h1>

        <motion.p variants={fadeIn} className="text-lg text-white/60 max-w-lg mx-auto mb-10 leading-relaxed">
          Cuisine de terroir revisitée, produits normands d&apos;exception.
          Une table sincère au coeur de Caen.
        </motion.p>

        <motion.div variants={fadeIn} className="flex flex-wrap justify-center gap-4">
          <a
            href="#carte"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#C9A96E] text-[#1A1A1A] font-medium rounded hover:bg-[#B8944D] transition-all"
          >
            Découvrir la carte
            <NavigationArrow size={18} weight="bold" className="rotate-135" />
          </a>
          <a
            href="tel:+33231000000"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-white/5 text-white border border-white/20 font-medium rounded backdrop-blur-sm hover:bg-white/10 transition-all"
          >
            <Phone size={18} weight="bold" />
            02 31 00 00 00
          </a>
        </motion.div>

        <motion.div variants={fadeIn} className="mt-12 flex flex-wrap justify-center gap-6 text-white/40 text-sm">
          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} weight="fill" className="text-[#C9A96E]" />
              ))}
            </div>
            <span>4.8/5 sur Google</span>
          </div>
          <span className="hidden sm:inline">·</span>
          <span>Guide Michelin</span>
          <span className="hidden sm:inline">·</span>
          <span>Produits locaux</span>
        </motion.div>
      </motion.div>
    </section>
  );
}

function MenuSection() {
  return (
    <section id="carte" className="py-24 md:py-32 bg-[#1A1A1A]">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="text-center mb-16"
        >
          <motion.p variants={fadeIn} className="text-sm text-[#C9A96E] tracking-[0.2em] uppercase mb-3">
            La carte
          </motion.p>
          <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-light text-white">
            Nos <span className="font-serif italic text-[#C9A96E]">suggestions</span>
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {menuItems.map((item) => (
            <motion.div
              key={item.name}
              variants={fadeIn}
              className="group flex gap-5 p-4 rounded-xl border border-[#333] hover:border-[#C9A96E]/30 transition-all duration-300 bg-[#222]"
            >
              <div className="relative w-28 h-28 flex-shrink-0 rounded-lg overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3 mb-1.5">
                  <h3 className="font-medium text-white text-lg">{item.name}</h3>
                  <span className="text-[#C9A96E] font-light text-lg whitespace-nowrap">{item.price}</span>
                </div>
                <p className="text-white/40 text-sm leading-relaxed">{item.description}</p>
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
    <section id="histoire" className="py-24 md:py-32 bg-[#151515]">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          <motion.div variants={fadeIn} className="relative">
            <div className="relative rounded-xl overflow-hidden aspect-[4/5]">
              <Image
                src="/images/demos/restaurant-ambiance.jpg"
                alt="Plat dressé avec soin"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-4 sm:right-4 bg-[#C9A96E] text-[#1A1A1A] p-6 rounded-xl shadow-2xl max-w-[200px]">
              <p className="text-4xl font-light font-serif">2018</p>
              <p className="text-sm font-medium mt-1">Ouverture</p>
            </div>
          </motion.div>

          <motion.div variants={fadeIn}>
            <p className="text-sm text-[#C9A96E] tracking-[0.2em] uppercase mb-4">Notre histoire</p>
            <h2 className="text-3xl md:text-4xl font-light text-white leading-tight mb-6">
              Du terroir
              <br />
              <span className="font-serif italic text-[#C9A96E]">dans l&apos;assiette.</span>
            </h2>
            <div className="space-y-4 text-white/50 leading-relaxed">
              <p>
                Le Bistrot Normand est né d&apos;une envie simple : proposer une cuisine
                de terroir avec les meilleurs produits de Normandie, dans un cadre
                chaleureux et sans chichis.
              </p>
              <p>
                Notre chef Julien Lefèvre travaille chaque jour avec des producteurs
                locaux : viande race normande, poissons de la criée de Port-en-Bessin,
                légumes des maraîchers du Bessin, fromages AOP.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-10">
              {[
                { value: "96%", label: "produits locaux" },
                { value: "12", label: "producteurs partenaires" },
                { value: "340+", label: "avis Google" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-2xl md:text-3xl font-light text-[#C9A96E]">{stat.value}</p>
                  <p className="text-xs text-white/30 mt-1">{stat.label}</p>
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
    <section id="avis" className="py-24 md:py-32 bg-[#1A1A1A]">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="text-center mb-16"
        >
          <motion.p variants={fadeIn} className="text-sm text-[#C9A96E] tracking-[0.2em] uppercase mb-3">
            Avis clients
          </motion.p>
          <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-light text-white">
            Ce qu&apos;ils en <span className="font-serif italic text-[#C9A96E]">disent.</span>
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
              className="bg-[#222] rounded-xl p-8 border border-[#333]"
            >
              <div className="flex gap-0.5 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={18} weight="fill" className="text-[#C9A96E]" />
                ))}
              </div>
              <p className="text-white/70 leading-relaxed mb-6">&ldquo;{review.text}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#333] flex items-center justify-center text-[#C9A96E] font-medium text-sm">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-white text-sm">{review.name}</p>
                  <p className="text-xs text-white/30">Avis Google</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ReservationSection() {
  const today = new Date().getDay();
  const todayIndex = today === 0 ? 6 : today - 1;

  return (
    <section id="reservation" className="py-24 md:py-32 bg-[#151515]">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16"
        >
          <motion.div variants={fadeIn}>
            <p className="text-sm text-[#C9A96E] tracking-[0.2em] uppercase mb-3">Horaires</p>
            <h2 className="text-3xl md:text-4xl font-light text-white mb-8">
              Venez nous <span className="font-serif italic text-[#C9A96E]">retrouver.</span>
            </h2>

            <div className="space-y-0 bg-[#222] rounded-xl border border-[#333] overflow-hidden">
              {hours.map((h, i) => (
                <div
                  key={h.day}
                  className={`flex items-center justify-between px-6 py-3.5 text-sm ${
                    i === todayIndex
                      ? "bg-[#C9A96E] text-[#1A1A1A] font-medium"
                      : "text-white/70 border-b border-[#333]/50 last:border-b-0"
                  }`}
                >
                  <span>{h.day}{i === todayIndex && " (aujourd'hui)"}</span>
                  <span className="font-mono text-xs">{h.time}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeIn}>
            <p className="text-sm text-[#C9A96E] tracking-[0.2em] uppercase mb-3">Contact</p>
            <h2 className="text-3xl md:text-4xl font-light text-white mb-8">
              <span className="font-serif italic text-[#C9A96E]">Réservez</span> votre table.
            </h2>

            <div className="space-y-3">
              <a
                href="tel:+33231000000"
                className="flex items-center gap-3 p-4 bg-[#222] rounded-xl border border-[#333] hover:border-[#C9A96E]/30 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-[#C9A96E]/10 flex items-center justify-center">
                  <Phone size={20} weight="bold" className="text-[#C9A96E]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">02 31 00 00 00</p>
                  <p className="text-xs text-white/30">Réservation par téléphone</p>
                </div>
              </a>
              <a
                href="mailto:contact@bistrot-normand.fr"
                className="flex items-center gap-3 p-4 bg-[#222] rounded-xl border border-[#333] hover:border-[#C9A96E]/30 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-[#C9A96E]/10 flex items-center justify-center">
                  <Envelope size={20} weight="bold" className="text-[#C9A96E]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">contact@bistrot-normand.fr</p>
                  <p className="text-xs text-white/30">Réponse sous 2h</p>
                </div>
              </a>
              <div className="flex items-center gap-3 p-4 bg-[#222] rounded-xl border border-[#333]">
                <div className="w-10 h-10 rounded-lg bg-[#C9A96E]/10 flex items-center justify-center">
                  <MapPin size={20} weight="bold" className="text-[#C9A96E]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">8 Rue de Geôle, 14000 Caen</p>
                  <p className="text-xs text-white/30">Centre-ville, proche château</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function RestaurantFooter() {
  return (
    <footer className="bg-[#111] text-white py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <span className="font-light text-lg tracking-[0.15em] uppercase">Le Bistrot Normand</span>
          <div className="flex items-center gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
              <InstagramLogo size={20} weight="bold" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
              <FacebookLogo size={20} weight="bold" />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/30">
          <div className="flex items-center gap-1.5">
            <Clock size={14} />
            <span>Mar-Sam 12h-14h · 19h-22h | Dim 12h-15h</span>
          </div>
          <p className="flex items-center gap-1.5">
            Site créé par
            <a href="https://dubus.pro" className="text-[#C9A96E] hover:underline" target="_blank" rel="noopener noreferrer">
              dubus.pro
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ─── Page ─── */

export default function RestaurantDemoPage() {
  return (
    <div className="bg-[#1A1A1A] text-white" style={{ colorScheme: "dark" }}>
      <RestaurantNav />
      <HeroSection />
      <MenuSection />
      <StorySection />
      <ReviewsSection />
      <ReservationSection />
      <RestaurantFooter />
    </div>
  );
}
