import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function DemosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Hide portfolio chrome (navbar, footer, floating CTA) for demo sites */}
      <style>{`
        header.fixed { display: none !important; }
        footer { display: none !important; }
        .fixed.bottom-6 { display: none !important; }
        #main-content { padding-top: 0 !important; }
      `}</style>
      {children}
    </>
  );
}
