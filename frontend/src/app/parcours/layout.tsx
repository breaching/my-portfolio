import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Parcours technique",
  description:
    "Parcours technique d'Alexis Dubus — projets en production, compétences React/Next.js/TypeScript, infrastructure et sécurité.",
};

export default function ParcoursLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
