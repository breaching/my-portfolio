export type PostType = "article" | "projet";

export interface Post {
  slug: string;
  title: string;
  description: string;
  type: PostType;
  date: string;
  tags: string[];
  github?: string;
  image?: string;
  content: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export type FormStatus = "idle" | "loading" | "success" | "error";
