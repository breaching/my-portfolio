"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowUpRight,
  GithubLogo,
  LinkedinLogo,
  EnvelopeSimple,
  ShieldCheck,
} from "@phosphor-icons/react";

// --- DATA ---

const projects = [
  {
    title: "Clarmind",
    subtitle: "SaaS — Suivi émotionnel TCC",
    status: "En production",
    url: "https://clarmind.com",
    description:
      "Application complète pour psychologues TCC et leurs patients. Authentification, dashboard temps réel, export PDF, facturation Stripe, conformité RGPD avec hébergement UE.",
    decisions: [
      "Architecture full-stack Next.js avec Supabase — choisi pour le RLS (Row Level Security) natif, critique pour des données de santé",
      "186 tests (Vitest + Playwright) — couverture des flows critiques : paiement, auth, RGPD",
      "29 migrations SQL versionnées — schéma évolutif sans downtime",
      "Stripe Checkout + webhooks — gestion complète du cycle d'abonnement",
    ],
    stack: ["Next.js", "React", "Supabase", "Stripe", "TypeScript", "Tailwind", "Vitest", "Playwright"],
    metrics: [
      { value: "186", label: "Tests" },
      { value: "29", label: "Migrations SQL" },
      { value: "RGPD", label: "Conforme" },
      { value: "Stripe", label: "Billing intégré" },
    ],
  },
  {
    title: "dubus.pro",
    subtitle: "Portfolio & site de conversion freelance",
    status: "En production",
    url: "https://dubus.pro",
    github: "https://github.com/breaching/my-portfolio",
    description:
      "Ce site. Conçu comme une machine de conversion pour des services freelance, tout en servant de portfolio technique. SSG, dark/light auto, OG image dynamique, security headers.",
    decisions: [
      "Next.js 16 + React 19 — dernières versions, SSG pour des performances optimales",
      "Dark/light auto via prefers-color-scheme — pas de toggle, respect de la préférence système",
      "Security headers stricts (CSP, HSTS, COOP, CORP) — défense en profondeur documentée dans un article",
      "Formulaire Formspree + honeypot — anti-spam sans dépendance backend",
    ],
    stack: ["Next.js 16", "React 19", "Tailwind 4", "Framer Motion", "TypeScript", "Vercel"],
    metrics: [
      { value: "SSG", label: "Rendu statique" },
      { value: "< 2s", label: "Chargement" },
      { value: "A+", label: "Security headers" },
      { value: "0", label: "Cookies" },
    ],
    relatedArticle: { slug: "securite-portfolio", label: "Sécuriser un portfolio : défense en profondeur" },
  },
  {
    title: "Homelab & IA locale",
    subtitle: "Infrastructure Proxmox avec GPU passthrough",
    status: "Actif",
    description:
      "Serveur physique sous Proxmox avec GPU passthrough (GTX 1070 Ti) pour héberger des LLMs locaux via Ollama. Monitoring InfluxDB + Grafana, segmentation réseau, backups automatisés.",
    decisions: [
      "GPU passthrough IOMMU — accès direct au GPU depuis une VM, sans overhead de virtualisation",
      "Segmentation réseau avec VLANs — isolation des services, réduction de la surface d'attaque",
      "Monitoring InfluxDB + Grafana — métriques temps réel sur CPU, RAM, GPU, températures",
      "LLMs locaux via Ollama — inférence privée, pas de données envoyées à des tiers",
    ],
    stack: ["Proxmox", "Debian", "Ollama", "InfluxDB", "Grafana", "Python"],
    metrics: [
      { value: "GPU", label: "Passthrough" },
      { value: "LLM", label: "Inférence locale" },
      { value: "24/7", label: "Uptime" },
      { value: "VLANs", label: "Segmenté" },
    ],
    relatedArticle: { slug: "homelab", label: "Homelab & IA locale" },
  },
  {
    title: "Pipeline Oura → InfluxDB",
    subtitle: "ETL santé avec visualisation Grafana",
    status: "Terminé",
    description:
      "Pipeline ETL complet pour extraire les données de santé de l'API Oura Ring, les stocker dans InfluxDB et les visualiser dans Grafana. Synchronisation multi-utilisateurs, gestion des rate limits.",
    decisions: [
      "InfluxDB pour le time series — requêtes temporelles natives, rétention configurable",
      "Backfill intelligent — détection des gaps et re-synchronisation automatique",
      "Multi-utilisateurs — architecture extensible dès le départ",
    ],
    stack: ["Python", "InfluxDB", "Grafana", "API REST"],
    relatedArticle: { slug: "oura-pipeline", label: "Oura Ring → InfluxDB & Grafana" },
  },
  {
    title: "Reverse Lookup Engine",
    subtitle: "Moteur de recherche inversée sur millions de records",
    status: "Terminé",
    description:
      "Moteur de recherche inversée avec cross-référencement multi-sources. Indexation full-text SQLite FTS5, recherche sub-seconde sur des millions d'enregistrements.",
    decisions: [
      "SQLite FTS5 — full-text search natif, pas besoin d'Elasticsearch pour cette échelle",
      "Cross-référencement multi-sources — jointures entre datasets hétérogènes",
      "Optimisation mémoire — streaming des imports pour gérer les gros fichiers",
    ],
    stack: ["Python", "SQLite", "FTS5"],
    relatedArticle: { slug: "reverse-lookup", label: "Reverse Lookup Engine" },
  },
];

const skills: { category: string; items: { name: string; context: string }[] }[] = [
  {
    category: "Frontend & Web",
    items: [
      { name: "React / Next.js", context: "Clarmind (SaaS) + dubus.pro — production" },
      { name: "TypeScript", context: "Utilisé sur tous les projets web" },
      { name: "Tailwind CSS", context: "Design system sur Clarmind et dubus.pro" },
      { name: "Framer Motion", context: "Animations et transitions sur dubus.pro" },
    ],
  },
  {
    category: "Backend & Data",
    items: [
      { name: "Supabase / PostgreSQL", context: "Clarmind — RLS, 29 migrations" },
      { name: "Python", context: "ETL pipelines, reverse lookup, scripting" },
      { name: "SQLite / FTS5", context: "Reverse Lookup Engine — millions de records" },
      { name: "InfluxDB", context: "Homelab monitoring + pipeline Oura" },
      { name: "APIs REST", context: "Intégration Stripe, Oura, Formspree" },
    ],
  },
  {
    category: "Infrastructure & Systèmes",
    items: [
      { name: "Proxmox VE", context: "Homelab — GPU passthrough, VMs, containers" },
      { name: "Linux (Debian)", context: "Administration quotidienne, hardening" },
      { name: "Vercel", context: "Déploiement CI/CD pour les projets Next.js" },
      { name: "Grafana", context: "Dashboards monitoring homelab + santé" },
    ],
  },
  {
    category: "Sécurité",
    items: [
      { name: "Security headers", context: "CSP, HSTS, COOP — documenté sur dubus.pro" },
      { name: "RGPD", context: "Conformité implémentée sur Clarmind" },
      { name: "TryHackMe", context: "Challenges réguliers — web vulns, privesc, recon" },
      { name: "Hardening", context: "Segmentation réseau, fail2ban, SSH keys" },
    ],
  },
  {
    category: "Testing",
    items: [
      { name: "Vitest", context: "Tests unitaires et d'intégration sur Clarmind" },
      { name: "Playwright", context: "Tests E2E — flows paiement, auth, RGPD" },
    ],
  },
];

const timeline = [
  {
    period: "2025 — En cours",
    title: "Freelance — Développeur web",
    subtitle: "dubus.pro · Création de sites et applications web",
    description:
      "Lancement de l'activité freelance. Spécialisé en sites vitrines et applications web modernes (React/Next.js) pour TPE/PME.",
  },
  {
    period: "2024 — 2025",
    title: "Clarmind — Projet personnel",
    subtitle: "SaaS de suivi émotionnel · Full-stack",
    description:
      "Conception, développement et mise en production d'une application SaaS complète. De l'idée au produit déployé avec facturation.",
  },
  {
    period: "2023 — 2025",
    title: "BTS CIEL",
    subtitle: "Cybersécurité, Informatique et réseaux, Électronique",
    description:
      "Formation en systèmes, réseaux et sécurité. En parallèle, apprentissage autodidacte intensif sur le développement web et l'infrastructure.",
  },
  {
    period: "2021 — Continu",
    title: "Apprentissage autodidacte",
    subtitle: "Homelab, projets, challenges sécurité",
    description:
      "La majorité de mes compétences viennent de projets concrets : homelab, pipelines data, applications web, challenges TryHackMe.",
  },
];

const approach = [
  {
    title: "Problem-solving first",
    description:
      "Je construis pour résoudre des besoins concrets, pas pour empiler des technologies. Chaque choix technique est justifié par le problème à résoudre.",
  },
  {
    title: "Comprendre le système",
    description:
      "Du bas niveau (CPU, kernel, IOMMU, indexation FTS5) au haut niveau (architecture, flux de données, UX). La compréhension profonde permet de prendre de meilleures décisions.",
  },
  {
    title: "Tester et documenter",
    description:
      "186 tests sur Clarmind, un article technique sur chaque projet significatif. Le code non testé est du code qui va casser. Le code non documenté est du code qu'on va réécrire.",
  },
  {
    title: "Autonomie technique",
    description:
      "Capable de naviguer dans un problème complexe, d'identifier les contraintes, de trouver et d'implémenter une solution. Du GPU passthrough au Stripe billing.",
  },
];

const contactLinks = [
  {
    label: "Email",
    value: "contact@dubus.pro",
    href: "mailto:contact@dubus.pro",
    icon: EnvelopeSimple,
  },
  {
    label: "GitHub",
    value: "@breaching",
    href: "https://github.com/breaching",
    icon: GithubLogo,
  },
  {
    label: "LinkedIn",
    value: "Alexis Dubus",
    href: "https://www.linkedin.com/in/alexis-dubus-603590284/",
    icon: LinkedinLogo,
  },
  {
    label: "TryHackMe",
    value: "@bremusic",
    href: "https://tryhackme.com/p/bremusic",
    icon: ShieldCheck,
  },
];

// --- ANIMATIONS ---

const fadeIn = {
  initial: { opacity: 0, y: 10 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.4 },
};

// --- PAGE ---

export default function ParcoursPage() {
  return (
    <div className="container-main">
      {/* Header */}
      <section className="section pb-0">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl md:text-4xl font-light tracking-[-0.02em] mb-4">
            Parcours technique
          </h1>
          <p className="text-text-secondary prose-width leading-relaxed text-base md:text-lg">
            Profil autodidacte. Pas de diplôme d&apos;ingénieur, mais des projets réels
            en production, une compréhension technique solide, et une capacité à
            livrer de bout en bout.
          </p>
        </motion.div>
      </section>

      {/* Projects */}
      <section className="section">
        <motion.h2
          {...fadeIn}
          className="text-sm font-medium text-text-tertiary uppercase tracking-[0.08em] mb-10"
        >
          Projets
        </motion.h2>

        <div className="space-y-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              className="rounded-lg border border-accent-border bg-background-elevated/50 overflow-hidden"
            >
              <div className="p-6 md:p-8">
                {/* Header */}
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="px-2.5 py-1 rounded-full bg-status-success/10 text-status-success text-xs font-medium border border-status-success/20">
                    {project.status}
                  </span>
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-text-tertiary hover:text-accent-action transition-colors font-mono"
                    >
                      {project.url.replace("https://", "")}
                      <ArrowUpRight size={12} />
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-text-tertiary hover:text-accent-action transition-colors"
                    >
                      <GithubLogo size={14} />
                      Source
                    </a>
                  )}
                </div>

                <h3 className="text-xl font-medium tracking-[-0.01em] mb-1">
                  {project.title}
                </h3>
                <p className="text-sm text-text-tertiary mb-4">
                  {project.subtitle}
                </p>

                <p className="text-sm text-text-secondary leading-[1.7] mb-6 max-w-[680px]">
                  {project.description}
                </p>

                {/* Technical decisions */}
                <div className="mb-6">
                  <h4 className="text-xs font-medium text-text-tertiary uppercase tracking-[0.06em] mb-3">
                    Choix techniques
                  </h4>
                  <ul className="space-y-2">
                    {project.decisions.map((decision) => (
                      <li
                        key={decision}
                        className="text-sm text-text-secondary leading-[1.6] pl-4 border-l-2 border-accent-border"
                      >
                        {decision}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Stack */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded bg-accent-action-subtle text-accent-action text-xs font-mono border border-accent-action/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Metrics + Article */}
                <div className="flex flex-wrap items-center gap-6 pt-5 border-t border-accent-border">
                  {project.metrics?.map((metric) => (
                    <div key={metric.label} className="text-center">
                      <p className="text-base font-medium text-text-primary">
                        {metric.value}
                      </p>
                      <p className="text-xs text-text-tertiary">{metric.label}</p>
                    </div>
                  ))}

                  {project.relatedArticle && (
                    <Link
                      href={`/blog/${project.relatedArticle.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs text-accent-action hover:underline ml-auto"
                    >
                      Lire l&apos;article
                      <ArrowUpRight size={12} />
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Skills with context */}
      <section className="section border-t border-accent-border">
        <motion.h2
          {...fadeIn}
          className="text-sm font-medium text-text-tertiary uppercase tracking-[0.08em] mb-10"
        >
          Compétences
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((group) => (
            <motion.div key={group.category} {...fadeIn}>
              <h3 className="text-sm font-medium mb-5 tracking-[-0.01em]">
                {group.category}
              </h3>
              <div className="space-y-3">
                {group.items.map((skill) => (
                  <div
                    key={skill.name}
                    className="p-3 rounded-md bg-background-elevated/50 border border-accent-border"
                  >
                    <p className="text-sm font-medium text-text-primary">
                      {skill.name}
                    </p>
                    <p className="text-xs text-text-tertiary mt-0.5">
                      {skill.context}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Timeline + Approach */}
      <section className="section border-t border-accent-border">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Timeline */}
          <div>
            <motion.h2
              {...fadeIn}
              className="text-sm font-medium text-text-tertiary uppercase tracking-[0.08em] mb-10"
            >
              Parcours
            </motion.h2>

            <div className="space-y-8">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <span className="text-xs text-text-tertiary font-mono">
                    {item.period}
                  </span>
                  <h3 className="font-medium tracking-[-0.01em] mt-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-text-secondary mt-0.5">
                    {item.subtitle}
                  </p>
                  <p className="text-sm text-text-secondary leading-relaxed mt-2">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Approach */}
          <div>
            <motion.h2
              {...fadeIn}
              className="text-sm font-medium text-text-tertiary uppercase tracking-[0.08em] mb-10"
            >
              Approche
            </motion.h2>

            <div className="space-y-6">
              {approach.map((item) => (
                <motion.div key={item.title} {...fadeIn}>
                  <h3 className="font-medium tracking-[-0.01em] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-[1.7]">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact — oriented collaboration */}
      <section className="section border-t border-accent-border">
        <motion.div {...fadeIn}>
          <h2 className="text-2xl font-light tracking-[-0.02em] mb-4">
            Ouvert aux collaborations et opportunités
          </h2>
          <p className="text-text-secondary prose-width leading-relaxed mb-10">
            Projet freelance, collaboration technique, ou opportunité — je suis
            disponible et curieux. N&apos;hésitez pas à me contacter.
          </p>

          <div className="flex flex-wrap gap-6">
            {contactLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    link.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="flex items-center gap-3 group"
                >
                  <Icon
                    size={18}
                    className="text-text-tertiary group-hover:text-accent-action transition-colors"
                  />
                  <div>
                    <p className="text-xs text-text-tertiary font-mono">
                      {link.label}
                    </p>
                    <p className="text-sm text-text-secondary group-hover:text-text-primary transition-colors font-medium">
                      {link.value}
                    </p>
                  </div>
                </a>
              );
            })}
          </div>
        </motion.div>
      </section>
    </div>
  );
}
