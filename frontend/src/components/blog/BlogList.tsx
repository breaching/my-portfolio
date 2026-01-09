"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, ArrowDown } from "@phosphor-icons/react";
import { formatDateShort } from "@/lib/utils";
import { FilterTabs, type FilterOption } from "@/components/ui/FilterTabs";
import type { Post, PostType } from "@/types";

type FilterValue = "all" | PostType;

const filterOptions: FilterOption<FilterValue>[] = [
  { value: "all", label: "Tout" },
  { value: "projet", label: "Projets" },
  { value: "article", label: "Articles" },
];

const POSTS_PER_PAGE = 6;

interface BlogListProps {
  posts: Post[];
}

export function BlogList({ posts }: BlogListProps) {
  const [filter, setFilter] = useState<FilterValue>("all");
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE);

  const filteredPosts = useMemo(() => {
    return filter === "all"
      ? posts
      : posts.filter((post) => post.type === filter);
  }, [filter, posts]);

  const visiblePosts = filteredPosts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredPosts.length;
  const remaining = filteredPosts.length - visibleCount;

  const handleFilterChange = (newFilter: FilterValue) => {
    setFilter(newFilter);
    setVisibleCount(POSTS_PER_PAGE);
  };

  const loadMore = () => {
    setVisibleCount((prev) => prev + POSTS_PER_PAGE);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="mb-10"
      >
        <FilterTabs
          options={filterOptions}
          value={filter}
          onChange={handleFilterChange}
          layoutId="blog-page-filter"
          showPrefix={false}
        />
      </motion.div>

      <div className="space-y-0">
        {visiblePosts.map((post, index) => (
          <motion.div
            key={post.slug}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.03 }}
          >
            <Link
              href={`/blog/${post.slug}`}
              className="group relative flex items-start justify-between py-5 border-b border-accent-border hover:bg-background-elevated/80 -mx-4 px-4 transition-all duration-300"
            >
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="flex-1 min-w-0 pl-3">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs text-text-tertiary font-mono tabular-nums">
                    {formatDateShort(post.date)}
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded border ${
                    post.type === "projet"
                      ? "bg-text-primary/10 text-text-secondary border-text-primary/20"
                      : "bg-background-elevated text-text-secondary border-accent-border"
                  }`}>
                    {post.type === "projet" ? "Projet" : "Article"}
                  </span>
                </div>
                <h2 className="text-base font-medium mb-1.5 tracking-[-0.01em] group-hover:text-text-primary transition-colors duration-200">
                  {post.title}
                </h2>
                <p className="text-sm text-text-secondary leading-relaxed line-clamp-1">
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

      {hasMore && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-8 text-center"
        >
          <button
            onClick={loadMore}
            className="inline-flex items-center gap-2 px-6 py-3 text-sm text-text-secondary hover:text-text-primary border border-accent-border rounded-md hover:bg-background-elevated transition-colors"
          >
            <ArrowDown size={16} />
            Voir plus ({remaining} restant{remaining > 1 ? "s" : ""})
          </button>
        </motion.div>
      )}

      {filteredPosts.length === 0 && (
        <p className="text-text-secondary text-center py-16">
          Aucun contenu pour le moment.
        </p>
      )}
    </>
  );
}
