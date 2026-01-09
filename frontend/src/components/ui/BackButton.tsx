"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "@phosphor-icons/react";

interface BackButtonProps {
  fallbackHref?: string;
  className?: string;
  children?: React.ReactNode;
}

export function BackButton({
  fallbackHref = "/blog",
  className = "",
  children = "Retour",
}: BackButtonProps) {
  const router = useRouter();

  const handleBack = () => {
    // Utilise l'historique du navigateur pour retourner à la page précédente
    // Si pas d'historique, va sur fallbackHref
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push(fallbackHref);
    }
  };

  return (
    <button
      onClick={handleBack}
      className={`inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors duration-200 ${className}`}
    >
      <ArrowLeft size={16} />
      {children}
    </button>
  );
}
