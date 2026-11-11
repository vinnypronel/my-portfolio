import Link from "next/link";
import type { Project } from "@/data/projects";
import { CategoryTag } from "./CategoryTag";
import { StatusBadge } from "./StatusBadge";
import { ProjectVisual } from "./ProjectVisual";

/**
 * Work-index card: visual in a dark frame, then title, one-liner, and a mono
 * stack line. Hover scales the visual and sweeps a cyan hairline.
 */
export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/projects/${project.slug}`} className="group flex h-full flex-col">
      <div className="relative aspect-[16/10] overflow-hidden rounded-[6px] border border-line bg-ink-800 transition-colors duration-500 group-hover:border-line-strong">
        <div className="absolute inset-0 transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:group-hover:scale-[1.04]">
          <ProjectVisual
            project={project}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
        <span
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 pt-5">
        <div className="flex flex-wrap items-center gap-4">
          <CategoryTag category={project.category} />
          {project.status && <StatusBadge status={project.status} />}
          {project.timeframe && (
            <span className="ml-auto font-mono text-[11px] tracking-[0.12em] text-fg-faint">
              {project.timeframe}
            </span>
          )}
        </div>
        <h3 className="text-2xl font-semibold tracking-tight text-fg transition-colors duration-300 group-hover:text-accent">
          {project.title}
        </h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-fg-soft">{project.oneLiner}</p>
        <p className="mt-auto pt-3 font-mono text-[11px] tracking-[0.08em] text-fg-faint">
          {project.stack.slice(0, 4).join("  /  ")}
        </p>
      </div>
    </Link>
  );
}
