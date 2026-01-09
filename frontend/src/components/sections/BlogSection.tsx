"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "@phosphor-icons/react";
import type { Post } from "@/types";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

interface BlogSectionProps {
  posts: Post[];
}

export function BlogSection({ posts }: BlogSectionProps) {
  const recentPosts = posts.slice(0, 2);

  return (
    <section id="blog" className="section border-t border-accent-border">
      <motion.div {...fadeIn}>
        <h2 className="text-3xl font-light tracking-[-0.02em] mb-4">Blog</h2>
        <p className="text-text-secondary prose-width leading-relaxed mb-10">
          Projets techniques et retours d&apos;expérience. Chaque projet est
          documenté avec le problème résolu, les choix techniques et ce que
          j&apos;ai appris.
        </p>

        <div className="space-y-0">
          {recentPosts.map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
            >
              <Link
                href={`/blog/${post.slug}`}
                className="group relative flex items-start justify-between py-5 border-b border-accent-border hover:bg-background-elevated/80 -mx-4 px-4 transition-all duration-300"
              >
                <motion.div className="absolute left-0 top-0 bottom-0 w-1 bg-accent-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="flex-1 min-w-0 pl-3">
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className={`text-xs px-2 py-0.5 rounded border transition-all ${
                        post.type === "projet"
                          ? "bg-text-primary/10 text-text-secondary border-text-primary/20"
                          : "bg-background-elevated text-text-secondary border-accent-border"
                      }`}
                    >
                      {post.type === "projet" ? "Projet" : "Article"}
                    </span>
                  </div>
                  <h3 className="text-base font-medium mb-1.5 tracking-[-0.01em] group-hover:text-text-primary transition-colors duration-200">
                    {post.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed line-clamp-1 group-hover:text-text-secondary transition-colors">
                    {post.description}
                  </p>
                </div>
                <ArrowUpRight
                  size={18}
                  className="text-text-tertiary group-hover:text-accent-primary transition-all duration-200 flex-shrink-0 ml-4 mt-2"
                />
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-8"
        >
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors"
          >
            Voir tous les articles
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
