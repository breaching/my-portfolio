import type { Expertise, TimelineItem } from "@/types";

export const expertise: Expertise[] = [
  {
    title: "Sites vitrines",
    description:
      "Design moderne, responsive, rapide. Votre vitrine en ligne qui inspire confiance.",
  },
  {
    title: "Applications web",
    description:
      "Outils sur mesure, dashboards, espaces clients. React & Next.js.",
  },
  {
    title: "SEO & Performance",
    description:
      "Optimisé pour Google dès le départ. Temps de chargement < 2s.",
  },
  {
    title: "Sécurité & RGPD",
    description:
      "Hébergement sécurisé, conformité RGPD, certificat SSL.",
  },
];

export const timeline: TimelineItem[] = [
  {
    period: "2025 — En cours",
    title: "BTS CIEL",
    subtitle: "Cybersécurité, Informatique et réseaux, Électronique",
    description:
      "Formation en systèmes, réseaux et sécurité. En parallèle, apprentissage autodidacte intensif sur les sujets qui m'intéressent vraiment.",
  },
  {
    period: "Continu",
    title: "Apprentissage autodidacte",
    subtitle: "La majorité de mes compétences",
    description:
      "Homelab, projets personnels, challenges sécurité. J'apprends en construisant des choses concrètes et en résolvant des problèmes réels.",
  },
  {
    period: "2021 — Continu",
    title: "TryHackMe",
    subtitle: "Pratique régulière",
    description:
      "Challenges de sécurité : Linux security, web vulnerabilities, privilege escalation, reconnaissance.",
  },
];

export const skills: Record<string, string[]> = {
  "Développement Web": [
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Framer Motion",
    "Design responsive",
  ],
  "Systèmes & Virtualisation": [
    "Proxmox VE",
    "Linux (Debian)",
    "GPU Passthrough",
    "Administration système",
  ],
  "Data & Backend": [
    "Python",
    "SQLite (FTS5)",
    "InfluxDB",
    "ETL / Pipelines",
    "APIs REST",
  ],
  Sécurité: [
    "TryHackMe",
    "Linux security",
    "Web vulnerabilities",
    "Hardening",
  ],
};
