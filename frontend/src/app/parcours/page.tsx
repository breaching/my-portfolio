"use client";

import { motion } from "framer-motion";

const timeline = [
  {
    period: "2023 — 2025",
    title: "BTS CIEL",
    subtitle: "Cybersécurité, Informatique et réseaux, Électronique",
    description: "Formation en systèmes, réseaux et sécurité. En parallèle, apprentissage autodidacte intensif sur les sujets qui m'intéressent vraiment.",
  },
  {
    period: "Continu",
    title: "Apprentissage autodidacte",
    subtitle: "La majorité de mes compétences",
    description: "Homelab, projets personnels, challenges sécurité. J'apprends en construisant des choses concrètes et en résolvant des problèmes réels.",
  },
  {
    period: "2024",
    title: "TryHackMe",
    subtitle: "Pratique régulière",
    description: "Challenges de sécurité : Linux security, web vulnerabilities, privilege escalation, reconnaissance. Compétences pratiques, pas juste théoriques.",
  },
];

const skills = {
  "Systèmes & Virtualisation": [
    "Proxmox VE",
    "Linux (Debian)",
    "GPU Passthrough",
    "Administration système",
    "Monitoring",
  ],
  "Data & Backend": [
    "Python",
    "SQLite (FTS5)",
    "InfluxDB",
    "ETL / Pipelines",
    "APIs REST",
  ],
  "Frontend": [
    "React",
    "TypeScript",
    "HTML / CSS",
    "Next.js",
  ],
  "Sécurité": [
    "TryHackMe",
    "Linux security",
    "Web vulnerabilities",
    "Segmentation réseau",
    "Hardening",
  ],
};

const approach = [
  {
    title: "Problem-solving first",
    description: "Je construis pour résoudre des besoins concrets, pas pour empiler des technologies.",
  },
  {
    title: "Comprendre le système",
    description: "Du bas niveau (CPU, kernel, indexation) au haut niveau (architecture, flux de données).",
  },
  {
    title: "Autonomie technique",
    description: "Capable de naviguer dans un problème complexe et de trouver une solution.",
  },
];

export default function ParcoursPage() {
  return (
    <div className="container-main section">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16"
      >
        <h1 className="text-3xl font-light tracking-[-0.02em] mb-4">Parcours</h1>
        <p className="text-text-secondary prose-width leading-relaxed">
          Profil autodidacte en forte montée en compétences. Pas de diplôme
          d&apos;ingénieur, mais des projets réels et une compréhension technique solide.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-5 gap-16">
        {/* Timeline */}
        <div className="lg:col-span-3">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm font-medium text-text-tertiary uppercase tracking-[0.08em] mb-8"
          >
            Parcours
          </motion.h2>

          <div className="space-y-10">
            {timeline.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-6 mb-2">
                  <span className="text-sm text-text-tertiary font-mono w-36 flex-shrink-0 tabular-nums">
                    {item.period}
                  </span>
                  <div>
                    <h3 className="font-medium tracking-[-0.01em]">{item.title}</h3>
                    <p className="text-sm text-text-secondary">{item.subtitle}</p>
                  </div>
                </div>
                <p className="text-sm text-text-secondary leading-relaxed sm:ml-42 mt-2">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Approach */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <h2 className="text-sm font-medium text-text-tertiary uppercase tracking-[0.08em] mb-8">
              Approche
            </h2>
            <div className="space-y-6">
              {approach.map((item) => (
                <div key={item.title}>
                  <h3 className="font-medium tracking-[-0.01em] mb-1">{item.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Skills */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <h2 className="text-sm font-medium text-text-tertiary uppercase tracking-[0.08em] mb-8">
            Compétences
          </h2>

          <div className="space-y-8">
            {Object.entries(skills).map(([category, items]) => (
              <div key={category}>
                <h3 className="text-sm font-medium mb-4 tracking-[-0.01em]">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 text-sm text-text-secondary bg-background-elevated rounded-md"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Note on certifications */}
          <div className="mt-10 pt-10 border-t border-accent-border">
            <p className="text-sm text-text-tertiary leading-relaxed">
              Pas de certifications pour l&apos;instant. Je privilégie les compétences
              pratiques et les projets concrets aux labels.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
