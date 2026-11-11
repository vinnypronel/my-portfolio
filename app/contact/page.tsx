import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/Reveal";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch: internships, research collaborations, or freelance web work for your business.",
  openGraph: {
    title: "Contact · Vinny",
    description:
      "Get in touch: internships, research collaborations, or freelance web work for your business.",
  },
};

export default function ContactPage() {
  return (
    <div className="container-site pt-16 pb-8 sm:pt-24">
      <div className="grid gap-14 lg:grid-cols-12">
        <header className="lg:col-span-5">
          <Reveal>
            <p className="eyebrow">Contact</p>
            <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-6xl">
              Let&rsquo;s <em className="text-accent">talk.</em>
            </h1>
            <p className="prose-measure mt-6">
              Recruiting, research, or just saying hi after a conference. My
              inbox is open.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            {/* Freelance micro-copy: a real revenue stream, invited explicitly */}
            <div className="mt-8 rounded-2xl border border-freelance/25 bg-freelance/8 p-6">
              <p className="text-sm font-semibold text-freelance">
                Run a local business?
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                I build websites that owners manage themselves, for real
                businesses like ice cream shops, salons, and training gyms. If your business
                needs a site that actually brings in customers, reach out. It
                starts with a message exactly like this one.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-col gap-3">
              <a
                href={`mailto:${site.email}`}
                className="text-sm font-semibold text-accent hover:text-accent-deep"
              >
                {site.email} ↗
              </a>
              {/* PLACEHOLDER: real profile URLs live in data/site.ts */}
              <a
                href={site.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-accent hover:text-accent-deep"
              >
                LinkedIn ↗
              </a>
              <a
                href={site.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-accent hover:text-accent-deep"
              >
                GitHub ↗
              </a>
            </div>
          </Reveal>
        </header>

        <div className="lg:col-span-7">
          <Reveal delay={0.15}>
            <div className="rounded-2xl border hairline bg-cream p-7 shadow-card sm:p-10">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
