import Link from "next/link";
import { site } from "@/data/site";
import { BackgroundVideo } from "./BackgroundVideo";
import { SocialLinks } from "./SocialLinks";

/** Dark editorial footer: the site's one full inversion moment. */
export function Footer() {
  return (
    <footer className="relative isolate mt-24 overflow-hidden bg-ink text-cream">
      {/* Drifting particle field. It only loads once the footer is nearly in
          view, so it costs nothing on pages the visitor never scrolls. */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <BackgroundVideo
          src="/video/particles.mp4"
          poster="/video/particles.jpg"
          parallax={10}
          className="absolute -inset-y-[12%] inset-x-0 opacity-55"
          videoClassName="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/70 to-ink/88" />
      </div>

      <div className="container-site py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Big CTA */}
          <div className="lg:col-span-7">
            <p className="text-xs font-semibold tracking-[0.22em] uppercase text-cream/50">
              Get in touch
            </p>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
              Have a project in mind?{" "}
              <em className="text-accent-bright not-italic sm:italic">
                Let&rsquo;s build it.
              </em>
            </h2>
            <p className="mt-4 max-w-[48ch] leading-relaxed text-cream/70">
              Open to internships, research collaborations, and freelance web
              work for businesses that want a site that actually earns its keep.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={`mailto:${site.email}`} className="btn btn-on-dark">
                {site.email}
              </a>
              <a
                href={site.resumePath}
                download={site.resumeDownloadName}
                className="btn border border-cream/30 text-cream hover:border-cream hover:bg-cream/10"
              >
                Download resume
              </a>
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 lg:col-span-5 lg:justify-items-end">
            <nav aria-label="Footer" className="flex flex-col gap-3">
              <p className="text-xs font-semibold tracking-[0.22em] uppercase text-cream/50">
                Explore
              </p>
              {[
                { label: "Work", href: "/projects" },
                { label: "Research", href: "/research" },
                { label: "About", href: "/about" },
                { label: "Resume", href: "/resume" },
                { label: "Contact", href: "/contact" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-cream/75 transition-colors hover:text-accent-bright"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex flex-col gap-3">
              <p className="text-xs font-semibold tracking-[0.22em] uppercase text-cream/50">
                Elsewhere
              </p>
              {/* Profile URLs live in data/site.ts. GitHub is still a
                  placeholder there, so its icon is hidden until it's filled in. */}
              <SocialLinks />
              <a
                href={`mailto:${site.email}`}
                className="mt-1 text-sm font-medium text-cream/75 transition-colors hover:text-accent-bright"
              >
                Email ↗
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-cream/15 pt-8">
          <p className="text-sm text-cream/50">
            © 2026 {site.name} · {site.location}
          </p>
          <p className="text-sm text-cream/50">
            Designed &amp; built from scratch, no templates.
          </p>
        </div>
      </div>
    </footer>
  );
}
