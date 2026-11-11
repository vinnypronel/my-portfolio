/** Big number + label. Numbers only ever come from real project data. */
export function StatBlock({
  value,
  label,
  detail,
}: {
  value: string;
  label: string;
  detail?: string;
}) {
  return (
    <div className="flex flex-col gap-3 border-l border-line pl-6">
      <span className="display-lg font-semibold tracking-tight text-fg">{value}</span>
      <span className="font-mono text-[11px] tracking-[0.18em] text-fg-soft uppercase">
        {label}
      </span>
      {detail && <span className="max-w-[26ch] text-sm leading-snug text-fg-faint">{detail}</span>}
    </div>
  );
}
