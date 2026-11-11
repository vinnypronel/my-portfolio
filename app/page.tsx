import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { HeroViz } from "@/components/HeroViz";
import { SectionHeading } from "@/components/SectionHeading";
import { ProjectCard } from "@/components/ProjectCard";
import { StatusBadge } from "@/components/StatusBadge";
import { BackgroundVideo } from "@/components/BackgroundVideo";
import { CategoryPreviewCards } from "@/components/CategoryPreviewCards";
import { featuredProjects } from "@/data/projects";
import { site } from "@/data/site";

export default function HomePage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative isolate pt-16 pb-20 sm:pt-24 sm:pb-28">
        {/* Topographic contour clip, drifting on scroll. Brightened so its
            warm-grey paper reads as our paper, then multiplied so only the
            contour lines survive, then masked to fade out before it reaches
            the headline. */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <BackgroundVideo
            src="/video/hero-topo.mp4"
            poster="/video/hero-topo.jpg"
            parallax={12}
            className="absolute -inset-y-[18%] inset-x-0 opacity-[0.42] mix-blend-multiply"
            videoClassName="h-full w-full object-cover [filter:brightness(1.22)_contrast(1.04)]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-paper via-paper/75 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-paper to-transparent" />
        </div>

        <div className="container-site grid items-center gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow">
                {site.name} · Full-stack developer &amp; researcher · {site.location}
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="mt-6 font-display text-[2.6rem] leading-[1.08] font-semibold tracking-tight sm:text-6xl lg:text-[4.25rem]">
                I ship real client work, and I{" "}
                <em className="text-accent">research</em> how people use the
                tools we build.
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="prose-measure mt-6">
                Next.js sites in production for real businesses, data-driven
                research presented at GMiS and the UR2PhD showcase in New
                Orleans, and a habit of finishing what I start.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link href="/resume" className="btn btn-primary">
                  View resume
                </Link>
                <Link href="/projects" className="btn btn-outline">
                  View work
                </Link>
              </div>
            </Reveal>
          </div>
          <div className="hidden lg:col-span-5 lg:block">
            <Reveal delay={0.25} y={40}>
              <HeroViz />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Stat strip ───────────────────────────────────────── */}
      {/* ── Category preview ─────────────────────────────────── */}
      <section className="container-site py-20 sm:py-28">
        <Reveal>
          <SectionHeading
            eyebrow="What I do"
            title="Three tracks. One builder."
          />
        </Reveal>
        <CategoryPreviewCards />
      </section>

      {/* ── Featured work ────────────────────────────────────── */}
      <section className="container-site pb-20 sm:pb-28">
        <Reveal>
          <SectionHeading
            eyebrow="Featured work"
            title="Start with these three."
            link={{ label: "All projects", href: "/projects" }}
          />
        </Reveal>
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project, i) => (
            <li key={project.slug} className="h-full">
              <Reveal delay={i * 0.1} className="h-full">
                <ProjectCard project={project} />
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Right now ────────────────────────────────────────── */}
      <section className="container-site pb-24 sm:pb-32">
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-2xl border hairline p-8 sm:p-10">
            {/* Ink-in-water clip. The paper scrim is tuned against the clip's
                darkest pixel, so body copy holds ~5:1 and the accent badges
                ~6:1, both clear of WCAG AA. */}
            <div className="pointer-events-none absolute inset-0 -z-10">
              <BackgroundVideo
                src="/video/ink-band.mp4"
                poster="/video/ink-band.jpg"
                parallax={8}
                className="absolute -inset-y-[18%] inset-x-0"
                videoClassName="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-paper/82" />
            </div>

            <p className="eyebrow">Right now</p>
            <ul className="mt-6 grid gap-6 md:grid-cols-3">
              <li className="flex flex-col items-start gap-2.5">
                <StatusBadge status="in-progress" />
                <p className="font-semibold">Tedi&rsquo;s Hair Studio rebuild</p>
                <p className="text-sm leading-relaxed text-ink-soft">
                  A forest green brand system and custom booking, replacing the
                  salon&rsquo;s Booksy dependency.
                </p>
              </li>
              <li className="flex flex-col items-start gap-2.5">
                <StatusBadge status="in-progress" />
                <p className="font-semibold">Java execution visualizer</p>
                <p className="text-sm leading-relaxed text-ink-soft">
                  UR2PhD-REU research: an AI-assisted stack and heap visualizer
                  for students learning Java.
                </p>
              </li>
              <li className="flex flex-col items-start gap-2.5">
                <StatusBadge status="in-progress" />
                <p className="font-semibold">WiCyS Kean chapter website</p>
                <p className="text-sm leading-relaxed text-ink-soft">
                  Building the chapter&rsquo;s official site: events,
                  announcements, and a resource hub.
                </p>
              </li>
            </ul>
          </div>
        </Reveal>
      </section>
    </>
  );
}
