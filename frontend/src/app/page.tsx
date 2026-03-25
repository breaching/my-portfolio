import { getAllPosts } from "@/lib/posts";
import {
  HeroSection,
  ServicesSection,
  DifferencesSection,
  RealisationsSection,
  ProcessSection,
  FaqSection,
  BlogSection,
  ContactSection,
} from "@/components/sections";

export default function HomePage() {
  const posts = getAllPosts();

  return (
    <div className="container-main">
      <HeroSection />
      <ServicesSection />
      <DifferencesSection />
      <RealisationsSection />
      <ProcessSection />
      <FaqSection />
      <BlogSection posts={posts} />
      <ContactSection />
    </div>
  );
}
