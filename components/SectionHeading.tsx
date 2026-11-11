import Link from "next/link";
import { RevealLines } from "./Reveal";

/** Eyebrow + display heading, with an optional "view all" style link. */
export function SectionHeading({
  eyebrow,
  id,
  title,
  lines,
  link,
}: {
  eyebrow: string;
  /** id for the h2, so a parent section can point aria-labelledby at it */
  id?: string;
  /** single-line title; or pass `lines` for a deliberate multi-line reveal */
  title?: string;
  lines?: string[];
  link?: { label: string; href: string };
}) {
  const content = lines ?? (title ? [title] : []);
  return (
    <div className="flex flex-wrap items-end justify-between gap-6 border-t border-line pt-6">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <RevealLines
          as="h2"
          id={id}
          lines={content}
          className="display-lg mt-5 font-semibold text-fg"
        />
      </div>
      {link && (
        <Link
          href={link.href}
          className="link-sweep mb-2 font-mono text-[13px] tracking-[0.08em] text-fg-soft uppercase transition-colors hover:text-fg"
        >
          {link.label}
        </Link>
      )}
    </div>
  );
}
