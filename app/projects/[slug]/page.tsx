import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, getProject, getAdjacentProjects } from "@/data/projects";
import { categoryMeta } from "@/data/categories";
import { CategoryTag } from "@/components/CategoryTag";
import { StatusBadge } from "@/components/StatusBadge";
import { TechChips } from "@/components/TechChips";
import { PlaceholderVisual } from "@/components/PlaceholderVisual";
import { Reveal } from "@/components/Reveal";

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
    openGraph: {
      title: `${project.title} · Vinny`,
      description: project.oneLiner,
    },
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

  const meta = categoryMeta[project.category];
  const { prev, next } = getAdjacentProjects(slug);

  const metaRows = [
    { label: "Role", value: project.role },
    { label: "Team", value: project.team },
    { label: "Client", value: project.client },
    { label: "Timeframe", value: project.timeframe },
  ].filter((row): row is { label: string; value: string } => Boolean(row.value));

  return (
    <article className="container-site pt-14 pb-8 sm:pt-20">
      {/* Back link */}
      <Reveal>
        <Link
          href="/projects"
          className="group inline-flex items-center gap-1.5 text-sm font-semibold text-ink-soft hover:text-ink"
        >
          <span aria-hidden className="transition-transform duration-300 motion-safe:group-hover:-translate-x-1">
            ←
          </span>
          All work
        </Link>
      </Reveal>

      {/* Header */}
      <header className="mt-8 max-w-3xl">
        <Reveal>
          <div className="flex flex-wrap items-center gap-2.5">
            <CategoryTag category={project.category} full />
            {project.status && <StatusBadge status={project.status} />}
          </div>
          <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight sm:text-6xl">
            {project.title}
          </h1>
          <p className="prose-measure mt-5">{project.oneLiner}</p>
        </Reveal>
      </header>

      {/* Hero visual */}
      <Reveal className="mt-12">
        <div className={`relative aspect-[16/9] overflow-hidden rounded-2xl border ${meta.border}`}>
          {project.image ? (
            /* Real screenshot, set via the `image` field in data/projects.ts */
            <Image
              src={project.image}
              alt={project.imageAlt ?? `${project.title} screenshot`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
            />
          ) : (
            /* PLACEHOLDER: drop a screenshot in /public/projects/ and set
               `image: "/projects/<slug>.png"` on this project in data/projects.ts */
            <PlaceholderVisual
              category={project.category}
              label={project.imageAlt ?? `${project.title}, screenshot coming soon`}
            />
          )}
        </div>
      </Reveal>

      <div className="mt-14 grid gap-14 lg:grid-cols-12">
        {/* Meta sidebar */}
        <aside className="lg:col-span-4">
          <Reveal>
            <dl className="flex flex-col gap-6 rounded-2xl border hairline bg-paper-deep/50 p-7">
              {metaRows.map((row) => (
                <div key={row.label}>
                  <dt className="eyebrow !text-[10px]">{row.label}</dt>
                  <dd className="mt-1.5 text-sm leading-relaxed font-medium">
                    {row.value}
                  </dd>
                </div>
              ))}
              <div>
                <dt className="eyebrow !text-[10px]">Stack</dt>
                <dd className="mt-2.5">
                  <TechChips stack={project.stack} />
                </dd>
              </div>
              {project.links.length > 0 && (
                <div>
                  <dt className="eyebrow !text-[10px]">Links</dt>
                  <dd className="mt-2.5 flex flex-col gap-2">
                    {project.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-sm font-semibold ${meta.text} hover:underline`}
                      >
                        {link.label} ↗
                      </a>
                    ))}
                  </dd>
                </div>
              )}
            </dl>
          </Reveal>
        </aside>

        {/* Body */}
        <div className="flex flex-col gap-12 lg:col-span-8">
          <Reveal>
            <section>
              <h2 className="font-display text-2xl font-semibold tracking-tight">
                The problem
              </h2>
              <p className="prose-measure mt-4">{project.problem}</p>
            </section>
          </Reveal>

          <Reveal>
            <section>
              <h2 className="font-display text-2xl font-semibold tracking-tight">
                What was built
              </h2>
              <ul className="mt-5 flex flex-col gap-3.5">
                {project.built.map((item) => (
                  <li key={item} className="flex gap-3 text-[1.0625rem] leading-relaxed text-ink-soft">
                    <span aria-hidden className={`mt-2.5 size-1.5 shrink-0 rounded-full ${meta.bg}`} />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>

          <Reveal>
            <section>
              <h2 className="font-display text-2xl font-semibold tracking-tight">
                Outcome
              </h2>
              <ul className="mt-5 flex flex-col gap-3.5">
                {project.outcome.map((item) => (
                  <li key={item} className="flex gap-3 text-[1.0625rem] leading-relaxed">
                    <span aria-hidden className={`mt-2.5 size-1.5 shrink-0 rounded-full ${meta.bg}`} />
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>

          {project.researchAnchor && (
            <Reveal>
              <Link
                href={project.researchAnchor}
                className={`group flex items-center justify-between gap-4 rounded-2xl border p-6 transition-all duration-300 ${meta.border} ${meta.bgSoft} hover:shadow-lift motion-safe:hover:-translate-y-1`}
              >
                <div>
                  <p className={`text-sm font-semibold ${meta.text}`}>
                    Full research narrative
                  </p>
                  <p className="mt-1 text-sm text-ink-soft">
                    Methodology, findings, and presentation history on the
                    Research page.
                  </p>
                </div>
                <span aria-hidden className={`text-xl ${meta.text} transition-transform duration-300 motion-safe:group-hover:translate-x-1`}>
                  →
                </span>
              </Link>
            </Reveal>
          )}
        </div>
      </div>

      {/* Prev / next */}
      <nav aria-label="More projects" className="mt-20 grid gap-4 border-t hairline pt-8 sm:grid-cols-2">
        {prev && (
          <Link
            href={`/projects/${prev.slug}`}
            className="group rounded-2xl border border-line bg-cream p-6 transition-all duration-300 hover:shadow-lift motion-safe:hover:-translate-y-1"
          >
            <p className="eyebrow !text-[10px]">← Previous</p>
            <p className="mt-2 font-display text-lg font-semibold">{prev.title}</p>
          </Link>
        )}
        {next && (
          <Link
            href={`/projects/${next.slug}`}
            className="group rounded-2xl border border-line bg-cream p-6 text-right transition-all duration-300 hover:shadow-lift motion-safe:hover:-translate-y-1 sm:col-start-2"
          >
            <p className="eyebrow !text-[10px]">Next →</p>
            <p className="mt-2 font-display text-lg font-semibold">{next.title}</p>
          </Link>
        )}
      </nav>
    </article>
  );
}
