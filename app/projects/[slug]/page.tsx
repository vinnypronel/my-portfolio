import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, getProject, getAdjacentProjects } from "@/data/projects";
import { CategoryTag } from "@/components/CategoryTag";
import { StatusBadge } from "@/components/StatusBadge";
import { ProjectVisual } from "@/components/ProjectVisual";
import { Reveal, RevealLines } from "@/components/Reveal";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.oneLiner,
    openGraph: { title: `${project.title} · pronelweb`, description: project.oneLiner },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const { next } = getAdjacentProjects(slug);

  const metaRows = [
    { label: "Client", value: project.client },
    { label: "Role", value: project.role },
    { label: "Team", value: project.team },
    { label: "Timeframe", value: project.timeframe },
  ].filter((row): row is { label: string; value: string } => Boolean(row.value));

  return (
    <article>
      {/* Header */}
      <header className="container-site pt-36 sm:pt-44">
        <Reveal immediate>
          <Link
            href="/projects"
            className="link-sweep font-mono text-[12px] tracking-[0.12em] text-fg-faint uppercase hover:text-fg"
          >
            All work
          </Link>
          <div className="mt-10 flex flex-wrap items-center gap-5">
            <CategoryTag category={project.category} full />
            {project.status && <StatusBadge status={project.status} />}
          </div>
        </Reveal>
        <RevealLines
          immediate
          delay={0.1}
          as="h1"
          className="display-xl mt-6 max-w-[14ch] font-semibold text-fg"
          lines={[project.title]}
        />
        <Reveal immediate delay={0.35}>
          <p className="prose-measure mt-8 text-xl">{project.oneLiner}</p>
        </Reveal>
      </header>

      {/* Hero visual, full width of the container, wider than the copy */}
      <Reveal immediate delay={0.45} className="container-site mt-14">
        <div
          className="relative aspect-[16/10] overflow-hidden rounded-[6px] border border-line bg-ink-800 sm:aspect-[21/10]"
          style={project.videoAspect ? { aspectRatio: project.videoAspect } : undefined}
        >
          <ProjectVisual project={project} variant="hero" priority sizes="(max-width: 1440px) 100vw, 1440px" />
        </div>
      </Reveal>

      <div className="container-site mt-20 grid gap-16 lg:grid-cols-12">
        {/* Meta sidebar */}
        <aside className="lg:col-span-4">
          <Reveal>
            <dl className="flex flex-col gap-6 border-t border-line pt-6 lg:sticky lg:top-28">
              {metaRows.map((row) => (
                <div key={row.label}>
                  <dt className="eyebrow">{row.label}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-fg">{row.value}</dd>
                </div>
              ))}
              <div>
                <dt className="eyebrow">Stack</dt>
                <dd className="mt-2 font-mono text-xs leading-loose tracking-[0.06em] text-fg-soft">
                  {project.stack.join("  /  ")}
                </dd>
              </div>
              {project.links.length > 0 && (
                <div>
                  <dt className="eyebrow">Links</dt>
                  <dd className="mt-2 flex flex-col gap-2">
                    {project.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-sweep w-fit text-sm text-fg hover:text-accent"
                      >
                        {link.label} &#8599;
                      </a>
                    ))}
                  </dd>
                </div>
              )}
            </dl>
          </Reveal>
        </aside>

        {/* Body */}
        <div className="flex flex-col gap-16 lg:col-span-7 lg:col-start-6">
          <Reveal>
            <section>
              <p className="eyebrow">The problem</p>
              <p className="display-md mt-5 font-medium text-fg">{project.problem}</p>
            </section>
          </Reveal>

          <Reveal>
            <section>
              <p className="eyebrow">What was built</p>
              <ul className="mt-6 flex flex-col divide-y divide-line border-y border-line">
                {project.built.map((item, i) => (
                  <li key={item} className="flex gap-6 py-4 text-[1.0625rem] leading-relaxed text-fg-soft">
                    <span className="shrink-0 font-mono text-xs text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>

          <Reveal>
            <section>
              <p className="eyebrow">Outcome</p>
              <ul className="mt-6 flex flex-col gap-4">
                {project.outcome.map((item) => (
                  <li key={item} className="flex gap-4 text-[1.0625rem] leading-relaxed text-fg">
                    <span aria-hidden className="mt-3 h-px w-5 shrink-0 bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>

          {project.researchAnchor && (
            <Reveal>
              <Link
                href={project.researchAnchor}
                className="group flex items-center justify-between gap-4 rounded-[6px] border border-line p-6 transition-colors duration-300 hover:border-accent"
              >
                <div>
                  <p className="font-mono text-[12px] tracking-[0.12em] text-fg uppercase">
                    Full research narrative
                  </p>
                  <p className="mt-1.5 text-sm text-fg-soft">
                    Methodology, findings, and presentation history on the Research page.
                  </p>
                </div>
                <span aria-hidden className="font-mono text-xl text-fg-faint transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent">
                  &#8594;
                </span>
              </Link>
            </Reveal>
          )}
        </div>
      </div>

      {/* Next project */}
      {next && (
        <Reveal className="container-site mt-32">
          <Link href={`/projects/${next.slug}`} className="group block border-t border-line pt-8">
            <p className="eyebrow">Next project</p>
            <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
              <h2 className="display-xl font-semibold text-fg transition-colors duration-300 group-hover:text-accent">
                {next.title}
              </h2>
              <span
                aria-hidden
                className="font-mono text-4xl text-fg-faint transition-all duration-500 group-hover:translate-x-2 group-hover:text-accent"
              >
                &#8594;
              </span>
            </div>
          </Link>
        </Reveal>
      )}
    </article>
  );
}
