import { categoryMeta, type Category } from "@/data/categories";

/**
 * Color-coded category label used on cards, detail pages, and the research
 * page. Deliberately just tracked, colored type: no pill, no outline, no dot.
 * The color alone carries the category, matching how the accent system is used
 * everywhere else on the site.
 */
export function CategoryTag({
  category,
  full = false,
}: {
  category: Category;
  /** use the full label ("Freelance & Client Work") instead of the short one */
  full?: boolean;
}) {
  const meta = categoryMeta[category];
  return (
    <span
      className={`text-[11px] font-semibold tracking-[0.14em] uppercase ${meta.text}`}
    >
      {full ? meta.label : meta.shortLabel}
    </span>
  );
}
