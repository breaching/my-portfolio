"use client";

import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";
import remarkGfm from 'remark-gfm';
import type { ReactNode, ReactElement } from "react";
import Image from "next/image";

function getTextContent(node: ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (!node) return "";
  if (Array.isArray(node)) return node.map(getTextContent).join("");
  if (typeof node === "object" && node !== null && "props" in node) {
    const el = node as ReactElement<{ children?: ReactNode }>;
    return getTextContent(el.props.children);
  }
  return "";
}

type CalloutType = "tip" | "warning" | "info" | "stat";

function detectCallout(children: ReactNode): CalloutType | null {
  const text = getTextContent(children);
  if (text.startsWith("Astuce") || text.startsWith("Conseil")) return "tip";
  if (text.startsWith("Attention") || text.startsWith("Important")) return "warning";
  if (text.startsWith("Le chiffre") || text.startsWith("Chiffre")) return "stat";
  if (text.startsWith("Info") || text.startsWith("Bon à savoir") || text.startsWith("Le saviez-vous")) return "info";
  return null;
}

const calloutStyles: Record<CalloutType, string> = {
  tip: "callout callout-tip",
  warning: "callout callout-warning",
  info: "callout callout-info",
  stat: "callout callout-stat",
};

const components: Components = {
  h2: ({ children }) => (
    <h2 className="text-lg sm:text-xl font-medium text-text-primary mt-10 sm:mt-14 mb-3 sm:mb-4 first:mt-0 tracking-[-0.01em] pb-2 border-b border-accent-border">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-base sm:text-lg font-medium text-text-primary mt-7 sm:mt-9 mb-2 sm:mb-3 tracking-[-0.01em]">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="mb-4 text-text-secondary leading-[1.8]">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="space-y-1.5 sm:space-y-2 mb-5 ml-4 list-disc">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="space-y-1.5 sm:space-y-2 mb-5 list-decimal ml-4">{children}</ol>
  ),
  li: ({ children }) => (
    <li className="text-text-secondary leading-[1.8] pl-1">{children}</li>
  ),
  strong: ({ children }) => (
    <strong className="text-text-primary font-semibold">{children}</strong>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      className="text-accent-action hover:text-accent-action-hover underline underline-offset-2 decoration-accent-action/30 hover:decoration-accent-action transition-colors"
    >
      {children}
    </a>
  ),
  blockquote: ({ children }) => {
    const type = detectCallout(children);
    if (type) {
      return <div className={calloutStyles[type]}>{children}</div>;
    }
    return <blockquote>{children}</blockquote>;
  },
  code: ({ className, children }) => {
    const isBlock = className?.includes("language-");
    if (isBlock) {
      return <code className="font-mono">{children}</code>;
    }
    return <code>{children}</code>;
  },
  pre: ({ children }) => <pre>{children}</pre>,
  img: ({ src, alt }) => (
    <figure className="blog-figure">
      {src && typeof src === "string" && (
        <Image
          src={src}
          alt={alt || ""}
          width={680}
          height={400}
          className="w-full h-auto"
          loading="lazy"
          sizes="(max-width: 680px) 100vw, 680px"
        />
      )}
      {alt && <figcaption>{alt}</figcaption>}
    </figure>
  ),
  table: ({ children }) => (
    <div className="table-wrapper">
      <table>{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead>{children}</thead>,
  tbody: ({ children }) => <tbody>{children}</tbody>,
  tr: ({ children }) => <tr>{children}</tr>,
  th: ({ children }) => <th>{children}</th>,
  td: ({ children }) => <td>{children}</td>,
  hr: () => <hr className="my-10 border-accent-border" />,
};

interface MarkdownContentProps {
  content: string;
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <div className="prose-content">
      <ReactMarkdown components={components} remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
}
