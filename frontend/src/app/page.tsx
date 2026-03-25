import { getAllPosts } from "@/lib/posts";
import {
  HeroSection,
  TechLogosSection,
  DifferencesSection,
  RealisationsSection,
  ServicesSection,
  ProcessSection,
  GarantiesSection,
  FaqSection,
  ContactSection,
  BlogSection,
  PreFooterCta,
} from "@/components/sections";

export default function HomePage() {
  const posts = getAllPosts();

  return (
    <>
      <HeroSection />
      <TechLogosSection />
      <DifferencesSection />
      <RealisationsSection />
      <ServicesSection />
      <ProcessSection />
      <GarantiesSection />
      <FaqSection />
      <ContactSection />
      <BlogSection posts={posts} />
      <PreFooterCta />
    </>
  );
}
