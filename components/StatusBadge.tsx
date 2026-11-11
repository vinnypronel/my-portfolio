import type { ProjectStatus } from "@/data/projects";

/**
 * Status label for active or upcoming work. Plain tracked mono type with a
 * small live dot for in-progress work; planned work stays muted.
 */
export function StatusBadge({
  status,
  label,
}: {
  status: ProjectStatus;
  /** optional label override, e.g. "Ongoing development" */
  label?: string;
}) {
  const text = label ?? (status === "in-progress" ? "In progress" : "Planned");
  const live = status === "in-progress";

  return (
    <span
      className={`inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] uppercase ${
        live ? "text-accent" : "text-fg-faint"
      }`}
    >
      {live && <span aria-hidden className="size-1.5 rounded-full bg-accent" />}
      {text}
    </span>
  );
}
