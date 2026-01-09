export type PostType = "article" | "projet";

export interface Post {
  slug: string;
  title: string;
  description: string;
  type: PostType;
  date: string;
  tags: string[];
  github?: string;
  content: string;
}

export interface Expertise {
  title: string;
  description: string;
}

export interface TimelineItem {
  period: string;
  title: string;
  subtitle: string;
  description: string;
}

export interface ContactLink {
  label: string;
  value: string;
  href: string;
  icon: React.ComponentType<{ size?: number; weight?: string; className?: string }>;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export type FormStatus = "idle" | "loading" | "success" | "error";
