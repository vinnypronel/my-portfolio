"use client";

import { categoryMeta, categoryOrder, type Category } from "@/data/categories";

export type Filter = Category | "all";

/** Color-coded filter pills for the projects hub. */
export function CategoryFilterPills({
  value,
  onChange,
  counts,
}: {
  value: Filter;
  onChange: (next: Filter) => void;
  counts: Record<Filter, number>;
}) {
  const pills: { key: Filter; label: string }[] = [
    { key: "all", label: "All" },
    ...categoryOrder.map((c) => ({
      key: c as Filter,
      label: categoryMeta[c].label,
    })),
  ];

  const activeClasses: Record<Filter, string> = {
    all: "bg-ink text-cream border-ink",
    research: "bg-research text-cream border-research",
    freelance: "bg-freelance text-cream border-freelance",
    leadership: "bg-leadership text-cream border-leadership",
  };

  const idleHover: Record<Filter, string> = {
    all: "hover:border-ink/60 hover:text-ink",
    research: "hover:border-research/60 hover:text-research",
    freelance: "hover:border-freelance/60 hover:text-freelance",
    leadership: "hover:border-leadership/60 hover:text-leadership",
  };

  return (
    <div
      role="group"
      aria-label="Filter projects by category"
      className="flex flex-wrap gap-2"
    >
      {pills.map((pill) => {
        const active = value === pill.key;
        return (
          <button
            key={pill.key}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(pill.key)}
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-300 ${
              active
                ? activeClasses[pill.key]
                : `border-line bg-cream text-ink-soft ${idleHover[pill.key]}`
            }`}
          >
            {pill.label}
            <span
              className={`text-xs tabular-nums ${
                active ? "opacity-70" : "opacity-50"
              }`}
            >
              {counts[pill.key]}
            </span>
          </button>
        );
      })}
    </div>
  );
}
