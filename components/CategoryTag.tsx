import { categoryMeta, type Category } from "@/data/categories";

/**
 * Category label used on cards, detail pages, and the research page.
 * Tracked mono caps, no pill, no outline, no color: the label alone carries it.
 */
export function CategoryTag({
  category,
  full = false,
}: {
  category: Category;
  /** use the full label ("Hackathons & Leadership") instead of the short one */
  full?: boolean;
}) {
  const meta = categoryMeta[category];
  return (
    <span className="font-mono text-[11px] tracking-[0.18em] text-fg-soft uppercase">
      {full ? meta.label : meta.shortLabel}
    </span>
  );
}
