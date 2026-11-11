import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Resume for a full-stack developer and researcher. View inline or download the PDF.",
  openGraph: {
    title: "Resume · Vinny",
    description:
      "Resume for a full-stack developer and researcher. View inline or download the PDF.",
  },
};

export default function ResumePage() {
  return (
    <div className="container-site pt-16 pb-8 sm:pt-24">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Resume</p>
            <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-6xl">
              The one-pager.
            </h1>
          </div>
          <a
            href={site.resumePath}
            download={site.resumeDownloadName}
            className="btn btn-primary"
          >
            Download PDF
          </a>
        </div>
      </Reveal>

      <div className="mt-12 grid gap-12 lg:grid-cols-12">
        {/* Inline PDF viewer */}
        <Reveal className="lg:col-span-8">
          {/* Live resume. To update it, drop the new PDF at public/resume.pdf
              (same filename) and this embed plus every download link across the
              site picks it up automatically.

              The container is locked to US Letter proportions (8.5 x 11) and the
              fragment asks the viewer to fit the whole page, so the resume shows
              in full with no inner scrollbar and no viewer chrome. */}
          <div className="aspect-[8.5/11] w-full overflow-hidden rounded-2xl border hairline bg-cream shadow-card">
            <iframe
              src={`${site.resumePath}#toolbar=0&navpanes=0&scrollbar=0&statusbar=0&pagemode=none&view=Fit`}
              title="Resume PDF"
              loading="lazy"
              className="h-full w-full border-0"
            />
          </div>
          <p className="mt-3 text-xs text-ink-faint">
            Trouble viewing it here?{" "}
            <a
              href={site.resumePath}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-accent hover:text-accent-deep"
            >
              Open the PDF in a new tab
            </a>
            .
          </p>
        </Reveal>

        {/* HTML summary for skimmers */}
        <div className="lg:col-span-4">
          <Reveal delay={0.1}>
            <div className="flex flex-col gap-8 rounded-2xl border hairline bg-paper-deep/50 p-8">
              <div>
                <h2 className="eyebrow">At a glance</h2>
                <p className="mt-3 font-display text-xl leading-snug font-medium">
                  {site.positioning}
                </p>
              </div>

              <div>
                <h3 className="eyebrow">Roles</h3>
                <ul className="mt-3 flex flex-col gap-2 text-sm leading-relaxed text-ink-soft">
                  <li>Researcher · IUSE Scholars Academy</li>
                  <li>Lead Web Developer · Kean WiCyS (e-board)</li>
                  <li>Peer mentor &amp; tutor · Code Samurai</li>
                  <li>Freelance web developer · Co-founder, Adzio</li>
                  {/* Finished work sits last and is dated, so it never reads
                      as if it's still running. */}
                  <li className="text-ink-faint">
                    Data Visualization &amp; Analytics Intern · GSSRP (Jul 6 to
                    30, 2026)
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="eyebrow">Research &amp; presentations</h3>
                <ul className="mt-3 flex flex-col gap-2 text-sm leading-relaxed text-ink-soft">
                  <li>GMiS Research Posters Competition · Jobs vs. Wages</li>
                  <li>UR2PhD conference showcase, New Orleans · Debate Coach</li>
                </ul>
              </div>

              <div>
                <h3 className="eyebrow">Education &amp; training</h3>
                <ul className="mt-3 flex flex-col gap-2 text-sm leading-relaxed text-ink-soft">
                  <li>
                    B.S. Computer Science, Kean University · Expected May 2027
                  </li>
                  <li>Dean&rsquo;s List · Spring 2024, Fall 2025</li>
                  <li>CRA UR2PhD research training program</li>
                  <li>CodePath TIP103 · Advanced Technical Interview Prep</li>
                </ul>
              </div>

              <div>
                <h3 className="eyebrow">Core stack</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                  TypeScript · React · Next.js · Tailwind CSS · GSAP · Node.js ·
                  MySQL · PHP · Python · SQL
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
