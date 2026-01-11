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
  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-accent-border pl-4 my-4 text-text-tertiary italic">
      {children}
    </blockquote>
  ),
  code: ({ className, children }) => {
    const isBlock = className?.includes("language-");
    if (isBlock) {
      return (
        <code className="text-[13px] sm:text-sm font-mono text-text-secondary">{children}</code>
      );
    }
    return (
      <code className="px-1 sm:px-1.5 py-0.5 rounded bg-background-elevated text-text-primary font-mono text-[13px] sm:text-sm break-words">
        {children}
      </code>
    );
  },
  pre: ({ children }) => (
    <pre className="my-4 sm:my-6 p-3 sm:p-4 bg-background-elevated overflow-x-auto border border-accent-border">
      {children}
    </pre>
  ),
  table: ({ children }) => (
    <div className="overflow-x-auto my-4 sm:my-6">
      <table className="min-w-full">{children}</table>
    </div>
  ),
  th: ({ children }) => (
    <th className="px-2 sm:px-3 py-2 text-left text-sm font-medium text-text-primary bg-background-elevated border border-accent-border">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="px-2 sm:px-3 py-2 text-sm text-text-secondary border border-accent-border">
      {children}
    </td>
  ),
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
