import Link from "next/link";

/** Eyebrow + display heading, with an optional "view all" style link. */
export function SectionHeading({
  eyebrow,
  title,
  link,
}: {
  eyebrow: string;
  title: string;
  link?: { label: string; href: string };
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          {title}
        </h2>
      </div>
      {link && (
        <Link
          href={link.href}
          className="group mb-1 inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-accent-deep"
        >
          {link.label}
          <span
            aria-hidden
            className="transition-transform duration-300 motion-safe:group-hover:translate-x-1"
          >
            →
          </span>
        </Link>
      )}
    </div>
  );
}
