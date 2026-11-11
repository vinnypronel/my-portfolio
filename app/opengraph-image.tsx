import { ImageResponse } from "next/og";
import { site } from "@/data/site";

/**
 * Sitewide Open Graph image, generated at the edge, so links shared on
 * LinkedIn/Discord/iMessage get a branded card with zero extra config.
 */
export const runtime = "edge";
export const alt = `${site.brand} · ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          backgroundColor: "#050507",
          color: "#f2f2f5",
          fontFamily: "Helvetica, Arial, sans-serif",
          backgroundImage:
            "radial-gradient(ellipse at 80% 20%, rgba(0,229,255,0.16), transparent 55%)",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, letterSpacing: 2 }}>
          {site.brand}
          <span style={{ color: "#00e5ff" }}>.</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 88, fontWeight: 700, letterSpacing: -4, lineHeight: 0.98, display: "flex", flexDirection: "column" }}>
            <span>Websites that sell.</span>
            <span>Platforms that run themselves.</span>
          </div>
          <div style={{ fontSize: 28, color: "rgba(242,242,245,0.6)", maxWidth: 900 }}>
            Production Next.js sites and booking platforms for real businesses.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 22,
            letterSpacing: 2,
            color: "rgba(242,242,245,0.45)",
          }}
        >
          <div>DIGITAL STUDIO · NEW JERSEY</div>
          <div>{site.url.replace("https://", "")}</div>
        </div>
      </div>
    ),
    size
  );
}
