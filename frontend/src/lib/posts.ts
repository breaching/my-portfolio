import fs from "fs";
import path from "path";
import type { Post, PostType } from "@/types";

const postsDirectory = path.join(process.cwd(), "src/content/posts");

interface Frontmatter {
  title: string;
  description: string;
  type: PostType;
  date: string;
  tags: string[];
  github?: string;
}

function parseFrontmatter(content: string): { data: Frontmatter; content: string } {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    throw new Error("Invalid frontmatter format");
  }

  const [, frontmatterBlock, markdownContent] = match;
  const data: Record<string, unknown> = {};

  frontmatterBlock.split("\n").forEach((line) => {
    const colonIndex = line.indexOf(":");
    if (colonIndex === -1) return;

    const key = line.slice(0, colonIndex).trim();
    let value = line.slice(colonIndex + 1).trim();

    // Remove quotes if present
    if ((value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    // Parse arrays
    if (value.startsWith("[") && value.endsWith("]")) {
      const arrayContent = value.slice(1, -1);
      data[key] = arrayContent
        .split(",")
        .map((item) => item.trim().replace(/^["']|["']$/g, ""));
    } else {
      data[key] = value;
    }
  });

  return {
    data: data as unknown as Frontmatter,
    content: markdownContent.trim(),
  };
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);

  const posts = fileNames
    .filter((fileName) => fileName.endsWith(".md") && !fileName.startsWith("_"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = parseFrontmatter(fileContents);

      return {
        slug,
        title: data.title,
        description: data.description,
        type: data.type,
        date: data.date,
        tags: data.tags,
        github: data.github,
        content,
      } as Post;
    });

  return posts.sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(slug: string): Post | undefined {
  const posts = getAllPosts();
  return posts.find((post) => post.slug === slug);
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  return fs.readdirSync(postsDirectory)
    .filter((fileName) => fileName.endsWith(".md") && !fileName.startsWith("_"))
    .map((fileName) => fileName.replace(/\.md$/, ""));
}
