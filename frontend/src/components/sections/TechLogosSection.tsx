"use client";

import { motion } from "framer-motion";
import { Marquee } from "@/components/ui/Marquee";

/* ── Inline SVG logos (monochrome, currentColor) ── */

function ReactLogo({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="11.87" r="2.14" />
      <path
        fillRule="evenodd"
        d="M12 7.07c3.68 0 6.97.72 9.06 1.86.98.54 1.73 1.17 2.21 1.86.49.7.73 1.47.73 2.21s-.24 1.51-.73 2.21c-.48.69-1.23 1.32-2.21 1.86-2.09 1.14-5.38 1.86-9.06 1.86s-6.97-.72-9.06-1.86c-.98-.54-1.73-1.17-2.21-1.86C.24 14.51 0 13.74 0 13s.24-1.51.73-2.21c.48-.69 1.23-1.32 2.21-1.86C5.03 7.79 8.32 7.07 12 7.07Zm0 1.4c-3.48 0-6.56.68-8.4 1.69-.88.48-1.48 1-1.83 1.5-.34.49-.47.95-.47 1.34 0 .39.13.85.47 1.34.35.5.95 1.02 1.83 1.5 1.84 1.01 4.92 1.69 8.4 1.69s6.56-.68 8.4-1.69c.88-.48 1.48-1 1.83-1.5.34-.49.47-.95.47-1.34 0-.39-.13-.85-.47-1.34-.35-.5-.95-1.02-1.83-1.5-1.84-1.01-4.92-1.69-8.4-1.69Z"
      />
      <path
        fillRule="evenodd"
        d="M8.53 4.26c1.84-3.19 4.32-5.54 6.7-6.42 1.11-.41 2.2-.52 3.16-.26.97.26 1.78.88 2.29 1.77.51.88.66 2 .43 3.26-.22 1.22-.82 2.57-1.78 3.98-2.04 2.97-5.49 5.97-9.17 7.09l-.42-1.34c3.4-1.03 6.64-3.86 8.54-6.63.87-1.27 1.4-2.46 1.58-3.43.18-1 .07-1.77-.27-2.35-.34-.58-.84-.93-1.46-1.1-.63-.17-1.41-.1-2.3.23-2.06.76-4.3 2.87-5.99 5.8l-1.21-.7Z"
      />
      <path
        fillRule="evenodd"
        d="M8.53 19.48c-1.84-3.19-2.65-6.44-2.36-8.84.14-1.12.47-2.1 1.01-2.87.54-.78 1.3-1.3 2.24-1.51.94-.21 1.94-.07 3 .43 1.04.49 2.13 1.33 3.22 2.52 2.32 2.53 4.17 6.41 4.37 10.17l-1.4.08c-.18-3.45-1.88-7.09-4.04-9.44-.98-1.07-1.93-1.79-2.77-2.19-.82-.39-1.51-.46-2.09-.33-.59.13-1.05.45-1.4.95-.36.52-.63 1.28-.74 2.2-.26 2.08.47 5.05 2.17 7.99l-1.21.7Z"
      />
    </svg>
  );
}

function NextLogo({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.57 0c-.06 0-.27.01-.47.02C7.67.26 4.5 2.01 2.4 4.72.78 6.79-.07 9.17 0 11.79c.08 2.96 1.22 5.65 3.27 7.71a11.92 11.92 0 0 0 7.96 3.47c.6.04 1.93.04 2.54 0 2.68-.2 5.04-1.16 6.98-2.84.38-.33 1.08-1.04 1.08-1.1 0-.02-1.44-1.08-2.33-1.7l-.17-.12-1.31 1.35c-1.42 1.47-1.74 1.75-2.41 2.12-.84.46-1.55.6-2.6.55-1.1-.07-1.82-.34-2.72-.99-1.1-.8-1.87-2.05-2.17-3.55-.1-.48-.12-1.74-.04-2.2.3-1.64 1.2-3.06 2.49-3.92a5.17 5.17 0 0 1 3.93-.78c1.21.27 2.24.98 2.94 2.05l.35.52.53-.35c.3-.19 1.13-.74 1.86-1.22l1.31-.86-.12-.22c-.66-1.2-2.05-2.57-3.22-3.16A10.84 10.84 0 0 0 12.3.01C12.04 0 11.66 0 11.57 0Zm3.17 7.27v4.2l-3.5-5c-.47-.67-.48-.68-.57-.68h-.71v9.4h1.09V10.4l3.93 5.56c.08.12.2.22.3.26.06.03.34.04.71.04h.59V7.27h-1.09l-.75-.01Z" />
    </svg>
  );
}

function TypeScriptLogo({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M0 12v12h24V0H0v12Zm19.34-.96c.61.15 1.07.41 1.48.83.21.22.52.63.54.72 0 .03-.97.68-1.57 1.03-.02.01-.12-.09-.22-.22-.32-.42-.65-.6-1.13-.62-.7-.03-1.15.36-1.15.98 0 .19.03.31.1.46.15.32.44.52 1.27.88 1.53.67 2.18 1.11 2.53 1.72.39.68.48 1.78.21 2.6-.3.88-1.03 1.47-2.08 1.7-.33.07-1.09.08-1.46.02-.8-.14-1.56-.57-2.05-1.17a3.94 3.94 0 0 1-.4-.62c.03-.04.44-.27.73-.45l.6-.34.13.19c.18.28.56.66.76.78.58.31 1.38.27 1.74-.08a.86.86 0 0 0 .25-.69c0-.27-.04-.39-.2-.56-.21-.22-.58-.42-1.34-.75-1.22-.53-1.74-.86-2.16-1.39-.24-.31-.46-.81-.53-1.16-.06-.29-.07-1.02-.02-1.32a2.75 2.75 0 0 1 2.3-2.19c.35-.07 1.14-.04 1.5.05ZM13.09 12.2l.01 1.17H9.93v8.43H8.06v-8.43H4.88V12.2c0-.65.01-1.19.03-1.19.01-.01 1.85-.02 4.08-.01l4.06.02.04 1.17Z" />
    </svg>
  );
}

function TailwindLogo({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8Zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12Z" />
    </svg>
  );
}

function VercelLogo({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 1L24 22H0L12 1Z" />
    </svg>
  );
}

function StripeLogo({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305Z" />
    </svg>
  );
}

function SupabaseLogo({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.7 21.65c-.58.77-1.79.35-1.8-.62l-.15-10.49h7.04c1.27 0 1.98 1.47 1.18 2.44L13.7 21.65Z" opacity=".6" />
      <path d="M10.3 2.35c.58-.77 1.79-.35 1.8.62l.07 10.49H5.24c-1.27 0-1.98-1.47-1.18-2.44L10.3 2.35Z" />
    </svg>
  );
}

function NodeLogo({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.998 24c-.321 0-.641-.084-.922-.247l-2.936-1.737c-.438-.245-.224-.332-.08-.383.585-.203.703-.25 1.328-.604.065-.037.15-.023.218.017l2.256 1.339a.29.29 0 0 0 .272 0l8.795-5.076a.277.277 0 0 0 .134-.238V7.022a.282.282 0 0 0-.137-.242l-8.79-5.072a.274.274 0 0 0-.271 0L3.075 6.78a.28.28 0 0 0-.138.24v10.15c0 .1.053.19.137.236l2.409 1.392c1.307.654 2.108-.116 2.108-.89V7.877c0-.142.114-.253.256-.253h1.115c.139 0 .255.112.255.253v10.021c0 1.745-.95 2.745-2.604 2.745-.508 0-.909 0-2.026-.55l-2.307-1.33A1.85 1.85 0 0 1 1.36 17.17V7.022c0-.656.35-1.264.92-1.591L11.073.354a1.92 1.92 0 0 1 1.849 0l8.794 5.077c.57.327.92.935.92 1.591v10.15c0 .656-.35 1.262-.92 1.59l-8.794 5.077a1.83 1.83 0 0 1-.924.247Z" />
    </svg>
  );
}

const technologies: { name: string; icon: React.FC<{ size?: number }> }[] = [
  { name: "React", icon: ReactLogo },
  { name: "Next.js", icon: NextLogo },
  { name: "TypeScript", icon: TypeScriptLogo },
  { name: "Tailwind CSS", icon: TailwindLogo },
  { name: "Vercel", icon: VercelLogo },
  { name: "Stripe", icon: StripeLogo },
  { name: "Supabase", icon: SupabaseLogo },
  { name: "Node.js", icon: NodeLogo },
];

function TechItem({ name, icon: Icon }: { name: string; icon: React.FC<{ size?: number }> }) {
  return (
    <div className="flex items-center gap-3 px-5 py-2.5 rounded-lg border border-accent-border bg-background-elevated/50 text-text-tertiary hover:text-text-primary hover:border-accent-action/30 transition-all duration-300 select-none group">
      <span className="shrink-0 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
        <Icon size={18} />
      </span>
      <span className="text-sm font-medium tracking-tight whitespace-nowrap">
        {name}
      </span>
    </div>
  );
}

export function TechLogosSection() {
  return (
    <section className="py-12 md:py-16 border-t border-accent-border overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-center text-xs text-text-tertiary font-mono uppercase tracking-widest mb-8 container-main">
          Technologies maîtrisées
        </p>

        <div className="relative">
          {/* Gradient fade edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 sm:w-40 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 sm:w-40 bg-gradient-to-l from-background to-transparent" />

          <Marquee pauseOnHover className="[--duration:30s] [--gap:1rem]">
            {technologies.map((tech) => (
              <TechItem key={tech.name} name={tech.name} icon={tech.icon} />
            ))}
          </Marquee>
        </div>
      </motion.div>
    </section>
  );
}
