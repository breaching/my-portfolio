import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import { BlogList } from "@/components/blog/BlogList";

export const metadata: Metadata = {
  title: "Blog — Articles web et retours d'expérience",
  description:
    "Articles techniques, retours de projets et conseils pour la création de sites web. Par Alexis Dubus, développeur freelance à Caen.",
  alternates: {
    canonical: "https://dubus.pro/blog",
  },
  openGraph: {
    title: "Blog — Alexis Dubus, Dev Web Caen",
    description:
      "Articles techniques et retours d'expérience sur le développement web.",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="container-main">
      <section className="section">
        <div className="mb-12">
          <h1 className="text-3xl font-light tracking-[-0.02em] mb-4">Blog — Conseils et retours d&apos;expérience en développement web</h1>
          <p className="text-text-secondary prose-width leading-relaxed">
            Projets techniques et retours d&apos;expérience. Chaque projet est documenté
            avec le problème résolu, les choix techniques et ce que j&apos;ai appris.
          </p>
        </div>

        <BlogList posts={posts} />
      </section>
    </div>
  );
}
