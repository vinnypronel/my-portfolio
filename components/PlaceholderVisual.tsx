import { categoryMeta, type Category } from "@/data/categories";

/**
 * Designed stand-in for project screenshots that don't exist yet.
 * Renders an abstract, category-tinted "site chrome" illustration so cards
 * never look broken or unfinished.
 *
 * PLACEHOLDER SYSTEM: to replace with a real screenshot, set the `image`
 * field on the project in data/projects.ts (e.g. "/projects/days-ice-cream.png")
 * and drop the file into /public/projects/. ProjectCard and the detail page
 * automatically render the real image instead of this component.
 */
export function PlaceholderVisual({
  category,
  label,
}: {
  category: Category;
  /** accessible description, e.g. "Day's Ice Cream, screenshot coming soon" */
  label: string;
}) {
  const meta = categoryMeta[category];

  return (
    <div
      role="img"
      aria-label={label}
      className={`relative flex h-full w-full items-center justify-center overflow-hidden ${meta.bgSoft} ${meta.text}`}
    >
      <svg
        aria-hidden
        viewBox="0 0 400 250"
        className="h-[86%] w-[86%] drop-shadow-sm"
        fill="none"
      >
        {/* Browser frame */}
        <rect x="8" y="8" width="384" height="234" rx="10" fill="var(--color-cream)" />
        <rect
          x="8.5"
          y="8.5"
          width="383"
          height="233"
          rx="9.5"
          stroke="currentColor"
          strokeOpacity="0.25"
        />
        {/* Top bar */}
        <line x1="8" y1="34" x2="392" y2="34" stroke="currentColor" strokeOpacity="0.18" />
        <circle cx="24" cy="21" r="3.5" fill="currentColor" fillOpacity="0.35" />
        <circle cx="36" cy="21" r="3.5" fill="currentColor" fillOpacity="0.22" />
        <circle cx="48" cy="21" r="3.5" fill="currentColor" fillOpacity="0.12" />
        <rect x="150" y="15" width="100" height="12" rx="6" fill="currentColor" fillOpacity="0.08" />

        {category === "research" ? (
          /* Chart layout: bars + scatter, a nod to the data viz work */
          <g>
            <rect x="32" y="54" width="120" height="14" rx="4" fill="currentColor" fillOpacity="0.5" />
            <rect x="32" y="78" width="180" height="8" rx="4" fill="currentColor" fillOpacity="0.15" />
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <rect
                key={i}
                x={40 + i * 30}
                y={210 - [46, 72, 58, 96, 84, 118][i]}
                width="18"
                height={[46, 72, 58, 96, 84, 118][i]}
                rx="3"
                fill="currentColor"
                fillOpacity={0.28 + i * 0.08}
              />
            ))}
            {[
              [252, 186], [268, 172], [286, 176], [298, 156], [312, 148],
              [326, 152], [338, 132], [352, 124], [364, 112], [342, 108],
            ].map(([cx, cy], i) => (
              <circle key={i} cx={cx} cy={cy} r="4" fill="currentColor" fillOpacity="0.55" />
            ))}
            <line x1="244" y1="196" x2="372" y2="104" stroke="currentColor" strokeOpacity="0.4" strokeWidth="2" strokeDasharray="5 4" />
            <line x1="240" y1="210" x2="376" y2="210" stroke="currentColor" strokeOpacity="0.3" />
          </g>
        ) : category === "freelance" ? (
          /* Marketing-site layout: hero, copy, CTA, cards */
          <g>
            <rect x="32" y="58" width="150" height="18" rx="4" fill="currentColor" fillOpacity="0.5" />
            <rect x="32" y="86" width="190" height="8" rx="4" fill="currentColor" fillOpacity="0.18" />
            <rect x="32" y="100" width="160" height="8" rx="4" fill="currentColor" fillOpacity="0.18" />
            <rect x="32" y="122" width="76" height="22" rx="11" fill="currentColor" fillOpacity="0.6" />
            <rect x="116" y="122" width="76" height="22" rx="11" fill="currentColor" fillOpacity="0.14" />
            <rect x="244" y="54" width="124" height="96" rx="8" fill="currentColor" fillOpacity="0.2" />
            <rect x="32" y="168" width="104" height="58" rx="8" fill="currentColor" fillOpacity="0.1" />
            <rect x="148" y="168" width="104" height="58" rx="8" fill="currentColor" fillOpacity="0.16" />
            <rect x="264" y="168" width="104" height="58" rx="8" fill="currentColor" fillOpacity="0.1" />
          </g>
        ) : (
          /* App-prototype layout: mobile screens side by side */
          <g>
            {[0, 1, 2].map((i) => (
              <g key={i}>
                <rect
                  x={52 + i * 108}
                  y="54"
                  width="84"
                  height="172"
                  rx="12"
                  fill="currentColor"
                  fillOpacity={i === 1 ? 0.2 : 0.1}
                />
                <rect x={64 + i * 108} y="70" width="48" height="10" rx="4" fill="currentColor" fillOpacity="0.45" />
                <rect x={64 + i * 108} y="90" width="60" height="6" rx="3" fill="currentColor" fillOpacity="0.2" />
                <rect x={64 + i * 108} y="102" width="52" height="6" rx="3" fill="currentColor" fillOpacity="0.2" />
                <rect x={64 + i * 108} y="122" width="60" height="40" rx="6" fill="currentColor" fillOpacity="0.28" />
                <rect x={64 + i * 108} y="172" width="60" height="18" rx="9" fill="currentColor" fillOpacity="0.5" />
              </g>
            ))}
          </g>
        )}
      </svg>
    </div>
  );
}
