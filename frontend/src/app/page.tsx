import { getAllPosts } from "@/lib/posts";
import {
  HeroSection,
  BlogSection,
  ParcoursSection,
  ContactSection,
} from "@/components/sections";

export default function HomePage() {
  const posts = getAllPosts();

  return (
    <div className="container-main">
      <HeroSection />
      <BlogSection posts={posts} />
      <ParcoursSection />
      <ContactSection />
    </div>
  );
}
