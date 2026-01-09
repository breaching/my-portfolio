"use client";

import { CircleNotch } from "@phosphor-icons/react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  loadingText?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-accent-primary text-background hover:bg-accent-hover",
  secondary:
    "bg-background-elevated text-text-primary hover:bg-accent-border",
  ghost:
    "text-text-secondary hover:text-text-primary hover:bg-background-elevated",
  outline:
    "border border-accent-border bg-transparent text-text-primary hover:border-text-tertiary hover:bg-background-elevated",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-sm",
};

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  disabled,
  loading = false,
  loadingText = "Chargement...",
  type = "button",
  onClick,
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      disabled={isDisabled}
      onClick={onClick}
      className={`
        inline-flex items-center justify-center gap-2
        font-medium rounded-md
        transition-colors duration-200
        focus:outline-none focus-visible:ring-2 focus-visible:ring-text-tertiary focus-visible:ring-offset-2 focus-visible:ring-offset-background
        disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
    >
      {loading ? (
        <>
          <CircleNotch size={16} className="animate-spin" />
          <span>{loadingText}</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}
