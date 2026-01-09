import { notFound } from "next/navigation";
import { Calendar, GithubLogo } from "@phosphor-icons/react/dist/ssr";
import { BackButton } from "@/components/ui/BackButton";
import { MarkdownContent } from "@/lib/markdown";
import { getAllPosts, getPostBySlug, getPostSlugs } from "@/lib/posts";
import { formatDate } from "@/lib/utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: "Non trouvé" };
  }

  return {
    title: post.title,
    description: post.description,
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="container-main section">
      <BackButton className="mb-10" />

      <header className="mb-12 prose-width">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className={`text-xs px-2.5 py-1 rounded-md font-medium ${
            post.type === "projet"
              ? "bg-text-primary/10 text-text-secondary"
              : "bg-background-elevated text-text-secondary"
          }`}>
            {post.type === "projet" ? "Projet" : "Article"}
          </span>
          <span className="flex items-center gap-1.5 text-sm text-text-tertiary">
            <Calendar size={14} />
            {formatDate(post.date)}
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl font-light tracking-[-0.02em] mb-4 leading-[1.1]">
          {post.title}
        </h1>
        <p className="text-lg text-text-secondary leading-relaxed">
          {post.description}
        </p>

        <div className="flex flex-wrap gap-2 mt-6">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs font-mono bg-background-elevated rounded-md text-text-tertiary"
            >
              {tag}
            </span>
          ))}
        </div>

        {post.github && (
          <div className="flex gap-3 mt-8">
            <a
              href={post.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md border border-accent-border text-text-primary hover:bg-background-elevated transition-colors duration-200"
            >
              <GithubLogo size={16} />
              Code source
            </a>
          </div>
        )}
      </header>

      <article className="prose-width">
        <MarkdownContent content={post.content} />
      </article>

      <div className="mt-16 pt-8 border-t border-accent-border">
        <BackButton>Retour au blog</BackButton>
      </div>
    </div>
  );
}
