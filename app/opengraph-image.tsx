import { ImageResponse } from "next/og";
import { site } from "@/data/site";

/**
 * Sitewide Open Graph image, generated at the edge, so links shared on
 * LinkedIn/Discord/iMessage get a branded card with zero extra config.
 */
export const runtime = "edge";
export const alt = `${site.name} · ${site.role}`;
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
          backgroundColor: "#1b150d",
          color: "#fbf8f2",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", gap: 12 }}>
          <div style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: "#4fd8dd" }} />
          <div style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: "#ff9a6b" }} />
          <div style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: "#f487cd" }} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 96, fontWeight: 600, letterSpacing: -3, display: "flex" }}>
            {site.name}
            <span style={{ color: "#a5a0ff" }}>.</span>
          </div>
          <div
            style={{
              fontSize: 34,
              color: "rgba(251, 248, 242, 0.75)",
              fontFamily: "Helvetica, Arial, sans-serif",
              maxWidth: 900,
            }}
          >
            Full-stack developer &amp; researcher. Client work shipped,
            findings presented.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 24,
            color: "rgba(251, 248, 242, 0.5)",
            fontFamily: "Helvetica, Arial, sans-serif",
          }}
        >
          <div>Research · Freelance · Leadership</div>
          <div>{site.url.replace("https://", "")}</div>
        </div>
      </div>
    ),
    size
  );
}
