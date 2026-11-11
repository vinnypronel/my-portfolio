import type { ResearchFindingData } from "@/data/research";

/**
 * Highlighted callout for key research stats.
 * Default: teal-accented card. Emphasis: full dark inversion with a giant
 * numeral, reserved for headline findings (r = 0.7872, the 100% fabrication rate).
 */
export function ResearchFinding({ finding }: { finding: ResearchFindingData }) {
  if (finding.emphasis) {
    return (
      <figure className="relative overflow-hidden rounded-2xl bg-ink p-8 text-cream sm:p-10">
        {/* Corner glow */}
        <div
          aria-hidden
          className="absolute -top-20 -right-20 size-56 rounded-full bg-research-bright/15 blur-3xl"
        />
        <p className="font-display text-5xl font-semibold tracking-tight text-research-bright sm:text-7xl">
          {finding.value}
        </p>
        <figcaption className="mt-4">
          <p className="text-xs font-semibold tracking-[0.22em] uppercase text-cream/60">
            {finding.label}
          </p>
          <p className="mt-3 max-w-[52ch] leading-relaxed text-cream/85">
            {finding.detail}
          </p>
        </figcaption>
      </figure>
    );
  }

  return (
    <figure className="flex h-full flex-col rounded-2xl border border-research/25 bg-research/8 p-6 sm:p-7">
      <p className="font-display text-3xl font-semibold tracking-tight text-research sm:text-4xl">
        {finding.value}
      </p>
      <figcaption className="mt-3">
        <p className="text-xs font-semibold tracking-[0.18em] uppercase text-research">
          {finding.label}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">
          {finding.detail}
        </p>
      </figcaption>
    </figure>
  );
}
