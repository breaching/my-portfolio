import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Alexis Dubus — Développeur Web Freelance à Caen";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0A0A0B",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Top accent line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "linear-gradient(90deg, #818CF8, #6366F1)",
          }}
        />

        {/* Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: "#10B981",
            }}
          />
          <span style={{ color: "#A1A1AA", fontSize: "20px" }}>
            Disponible pour de nouveaux projets
          </span>
        </div>

        {/* Title */}
        <h1
          style={{
            fontSize: "56px",
            fontWeight: 300,
            color: "#FAFAFA",
            lineHeight: 1.15,
            margin: "0 0 20px 0",
            letterSpacing: "-0.02em",
          }}
        >
          Développeur Web Freelance
          <br />
          <span style={{ color: "#818CF8" }}>à Caen</span>
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: "24px",
            color: "#A1A1AA",
            margin: "0 0 40px 0",
            lineHeight: 1.5,
          }}
        >
          Sites vitrines modernes · Applications web · SEO
        </p>

        {/* Bottom info */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "24px",
            marginTop: "auto",
          }}
        >
          <span
            style={{
              color: "#FAFAFA",
              fontSize: "22px",
              fontWeight: 500,
            }}
          >
            dubus.pro
          </span>
          <span style={{ color: "#27272A", fontSize: "22px" }}>·</span>
          <span style={{ color: "#71717A", fontSize: "18px" }}>
            À partir de 800 €
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
