"use client";

import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";

const components: Components = {
  h2: ({ children }) => (
    <h2 className="text-lg sm:text-xl font-medium text-text-primary mt-8 sm:mt-10 mb-3 sm:mb-4 first:mt-0 tracking-[-0.01em]">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-base sm:text-lg font-medium text-text-primary mt-6 sm:mt-8 mb-2 sm:mb-3 tracking-[-0.01em]">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="mb-4 text-text-secondary leading-relaxed">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="space-y-1.5 sm:space-y-2 mb-4 ml-4 list-disc">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="space-y-1.5 sm:space-y-2 mb-4 list-decimal ml-4">{children}</ol>
  ),
  li: ({ children }) => (
    <li className="text-text-secondary leading-relaxed pl-1">{children}</li>
  ),
  strong: ({ children }) => (
    <strong className="text-text-primary font-medium">{children}</strong>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      className="text-accent-primary hover:underline"
    >
      {children}
    </a>
  ),
  blockquote: ({ children }) => <blockquote>{children}</blockquote>,
  code: ({ className, children }) => {
    const isBlock = className?.includes("language-");
    if (isBlock) {
      return <code className="font-mono">{children}</code>;
    }
    return <code>{children}</code>;
  },
  pre: ({ children }) => <pre>{children}</pre>,
  table: ({ children }) => <table>{children}</table>,
  thead: ({ children }) => <thead>{children}</thead>,
  tbody: ({ children }) => <tbody>{children}</tbody>,
  tr: ({ children }) => <tr>{children}</tr>,
  th: ({ children }) => <th>{children}</th>,
  td: ({ children }) => <td>{children}</td>,
  hr: () => <hr className="my-8 border-accent-border" />,
};

interface MarkdownContentProps {
  content: string;
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <div className="prose-content">
      <ReactMarkdown components={components}>{content}</ReactMarkdown>
    </div>
  );
}
