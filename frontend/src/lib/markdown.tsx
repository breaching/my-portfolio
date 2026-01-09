"use client";

import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";

const components: Components = {
  h2: ({ children }) => (
    <h2 className="text-xl font-medium text-text-primary mt-10 mb-4 first:mt-0 tracking-[-0.01em]">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-lg font-medium text-text-primary mt-8 mb-3 tracking-[-0.01em]">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="mb-4 text-text-secondary leading-[1.7]">{children}</p>
  ),
  ul: ({ children }) => <ul className="space-y-2 mb-4">{children}</ul>,
  ol: ({ children }) => (
    <ol className="space-y-2 mb-4 list-decimal ml-4">{children}</ol>
  ),
  li: ({ children }) => (
    <li className="text-sm text-text-secondary leading-relaxed">{children}</li>
  ),
  strong: ({ children }) => (
    <strong className="text-text-primary font-medium">{children}</strong>
  ),
  code: ({ className, children }) => {
    const isBlock = className?.includes("language-");
    if (isBlock) {
      return (
        <code className="text-sm font-mono text-text-secondary">{children}</code>
      );
    }
    return (
      <code className="px-1.5 py-0.5 rounded bg-background-elevated text-text-primary font-mono text-sm">
        {children}
      </code>
    );
  },
  pre: ({ children }) => (
    <pre className="my-6 p-4 rounded-lg bg-background-elevated overflow-x-auto border border-accent-border">
      {children}
    </pre>
  ),
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
