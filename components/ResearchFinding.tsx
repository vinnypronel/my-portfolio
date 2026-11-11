import type { ResearchFindingData } from "@/data/research";

/**
 * Highlighted callout for key research stats.
 * Default: bordered panel. Emphasis: giant numeral on a faint cyan field,
 * reserved for headline findings (r = 0.7872, the 100% fabrication rate).
 */
export function ResearchFinding({ finding }: { finding: ResearchFindingData }) {
  if (finding.emphasis) {
    return (
      <figure className="relative overflow-hidden rounded-[6px] border border-line bg-ink-900 p-8 sm:p-10">
        <div
          aria-hidden
          className="absolute -top-24 -right-24 size-72 rounded-full bg-accent/10 blur-3xl"
        />
        <p className="display-xl relative font-semibold text-fg">{finding.value}</p>
        <figcaption className="relative mt-6">
          <p className="eyebrow">{finding.label}</p>
          <p className="mt-3 max-w-[52ch] leading-relaxed text-fg-soft">{finding.detail}</p>
        </figcaption>
      </figure>
    );
  }

  return (
    <figure className="flex h-full flex-col rounded-[6px] border border-line p-6 sm:p-7">
      <p className="display-md font-semibold text-fg">{finding.value}</p>
      <figcaption className="mt-3">
        <p className="eyebrow">{finding.label}</p>
        <p className="mt-2 text-sm leading-relaxed text-fg-soft">{finding.detail}</p>
      </figcaption>
    </figure>
  );
}
