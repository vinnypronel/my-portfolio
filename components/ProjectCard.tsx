import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/projects";
import { categoryMeta } from "@/data/categories";
import { CategoryTag } from "./CategoryTag";
import { StatusBadge } from "./StatusBadge";
import { TechChips } from "./TechChips";
import { PlaceholderVisual } from "./PlaceholderVisual";

/**
 * The sitewide project card: category accent bar bleeds in on hover,
 * card lifts, preview image zooms. All hover motion is CSS + motion-safe.
 */
export function ProjectCard({ project }: { project: Project }) {
  const meta = categoryMeta[project.category];

  return (
    <Link
      href={`/projects/${project.slug}`}
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-cream shadow-card transition-all duration-500 hover:shadow-lift motion-safe:hover:-translate-y-1.5 ${meta.borderHover}`}
    >
      {/* Accent bar that bleeds in from the left on hover */}
      <span
        aria-hidden
        className={`absolute inset-x-0 top-0 z-10 h-1 origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100 ${meta.bg}`}
      />

      <div className="relative aspect-[16/10] overflow-hidden border-b border-line">
        <div className="h-full w-full transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.04]">
          {project.image ? (
            <Image
              src={project.image}
              alt={project.imageAlt ?? `${project.title} preview`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover"
            />
          ) : (
            <PlaceholderVisual
              category={project.category}
              label={project.imageAlt ?? `${project.title}, preview coming soon`}
            />
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex flex-wrap items-center gap-2">
          <CategoryTag category={project.category} />
          {project.status && <StatusBadge status={project.status} />}
        </div>

        <h3 className="font-display text-xl font-semibold tracking-tight">
          <span className="bg-gradient-to-r from-current to-current bg-[length:0%_2px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 group-hover:bg-[length:100%_2px]">
            {project.title}
          </span>
        </h3>

        <p className="line-clamp-2 text-sm leading-relaxed text-ink-soft">
          {project.oneLiner}
        </p>

        <div className="mt-auto flex flex-col gap-4 pt-2">
          <TechChips stack={project.stack.slice(0, 4)} />
          <span
            className={`inline-flex items-center gap-1.5 text-sm font-semibold ${meta.text}`}
          >
            View project
            <span
              aria-hidden
              className="transition-transform duration-300 motion-safe:group-hover:translate-x-1"
            >
              →
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
}
