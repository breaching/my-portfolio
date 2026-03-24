import { getAllPosts } from "@/lib/posts";
import {
  HeroSection,
  ServicesSection,
  RealisationsSection,
  ProcessSection,
  BlogSection,
  ContactSection,
} from "@/components/sections";

export default function HomePage() {
  const posts = getAllPosts();

  return (
    <div className="container-main">
      <HeroSection />
      <ServicesSection />
      <RealisationsSection />
      <ProcessSection />
      <BlogSection posts={posts} />
      <ContactSection />
    </div>
  );
}
