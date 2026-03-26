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
      {/* Hide portfolio chrome for demo sites */}
      <style>{`
        body > header, body > main ~ footer, body > main ~ div { display: none !important; }
        #main-content { padding-top: 0 !important; }
      `}</style>
      {children}
    </>
  );
}
