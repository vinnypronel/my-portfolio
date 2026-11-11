import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Cursor } from "@/components/Cursor";
import { site } from "@/data/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.brand} · ${site.tagline}`,
    template: `%s · ${site.brand}`,
  },
  description: site.positioning,
  openGraph: {
    type: "website",
    siteName: site.brand,
    title: `${site.brand} · ${site.tagline}`,
    description: site.positioning,
    url: site.url,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.brand} · ${site.tagline}`,
    description: site.positioning,
  },
};

export const viewport: Viewport = {
  themeColor: "#050507",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        {/* The hero poster is the LCP candidate on the home page */}
        <link rel="preload" as="image" href="/video/hero-topo.webp" />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:bg-accent focus:px-5 focus:py-3 focus:font-mono focus:text-xs focus:font-medium focus:uppercase focus:tracking-widest focus:text-void"
        >
          Skip to content
        </a>
        <SmoothScroll />
        <Cursor />
        <Nav />
        <main id="main" className="relative z-[1]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
