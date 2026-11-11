import Link from "next/link";
import { Hero } from "@/components/home/Hero";
import { Tracks } from "@/components/home/Tracks";
import { CaseStudyRow } from "@/components/CaseStudyRow";
import { SectionHeading } from "@/components/SectionHeading";
import { StatBlock } from "@/components/StatBlock";
import { Reveal } from "@/components/Reveal";
import { ScrubVideo } from "@/components/video/ScrubVideo";
import { featuredProjects } from "@/data/projects";
import { site } from "@/data/site";

const processSteps = [
  {
    index: "01",
    title: "Discover",
    body: "Every project starts with the business, not the brief. What has to be true for this site to pay for itself? That answer shapes everything after it.",
  },
  {
    index: "02",
    title: "Design",
    body: "A brand system and layout built for the content you actually have, tested at every screen size from a phone to a 1920 monitor before a line of code is written.",
  },
  {
    index: "03",
    title: "Ship",
    body: "Production Next.js on Vercel, a custom domain, and an edit mode so you update your own site and never wait on a developer again.",
  },
];

/* Every figure below is pulled from an outcome already recorded in data/. */
const proof = [
  { value: "600+", label: "Monthly visitors", detail: "Day's Ice Cream, live in production" },
  { value: "2 wks", label: "Brief to live", detail: "AIO Training booking platform" },
  { value: "52", label: "States analyzed", detail: "Jobs vs. Wages, presented at GMiS" },
  { value: "100%", label: "Fabrication rate found", detail: "Debate Coach, presented in New Orleans" },
];

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Selected work */}
      <section className="container-site pt-28 sm:pt-36">
        <SectionHeading
          eyebrow="Selected work"
          lines={["Built to be used,", "not just looked at."]}
          link={{ label: "All work", href: "/projects" }}
        />
        <div className="mt-16 flex flex-col gap-24 sm:gap-32">
          {featuredProjects.map((project, i) => (
            <Reveal key={project.slug}>
              <CaseStudyRow project={project} index={i} flip={i % 2 === 1} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Process, scroll-bound */}
      <div className="mt-28 sm:mt-40">
        <ScrubVideo
          src="/video/process-scrub.mp4"
          poster="/video/process-scrub.webp"
          eyebrow="How a project runs"
          steps={processSteps}
        />
      </div>

      {/* Tracks */}
      <section className="container-site pt-28 sm:pt-36">
        <SectionHeading eyebrow="What the studio does" lines={["Three tracks.", "One standard."]} />
        <Tracks />
      </section>

      {/* Proof */}
      <section className="container-site pt-28 sm:pt-36">
        <Reveal>
          <div className="grid gap-12 border-t border-line pt-12 sm:grid-cols-2 lg:grid-cols-4">
            {proof.map((s) => (
              <StatBlock key={s.label} value={s.value} label={s.label} detail={s.detail} />
            ))}
          </div>
        </Reveal>
      </section>

      {/* Studio teaser */}
      <section className="container-site pt-28 sm:pt-36">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHeading eyebrow="The studio" lines={["One builder.", "Every detail."]} />
            <Reveal delay={0.1}>
              <div className="prose-measure mt-8 flex flex-col gap-5">
                <p>
                  {site.brand} is run by {site.fullName}, a developer and
                  researcher in New Jersey. Client work ships from here: ice
                  cream shops, salons, training gyms, and the studios behind
                  them. Research happens here too, with findings presented at
                  GMiS and the UR2PhD showcase in New Orleans.
                </p>
                <p>
                  Small on purpose. You talk to the person who designs, builds,
                  and maintains the thing.
                </p>
              </div>
              <Link
                href="/about"
                className="link-sweep mt-8 inline-block font-mono text-[13px] tracking-[0.08em] text-fg uppercase"
              >
                About the studio
              </Link>
            </Reveal>
          </div>
          <div className="lg:col-span-5">
            <Reveal delay={0.2}>
              {/* PLACEHOLDER: replace with the real photo at /public/about/headshot.jpg
                  using <Image fill className="object-cover" /> inside this frame. */}
              <div
                role="img"
                aria-label={`Photo of ${site.fullName}, coming soon`}
                className="relative flex aspect-[4/5] items-end overflow-hidden rounded-[6px] border border-line bg-ink-800 p-6"
              >
                <div
                  aria-hidden
                  className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgb(0_229_255_/_0.12),transparent_60%)]"
                />
                <p className="relative font-mono text-[11px] tracking-[0.18em] text-fg-faint uppercase">
                  Portrait / pending
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
