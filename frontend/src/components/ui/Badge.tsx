type BadgeVariant = "default" | "primary" | "success" | "warning" | "error";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-background-overlay text-text-tertiary border-accent-border",
  primary: "bg-accent-action-subtle text-accent-action border-accent-action/20",
  success: "bg-status-success/10 text-status-success border-status-success/20",
  warning: "bg-status-warning/10 text-status-warning border-status-warning/20",
  error: "bg-status-error/10 text-status-error border-status-error/20",
};

export function Badge({ children, variant = "default", className = "" }: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center px-2.5 py-0.5
        text-xs font-medium font-mono
        rounded-full border
        ${variantStyles[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}
