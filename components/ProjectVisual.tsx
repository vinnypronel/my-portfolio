import Image from "next/image";
import type { Project } from "@/data/projects";

/**
 * Project artwork. Renders the real screenshot when `image` is set on the
 * project in data/projects.ts, otherwise a quiet dark frame with a mono
 * label, so a missing asset never reads as a broken card.
 *
 * PLACEHOLDER: drop a screenshot in /public/projects/ and set
 * image: "/projects/<slug>.jpg" on the project to replace the frame.
 */
export function ProjectVisual({
  project,
  sizes,
  priority = false,
  className = "",
}: {
  project: Project;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  if (project.image) {
    return (
      <Image
        src={project.image}
        alt={project.imageAlt ?? `${project.title} screenshot`}
        fill
        priority={priority}
        sizes={sizes}
        className={`object-cover object-top ${className}`}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={project.imageAlt ?? `${project.title}, screenshot pending`}
      className={`relative flex h-full w-full items-end bg-ink-800 p-6 ${className}`}
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgb(0_229_255_/_0.10),transparent_55%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(rgb(255_255_255_/_0.04)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255_/_0.04)_1px,transparent_1px)] bg-[size:48px_48px]"
      />
      <p className="relative font-mono text-[11px] tracking-[0.18em] text-fg-faint uppercase">
        {project.title} / visual pending
      </p>
    </div>
  );
}
