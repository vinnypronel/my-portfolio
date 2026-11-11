"use client";

import Link from "next/link";
import { useState } from "react";
import { categoryMeta, categoryOrder, type Category } from "@/data/categories";
import { BackgroundVideo } from "./BackgroundVideo";
import { Reveal } from "./Reveal";

/**
 * The three homepage category cards. At rest they're paper-and-ink like the
 * rest of the site; on hover (or keyboard focus) the card inverts to a dark
 * panel with its category's silk clip flowing behind the text.
 *
 * Hover is tracked in state rather than with `group-hover` so the video only
 * decodes while a card is actually engaged.
 */
export function CategoryPreviewCards() {
  const [engaged, setEngaged] = useState<Category | null>(null);

  return (
    <div className="mt-12 grid gap-6 md:grid-cols-3">
      {categoryOrder.map((key, i) => {
        const meta = categoryMeta[key];
        const on = engaged === key;

        return (
          <Reveal key={key} delay={i * 0.1} className="h-full">
            <Link
              href={meta.href}
              onMouseEnter={() => setEngaged(key)}
              onMouseLeave={() => setEngaged((c) => (c === key ? null : c))}
              onFocus={() => setEngaged(key)}
              onBlur={() => setEngaged((c) => (c === key ? null : c))}
              className={`group relative isolate flex h-full flex-col overflow-hidden rounded-2xl border p-7 shadow-card transition-all duration-500 hover:shadow-lift motion-safe:hover:-translate-y-1.5 ${
                on ? "border-transparent" : `border-line bg-cream ${meta.borderHover}`
              }`}
            >
              {/* Silk clip + scrim, both fading in together so text contrast
                  never lags behind the video */}
              <div
                className={`absolute inset-0 -z-10 transition-opacity duration-500 ${
                  on ? "opacity-100" : "opacity-0"
                }`}
              >
                <BackgroundVideo
                  src={meta.video}
                  poster={meta.videoPoster}
                  mode="manual"
                  active={on}
                  className="absolute inset-0"
                  videoClassName="h-full w-full object-cover"
                />
                {/* 70% keeps even the brightest silk strand dark enough for
                    the accent "Explore" label to clear AA (~4.8:1) */}
                <div className="absolute inset-0 bg-ink/70" />
              </div>

              {/* Accent bar, kept from the static card */}
              <span
                aria-hidden
                className={`absolute inset-x-0 top-0 h-1 origin-left transition-transform duration-500 ${
                  meta.bg
                } ${on ? "scale-x-100" : "scale-x-0"}`}
              />

              <span aria-hidden className={`size-2.5 rounded-full ${meta.bg}`} />

              <h3
                className={`mt-5 font-display text-2xl font-semibold tracking-tight transition-colors duration-500 ${
                  on ? "text-cream" : "text-ink"
                }`}
              >
                {meta.label}
              </h3>

              <p
                className={`mt-3 flex-1 text-sm leading-relaxed transition-colors duration-500 ${
                  on ? "text-cream/90" : "text-ink-soft"
                }`}
              >
                {meta.blurb}
              </p>

              {/* Sits bottom-right. Hovering the label itself sweeps an
                  underline in from the left and nudges the arrow, a separate
                  micro-interaction from the card-wide inversion. */}
              <span
                className={`group/explore relative mt-6 inline-flex cursor-pointer items-center gap-1.5 self-end text-sm font-semibold transition-colors duration-500 ${
                  on ? meta.textBright : meta.text
                }`}
              >
                Explore
                <span
                  aria-hidden
                  className="transition-transform duration-300 motion-safe:group-hover/explore:translate-x-1"
                >
                  →
                </span>
                {/* Spans the whole label, arrow included, and sweeps in from
                    the left on hover. */}
                <span
                  aria-hidden
                  className="absolute -bottom-0.5 left-0 h-[1.5px] w-full origin-left scale-x-0 bg-current transition-transform duration-300 ease-out group-hover/explore:scale-x-100"
                />
              </span>
            </Link>
          </Reveal>
        );
      })}
    </div>
  );
}
