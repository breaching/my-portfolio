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
    <div className="container-main">
      <article className="section">
        <BackButton className="mb-8" />

        <header className="mb-10">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4">
            <span className={`text-xs px-2 py-1 rounded-md font-medium ${
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

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-light tracking-[-0.02em] mb-4 leading-tight">
            {post.title}
          </h1>
          <p className="text-base sm:text-lg text-text-secondary leading-relaxed max-w-2xl">
            {post.description}
          </p>

          <div className="flex flex-wrap gap-2 mt-5">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 text-xs font-mono bg-background-elevated rounded-md text-text-tertiary"
              >
                {tag}
              </span>
            ))}
          </div>

          {post.type === "projet" && post.github && (
            <div className="flex gap-3 mt-6">
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


        


                <div className="prose-content">
          <MarkdownContent content={post.content} />
        </div>

        <footer className="mt-12 pt-6 border-t border-accent-border">
          <BackButton>Retour au blog</BackButton>
        </footer>
      </article>
    </div>
  );
}
