"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  EnvelopeSimple,
  GithubLogo,
  PaperPlaneTilt,
  Check,
  CircleNotch,
} from "@phosphor-icons/react";

interface FormData {
  name: string;
  email: string;
  message: string;
}

type FormStatus = "idle" | "loading" | "success" | "error";

const links = [
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
];

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="container-main section">
      <div className="grid lg:grid-cols-2 gap-16">
        {/* Left - Info */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-light tracking-tight mb-4">Contact</h1>
          <p className="text-text-secondary mb-10 prose-width">
            Disponible pour des opportunités de stage, d&apos;alternance ou de
            collaboration sur des projets d&apos;infrastructure et de sécurité.
          </p>

          <div className="space-y-6">
            {links.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-4 group"
                >
                  <Icon size={20} className="text-text-tertiary" />
                  <div>
                    <p className="text-sm text-text-tertiary">{link.label}</p>
                    <p className="text-text-secondary group-hover:text-text-primary transition-colors">
                      {link.value}
                    </p>
                  </div>
                </a>
              );
            })}
          </div>

          <div className="mt-10 pt-10 border-t border-accent-border">
            <p className="text-sm text-text-tertiary mb-2">Disponibilité</p>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-status-success opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-status-success" />
              </span>
              <span className="text-sm text-text-secondary">
                Disponible pour de nouvelles opportunités
              </span>
            </div>
          </div>
        </motion.div>

        {/* Right - Form */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm text-text-secondary mb-2">
                Nom
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-background-elevated border border-accent-border rounded-md text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-text-tertiary transition-colors"
                placeholder="Votre nom"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm text-text-secondary mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-background-elevated border border-accent-border rounded-md text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-text-tertiary transition-colors"
                placeholder="votre@email.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm text-text-secondary mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-3 bg-background-elevated border border-accent-border rounded-md text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-text-tertiary transition-colors resize-none"
                placeholder="Décrivez votre projet ou votre demande..."
              />
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent-primary text-background font-medium rounded-md hover:bg-accent-hover transition-colors disabled:opacity-50"
            >
              {status === "loading" ? (
                <>
                  <CircleNotch size={18} className="animate-spin" />
                  Envoi...
                </>
              ) : status === "success" ? (
                <>
                  <Check size={18} weight="bold" />
                  Envoyé
                </>
              ) : (
                <>
                  <PaperPlaneTilt size={18} />
                  Envoyer
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
