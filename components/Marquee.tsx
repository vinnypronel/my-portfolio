/**
 * Infinite horizontal text band. The list is rendered twice and the track
 * translates by half its width, so the loop is seamless at any item count.
 * Pauses on hover; the CSS animation is disabled under reduced motion.
 */
export function Marquee({
  items,
  label,
  className = "",
}: {
  items: readonly string[];
  label?: string;
  className?: string;
}) {
  const doubled = [...items, ...items];
  return (
    <div className={`marquee relative overflow-hidden ${className}`} aria-label={label}>
      <div className="marquee-track gap-14 pr-14">
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            aria-hidden={i >= items.length}
            className="flex items-center gap-14 font-mono text-[13px] tracking-[0.14em] whitespace-nowrap text-fg-faint uppercase"
          >
            {item}
            <span aria-hidden className="size-1 rounded-full bg-accent/70" />
          </span>
        ))}
      </div>
    </div>
  );
}
