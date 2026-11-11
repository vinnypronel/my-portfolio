import Link from "next/link";
import { site } from "@/data/site";
import { AmbientVideo } from "./video/AmbientVideo";
import { SocialLinks } from "./SocialLinks";
import { Reveal } from "./Reveal";

const footerLinks = [
  { label: "Work", href: "/projects" },
  { label: "Research", href: "/research" },
  { label: "Studio", href: "/about" },
  { label: "Resume", href: "/resume" },
  { label: "Contact", href: "/contact" },
];

/** Full-bleed CTA band on the inverted ink clip, then the link columns. */
export function Footer() {
  return (
    <footer className="relative isolate mt-32 overflow-hidden border-t border-line bg-void">
      {/* Cyan ink in water, loading only once the footer nears the viewport */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <AmbientVideo
          src="/video/footer-ink.mp4"
          poster="/video/footer-ink.webp"
          parallax={10}
          className="absolute -inset-y-[12%] inset-x-0 opacity-70"
          videoClassName="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-void via-void/55 to-void" />
      </div>

      <div className="container-site pt-28 pb-10 sm:pt-40">
        <Reveal>
          <p className="eyebrow">Next project</p>
          <h2 className="display-xl mt-6 max-w-[12ch] font-semibold">
            Have a project in mind?
          </h2>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link href="/contact" className="btn btn-primary">
              Start a project
            </Link>
            <a href={`mailto:${site.email}`} className="link-sweep font-mono text-sm text-fg-soft hover:text-fg">
              {site.email}
            </a>
          </div>
        </Reveal>

        <div className="mt-28 grid gap-10 border-t border-line pt-10 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="font-mono text-sm text-fg">
              {site.brand}
              <span className="text-accent">.</span>
            </p>
            <p className="mt-3 max-w-[36ch] text-sm leading-relaxed text-fg-soft">
              {site.positioning}
            </p>
          </div>

          <nav aria-label="Footer" className="flex flex-col gap-2.5 lg:col-span-3">
            <p className="eyebrow">Explore</p>
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="link-sweep w-fit text-sm text-fg-soft transition-colors hover:text-fg"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-3 lg:col-span-4 lg:items-end">
            <p className="eyebrow">Elsewhere</p>
            <SocialLinks />
            <a
              href={site.resumePath}
              download={site.resumeDownloadName}
              className="link-sweep mt-1 w-fit text-sm text-fg-soft transition-colors hover:text-fg"
            >
              Download resume
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] tracking-[0.08em] text-fg-faint uppercase">
          <p>
            © 2026 {site.fullName} · {site.location}
          </p>
          <p>Designed and built from scratch</p>
        </div>
      </div>
    </footer>
  );
}
