import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://dubus.pro";

  const posts = getAllPosts();
  const postUrls = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const latestPostDate = posts.length > 0
    ? new Date(posts[0].date)
    : new Date("2026-03-25");

  return [
    {
      url: baseUrl,
      lastModified: latestPostDate,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: latestPostDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/parcours`,
      lastModified: new Date("2026-03-25"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/mentions-legales`,
      lastModified: new Date("2026-03-25"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    ...postUrls,
  ];
}
