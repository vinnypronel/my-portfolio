import Image from "next/image";
import type { Project } from "@/data/projects";
import { AmbientVideo } from "./video/AmbientVideo";

/**
 * Project artwork, in priority order:
 *  1. `video` set on the project: a silent walkthrough that loops while in
 *     view (cards get the 800px encode, heroes the 1280px one), poster first
 *  2. `image` set: the real screenshot
 *  3. neither: a quiet dark frame with a mono label, so a missing asset never
 *     reads as a broken card
 *
 * PLACEHOLDER: drop a screenshot in /public/projects/ and set
 * image: "/projects/<slug>.jpg" on the project to replace the frame.
 */
export function ProjectVisual({
  project,
  sizes,
  variant = "card",
  priority = false,
  className = "",
}: {
  project: Project;
  sizes: string;
  /** card: small encode, lazy; hero: full encode, buffers early */
  variant?: "card" | "hero";
  priority?: boolean;
  className?: string;
}) {
  if (project.video && project.videoPoster) {
    const src = variant === "card" && project.videoSmall ? project.videoSmall : project.video;
    return (
      <AmbientVideo
        src={src}
        poster={project.videoPoster}
        eager={variant === "hero"}
        className={`absolute inset-0 ${variant === "card" ? "bg-ink-900" : ""} ${className}`}
        videoClassName={`h-full w-full ${variant === "card" ? "object-contain" : "object-cover object-top"}`}
      />
    );
  }

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
