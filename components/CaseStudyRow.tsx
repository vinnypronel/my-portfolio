import Link from "next/link";
import type { Project } from "@/data/projects";
import { categoryMeta } from "@/data/categories";
import { ProjectVisual } from "./ProjectVisual";

/**
 * Large alternating case-study row for the home page: oversized visual on
 * one side, title and one-liner on the other. The whole row is the link.
 */
export function CaseStudyRow({
  project,
  index,
  flip = false,
}: {
  project: Project;
  index: number;
  flip?: boolean;
}) {
  const meta = categoryMeta[project.category];

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group grid items-center gap-8 lg:grid-cols-12 lg:gap-12"
    >
      <div
        className={`relative aspect-[16/10] overflow-hidden rounded-[6px] border border-line bg-ink-800 lg:col-span-7 ${
          flip ? "lg:order-2" : ""
        }`}
        style={project.videoAspect ? { aspectRatio: project.videoAspect } : undefined}
      >
        <div className="absolute inset-0 transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:group-hover:scale-[1.04]">
          <ProjectVisual project={project} variant="hero" sizes="(max-width: 1024px) 100vw, 58vw" />
        </div>
        {/* Cyan hairline sweeps across the bottom edge on hover */}
        <span
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
        />
      </div>

      <div className={`lg:col-span-5 ${flip ? "lg:order-1 lg:pr-6" : "lg:pl-6"}`}>
        <div className="flex items-center gap-4 font-mono text-[11px] tracking-[0.18em] text-fg-faint uppercase">
          <span className="text-accent">{String(index + 1).padStart(2, "0")}</span>
          <span>{meta.shortLabel}</span>
          {project.timeframe && (
            <>
              <span aria-hidden className="h-px w-6 bg-line-strong" />
              <span>{project.timeframe}</span>
            </>
          )}
        </div>
        <h3 className="display-md mt-5 font-semibold text-fg transition-colors duration-300 group-hover:text-accent">
          {project.title}
        </h3>
        <p className="prose-measure mt-4">{project.oneLiner}</p>
        <p className="mt-6 font-mono text-xs tracking-[0.08em] text-fg-faint">
          {project.stack.slice(0, 4).join("  /  ")}
        </p>
        <span className="link-sweep mt-8 inline-block font-mono text-[13px] tracking-[0.08em] text-fg uppercase">
          View case study
        </span>
      </div>
    </Link>
  );
}
