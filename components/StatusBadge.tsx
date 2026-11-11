import type { ProjectStatus } from "@/data/projects";

/**
 * Status label for active or upcoming work.
 *
 * Plain tracked type, no pill, no outline, no pulsing dot: the color and the
 * wording do the work. "in-progress" takes the signature accent, "planned"
 * stays muted so upcoming work reads as quieter than live work.
 */
export function StatusBadge({
  status,
  label,
  onDark = false,
}: {
  status: ProjectStatus;
  /** optional label override, e.g. "Ongoing development" */
  label?: string;
  onDark?: boolean;
}) {
  const text =
    label ?? (status === "in-progress" ? "In Progress" : "Planned · Starting Soon");

  const color =
    status === "in-progress"
      ? onDark
        ? "text-accent-bright"
        : "text-accent-deep"
      : onDark
        ? "text-cream/70"
        : "text-ink-faint";

  return (
    <span
      className={`text-[11px] font-semibold tracking-[0.14em] uppercase ${color}`}
    >
      {text}
    </span>
  );
}
