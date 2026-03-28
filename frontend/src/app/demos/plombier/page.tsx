"use client";

import { motion } from "framer-motion";
import {
  Phone,
  MapPin,
  Envelope,
  Star,
  ShieldCheck,
  Clock,
  Wrench,
  Drop,
  Lightning,
  ThermometerHot,
  CheckCircle,
  FacebookLogo,
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
const services = [
  {
    icon: Drop,
    title: "Plomberie",
    description: "Installation, réparation, débouchage. Interventions rapides sur tous types de canalisations.",
  },
  {
    icon: ThermometerHot,
    title: "Chauffage",
    description: "Installation et entretien de chaudières gaz, pompes à chaleur, planchers chauffants.",
  },
  {
    icon: Wrench,
    title: "Dépannage urgent",
    description: "Fuite d'eau, panne de chauffage, WC bouchés. Intervention en moins de 2h sur Caen.",
  },
  {
    icon: Lightning,
    title: "Rénovation salle de bain",
    description: "Conception et réalisation complète. Douche italienne, baignoire, carrelage.",
  },
];

const guarantees = [
  "Devis gratuit sous 24h",
  "Intervention en 2h sur Caen",
  "Artisan certifié RGE",
  "Garantie décennale",
  "Prix fixés avant travaux",
  "Paiement en 3x sans frais",
];

const reviews = [
  { name: "Marc D.", text: "Intervention rapide pour une fuite en pleine nuit. Travail propre et prix correct. Je recommande.", rating: 5 },
  { name: "Nathalie G.", text: "Rénovation complète de notre salle de bain. Résultat impeccable, délais respectés.", rating: 5 },
  { name: "Philippe L.", text: "Très professionnel pour l'installation de notre pompe à chaleur. Économies visibles dès le 1er mois.", rating: 5 },
];

/* ─── Components ─── */

function PlumberNav() {
  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-white/90 backdrop-blur-xl border-b border-neutral-100">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#1E5FAA] flex items-center justify-center">
            <Wrench size={16} weight="bold" className="text-white" />
          </div>
          <span className="font-semibold text-neutral-900 text-lg tracking-tight">
            Dupont Plomberie
          </span>
        </a>
        <div className="hidden md:flex items-center gap-8 text-sm text-neutral-500">
          <a href="#services" className="hover:text-[#1E5FAA] transition-colors">Services</a>
          <a href="#avis" className="hover:text-[#1E5FAA] transition-colors">Avis</a>
          <a href="#contact" className="hover:text-[#1E5FAA] transition-colors">Contact</a>
          <a
            href="tel:+33231000000"
            className="inline-flex items-center gap-2 px-5 py-2 bg-[#1E5FAA] text-white rounded-lg text-sm font-medium hover:bg-[#174A85] transition-colors"
          >
            <Phone size={16} weight="bold" />
            Urgence 7j/7
          </a>
        </div>
      </div>
    </nav>
  );
}

function HeroSection() {
  return (
    <section className="relative pt-16 overflow-hidden bg-gradient-to-b from-[#F0F6FF] to-white">
      <motion.div
        className="relative z-10 max-w-6xl mx-auto px-6 py-20 md:py-28"
        initial="hidden"
        animate="visible"
        variants={stagger}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1E5FAA]/10 text-[#1E5FAA] text-sm mb-6">
              <ShieldCheck size={16} weight="fill" />
              <span className="font-medium">Artisan certifié RGE</span>
            </motion.div>

            <motion.h1 variants={fadeIn} className="text-4xl sm:text-5xl md:text-6xl font-bold text-neutral-900 leading-[1.1] mb-6">
              Votre plombier
              <br />
              <span className="text-[#1E5FAA]">de confiance</span> à Caen.
            </motion.h1>

            <motion.p variants={fadeIn} className="text-lg text-neutral-500 max-w-lg mb-8 leading-relaxed">
              Dépannage urgent, installation, rénovation. Frédéric Dupont intervient
              dans tout le Calvados avec des prix clairs et sans surprise.
            </motion.p>

            <motion.div variants={fadeIn} className="flex flex-wrap gap-3 mb-8">
              <a
                href="tel:+33231000000"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#1E5FAA] text-white font-semibold rounded-lg hover:bg-[#174A85] transition-all shadow-lg shadow-[#1E5FAA]/20"
              >
                <Phone size={20} weight="bold" />
                02 31 00 00 00
              </a>
              <a
                href="#devis"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-neutral-900 border-2 border-neutral-200 font-semibold rounded-lg hover:border-[#1E5FAA]/30 transition-all"
              >
                Devis gratuit
              </a>
            </motion.div>

            <motion.div variants={fadeIn} className="flex flex-wrap gap-4 text-sm text-neutral-500">
              <div className="flex items-center gap-2">
                <Clock size={16} weight="bold" className="text-[#1E5FAA]" />
                <span>Intervention &lt; 2h</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} weight="fill" className="text-amber-400" />
                  ))}
                </div>
                <span>4.9/5 (180+ avis)</span>
              </div>
            </motion.div>
          </div>

          <motion.div variants={fadeIn} className="relative hidden lg:block">
            <div className="relative rounded-2xl overflow-hidden aspect-square">
              <Image
                src="/images/demos/plombier-portrait.jpg"
                alt="Plombier professionnel au travail"
                fill
                className="object-cover"
                priority
              />
            </div>
            {/* Floating urgency badge */}
            <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-xl shadow-xl border border-neutral-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center">
                  <CheckCircle size={24} weight="fill" className="text-green-500" />
                </div>
                <div>
                  <p className="font-semibold text-neutral-900 text-sm">Disponible maintenant</p>
                  <p className="text-xs text-neutral-400">Dépannage 7j/7</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section id="services" className="py-24 md:py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="text-center mb-16"
        >
          <motion.p variants={fadeIn} className="text-sm font-medium text-[#1E5FAA] tracking-wide uppercase mb-3">
            Nos services
          </motion.p>
          <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-bold text-neutral-900">
            Tout pour votre <span className="text-[#1E5FAA]">plomberie</span>
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                variants={fadeIn}
                className="group p-6 rounded-xl border-2 border-neutral-100 hover:border-[#1E5FAA]/20 hover:shadow-lg hover:shadow-[#1E5FAA]/5 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-[#1E5FAA]/10 flex items-center justify-center mb-4 group-hover:bg-[#1E5FAA] transition-colors duration-300">
                  <Icon size={24} weight="duotone" className="text-[#1E5FAA] group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="font-semibold text-neutral-900 text-lg mb-2">{service.title}</h3>
                <p className="text-neutral-500 text-sm leading-relaxed">{service.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

function GuaranteesSection() {
  return (
    <section className="py-24 md:py-32 bg-[#1E5FAA]">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="text-center mb-12"
        >
          <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-bold text-white">
            Nos engagements
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {guarantees.map((g) => (
            <motion.div
              key={g}
              variants={fadeIn}
              className="flex items-center gap-3 p-4 bg-white/10 rounded-xl backdrop-blur-sm"
            >
              <CheckCircle size={22} weight="fill" className="text-white flex-shrink-0" />
              <span className="text-white font-medium">{g}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ReviewsSection() {
  return (
    <section id="avis" className="py-24 md:py-32 bg-neutral-50">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="text-center mb-16"
        >
          <motion.p variants={fadeIn} className="text-sm font-medium text-[#1E5FAA] tracking-wide uppercase mb-3">
            Avis clients
          </motion.p>
          <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-bold text-neutral-900">
            Ils nous font <span className="text-[#1E5FAA]">confiance</span>
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
              className="bg-white rounded-xl p-6 border border-neutral-100 shadow-sm"
            >
              <div className="flex gap-0.5 mb-3">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={18} weight="fill" className="text-amber-400" />
                ))}
              </div>
              <p className="text-neutral-600 leading-relaxed mb-4 text-sm">&ldquo;{review.text}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#1E5FAA]/10 flex items-center justify-center text-[#1E5FAA] font-semibold text-sm">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-neutral-900 text-sm">{review.name}</p>
                  <p className="text-xs text-neutral-400">Avis Google</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="py-24 md:py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16"
        >
          <motion.div variants={fadeIn}>
            <p className="text-sm font-medium text-[#1E5FAA] tracking-wide uppercase mb-3">Contact</p>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Besoin d&apos;un <span className="text-[#1E5FAA]">plombier</span> ?
            </h2>
            <p className="text-neutral-500 leading-relaxed mb-8">
              Devis gratuit en 24h. Intervention rapide sur Caen et agglomération.
              Pour les urgences, appelez directement.
            </p>

            <div className="space-y-3">
              <a
                href="tel:+33231000000"
                className="flex items-center gap-3 p-4 bg-[#1E5FAA] rounded-xl text-white hover:bg-[#174A85] transition-colors"
              >
                <Phone size={22} weight="bold" />
                <div>
                  <p className="font-semibold">02 31 00 00 00</p>
                  <p className="text-sm text-white/70">Urgence 7j/7 — 8h à 20h</p>
                </div>
              </a>
              <a
                href="mailto:contact@dupont-plomberie.fr"
                className="flex items-center gap-3 p-4 bg-neutral-50 rounded-xl border border-neutral-100 hover:border-[#1E5FAA]/30 transition-colors"
              >
                <Envelope size={22} weight="bold" className="text-[#1E5FAA]" />
                <div>
                  <p className="font-medium text-neutral-900">contact@dupont-plomberie.fr</p>
                  <p className="text-sm text-neutral-400">Devis sous 24h</p>
                </div>
              </a>
              <div className="flex items-center gap-3 p-4 bg-neutral-50 rounded-xl border border-neutral-100">
                <MapPin size={22} weight="bold" className="text-[#1E5FAA]" />
                <div>
                  <p className="font-medium text-neutral-900">Zone : Caen et 30km autour</p>
                  <p className="text-sm text-neutral-400">Calvados (14)</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeIn} className="relative hidden lg:block">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
              <Image
                src="/images/demos/plombier-chantier.jpg"
                alt="Salle de bain rénovée"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function PlumberFooter() {
  return (
    <footer className="bg-neutral-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#1E5FAA] flex items-center justify-center">
              <Wrench size={16} weight="bold" className="text-white" />
            </div>
            <span className="font-semibold text-lg">Dupont Plomberie</span>
          </div>
          <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
            <FacebookLogo size={20} weight="bold" />
          </a>
        </div>

        <div className="mt-8 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/30">
          <p>&copy; 2026 Dupont Plomberie — SIRET 123 456 789 00012</p>
          <p className="flex items-center gap-1.5">
            Site créé par
            <a href="https://dubus.pro" className="text-[#1E5FAA] hover:underline" target="_blank" rel="noopener noreferrer">
              dubus.pro
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ─── Page ─── */

export default function PlombierDemoPage() {
  return (
    <div className="bg-white text-neutral-900" style={{ colorScheme: "light" }}>
      <PlumberNav />
      <HeroSection />
      <ServicesSection />
      <GuaranteesSection />
      <ReviewsSection />
      <ContactSection />
      <PlumberFooter />
    </div>
  );
}
