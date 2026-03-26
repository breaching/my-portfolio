"use client";

import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Envelope,
  ArrowRight,
  InstagramLogo,
  LinkedinLogo,
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
const projects = [
  {
    title: "Loft Vaugueux",
    category: "Rénovation",
    description: "Transformation d'un atelier en loft contemporain de 120m²",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop&q=80",
  },
  {
    title: "Maison Ouistreham",
    category: "Construction neuve",
    description: "Villa bord de mer, lignes épurées et matériaux naturels",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop&q=80",
  },
  {
    title: "Appartement Château",
    category: "Rénovation",
    description: "Haussmannien revisité, 85m² lumineux près du château de Caen",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&h=600&fit=crop&q=80",
  },
  {
    title: "Café Demoiselle",
    category: "Commerce",
    description: "Aménagement d'un coffee shop de 60m² en centre-ville",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&h=600&fit=crop&q=80",
  },
];

const steps = [
  { number: "01", title: "Rencontre", description: "Visite sur site, écoute de vos envies et contraintes" },
  { number: "02", title: "Conception", description: "Plans 3D, moodboard matériaux, estimation budgétaire" },
  { number: "03", title: "Suivi chantier", description: "Coordination artisans, respect des délais et du budget" },
  { number: "04", title: "Livraison", description: "Réception des travaux, derniers ajustements, remise des clés" },
];

/* ─── Components ─── */

function ArchitectNav() {
  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-white/90 backdrop-blur-xl border-b border-neutral-100">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <span className="font-medium text-neutral-900 text-lg tracking-tight">
            Studio <span className="font-light">Morel</span>
          </span>
        </a>
        <div className="hidden md:flex items-center gap-8 text-sm text-neutral-500">
          <a href="#projets" className="hover:text-neutral-900 transition-colors">Projets</a>
          <a href="#approche" className="hover:text-neutral-900 transition-colors">Approche</a>
          <a href="#contact" className="hover:text-neutral-900 transition-colors">Contact</a>
          <a
            href="#contact"
            className="px-5 py-2 bg-neutral-900 text-white rounded text-sm font-medium hover:bg-neutral-800 transition-colors"
          >
            Prendre RDV
          </a>
        </div>
      </div>
    </nav>
  );
}

function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-end pt-16 overflow-hidden bg-neutral-50">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&h=1080&fit=crop&q=85"
          alt="Intérieur design contemporain"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/30 to-transparent" />
      </div>

      <motion.div
        className="relative z-10 max-w-6xl mx-auto px-6 pb-20 w-full"
        initial="hidden"
        animate="visible"
        variants={stagger}
      >
        <motion.p variants={fadeIn} className="text-neutral-500 tracking-[0.2em] uppercase text-xs mb-4">
          Architecture d&apos;intérieur — Caen &amp; Normandie
        </motion.p>

        <motion.h1 variants={fadeIn} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-neutral-900 leading-[1.05] mb-6 max-w-3xl">
          Des espaces
          <br />
          qui vous <span className="italic">ressemblent.</span>
        </motion.h1>

        <motion.p variants={fadeIn} className="text-lg text-neutral-500 max-w-lg mb-10 leading-relaxed">
          Claire Morel conçoit des intérieurs sur mesure, entre élégance
          intemporelle et fonctionnalité du quotidien.
        </motion.p>

        <motion.div variants={fadeIn} className="flex flex-wrap gap-4">
          <a
            href="#projets"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-neutral-900 text-white font-medium rounded hover:bg-neutral-800 transition-all"
          >
            Voir les projets
            <ArrowRight size={18} weight="bold" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-neutral-900 border border-neutral-200 font-medium rounded hover:bg-neutral-50 transition-all"
          >
            Consultation gratuite
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

function ProjectsSection() {
  return (
    <section id="projets" className="py-24 md:py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="mb-16"
        >
          <motion.p variants={fadeIn} className="text-xs text-neutral-400 tracking-[0.2em] uppercase mb-3">
            Portfolio
          </motion.p>
          <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-light text-neutral-900">
            Projets <span className="italic">récents</span>
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {projects.map((project) => (
            <motion.div
              key={project.title}
              variants={fadeIn}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-4">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-neutral-900/0 group-hover:bg-neutral-900/10 transition-colors duration-300" />
              </div>
              <p className="text-xs text-neutral-400 tracking-[0.15em] uppercase mb-1">{project.category}</p>
              <h3 className="text-xl font-medium text-neutral-900 mb-1">{project.title}</h3>
              <p className="text-sm text-neutral-500">{project.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ApproachSection() {
  return (
    <section id="approche" className="py-24 md:py-32 bg-neutral-50">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="mb-16"
        >
          <motion.p variants={fadeIn} className="text-xs text-neutral-400 tracking-[0.2em] uppercase mb-3">
            Méthode
          </motion.p>
          <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-light text-neutral-900">
            Un accompagnement <span className="italic">de A à Z</span>
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {steps.map((step) => (
            <motion.div key={step.number} variants={fadeIn}>
              <p className="text-3xl font-light text-neutral-200 mb-3 font-mono">{step.number}</p>
              <h3 className="text-lg font-medium text-neutral-900 mb-2">{step.title}</h3>
              <p className="text-sm text-neutral-500 leading-relaxed">{step.description}</p>
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
          className="max-w-2xl"
        >
          <motion.p variants={fadeIn} className="text-xs text-neutral-400 tracking-[0.2em] uppercase mb-3">
            Contact
          </motion.p>
          <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-light text-neutral-900 mb-4">
            Parlons de votre <span className="italic">projet.</span>
          </motion.h2>
          <motion.p variants={fadeIn} className="text-neutral-500 leading-relaxed mb-10">
            Première consultation gratuite et sans engagement. Je me déplace
            dans tout le Calvados pour une visite sur site.
          </motion.p>

          <motion.div variants={fadeIn} className="space-y-3">
            <a
              href="tel:+33600000000"
              className="flex items-center gap-3 p-4 bg-neutral-50 rounded-lg border border-neutral-100 hover:border-neutral-300 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-neutral-900 flex items-center justify-center">
                <Phone size={20} weight="bold" className="text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-neutral-900">06 00 00 00 00</p>
                <p className="text-xs text-neutral-400">Du lundi au vendredi, 9h-18h</p>
              </div>
            </a>
            <a
              href="mailto:claire@studio-morel.fr"
              className="flex items-center gap-3 p-4 bg-neutral-50 rounded-lg border border-neutral-100 hover:border-neutral-300 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-neutral-900 flex items-center justify-center">
                <Envelope size={20} weight="bold" className="text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-neutral-900">claire@studio-morel.fr</p>
                <p className="text-xs text-neutral-400">Réponse sous 24h</p>
              </div>
            </a>
            <div className="flex items-center gap-3 p-4 bg-neutral-50 rounded-lg border border-neutral-100">
              <div className="w-10 h-10 rounded-lg bg-neutral-900 flex items-center justify-center">
                <MapPin size={20} weight="bold" className="text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-neutral-900">24 Rue Écuyère, 14000 Caen</p>
                <p className="text-xs text-neutral-400">Interventions Caen &amp; Calvados</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function ArchitectFooter() {
  return (
    <footer className="bg-neutral-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <span className="font-medium text-lg tracking-tight">
            Studio <span className="font-light">Morel</span>
          </span>
          <div className="flex items-center gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
              <InstagramLogo size={20} weight="bold" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
              <LinkedinLogo size={20} weight="bold" />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/30">
          <p>&copy; 2026 Studio Morel — Architecture d&apos;intérieur</p>
          <p className="flex items-center gap-1.5">
            Site créé par
            <a href="https://dubus.pro" className="text-white/60 hover:underline" target="_blank" rel="noopener noreferrer">
              dubus.pro
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ─── Page ─── */

export default function ArchitecteDemoPage() {
  return (
    <div className="bg-white text-neutral-900" style={{ colorScheme: "light" }}>
      <ArchitectNav />
      <HeroSection />
      <ProjectsSection />
      <ApproachSection />
      <ContactSection />
      <ArchitectFooter />
    </div>
  );
}
