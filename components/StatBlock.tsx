/** Big number + label. Used on the homepage stat strip and the research page. */
export function StatBlock({
  value,
  label,
  accentClass = "text-accent",
}: {
  value: string;
  label: string;
  accentClass?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <span
        className={`font-display text-5xl font-semibold tracking-tight sm:text-6xl ${accentClass}`}
      >
        {value}
      </span>
      <span className="max-w-[22ch] text-sm leading-snug text-ink-soft">
        {label}
      </span>
    </div>
  );
}
