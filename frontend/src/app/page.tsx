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
      {/* Full-bleed sections — backgrounds go edge-to-edge */}
      <HeroSection />
      <TechLogosSection />
      <DifferencesSection />

      {/* Contained sections */}
      <div className="container-main">
        <RealisationsSection />
        <ServicesSection />
        <ProcessSection />
        <GarantiesSection />
        <FaqSection />
      </div>

      {/* Full-bleed sections */}
      <ContactSection />
      <div className="container-main">
        <BlogSection posts={posts} />
      </div>
      <PreFooterCta />
    </>
  );
}
