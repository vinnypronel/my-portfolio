"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { tracks } from "@/data/tracks";
import { AmbientVideo } from "@/components/video/AmbientVideo";
import { Reveal } from "@/components/Reveal";

/**
 * The three service tracks. Each panel sits on its graded silk clip: dimmed
 * at rest, full on hover (pointer devices) or whenever it is in view (touch).
 */
export function Tracks() {
  const [engaged, setEngaged] = useState<string | null>(null);
  const [canHover, setCanHover] = useState(true);

  useEffect(() => {
    setCanHover(window.matchMedia("(hover: hover)").matches);
  }, []);

  return (
    <div className="mt-14 grid gap-4 lg:grid-cols-3">
      {tracks.map((track, i) => {
        const on = engaged === track.index;
        return (
          <Reveal key={track.index} delay={i * 0.1} className="h-full">
            <Link
              href={track.href}
              onMouseEnter={() => setEngaged(track.index)}
              onMouseLeave={() => setEngaged((c) => (c === track.index ? null : c))}
              onFocus={() => setEngaged(track.index)}
              onBlur={() => setEngaged((c) => (c === track.index ? null : c))}
              className="group relative isolate flex h-full min-h-[26rem] flex-col justify-between overflow-hidden rounded-[6px] border border-line bg-ink-900 p-7 transition-colors duration-500 hover:border-line-strong lg:min-h-[34rem]"
            >
              <div
                className={`absolute inset-0 -z-10 transition-opacity duration-700 ${
                  canHover ? (on ? "opacity-100" : "opacity-50") : "opacity-80"
                }`}
              >
                <AmbientVideo
                  src={track.video}
                  poster={track.poster}
                  mode={canHover ? "manual" : "in-view"}
                  active={on}
                  className="absolute inset-0"
                  videoClassName="h-full w-full object-cover scale-105 transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-void via-void/55 to-void/20" />
              </div>

              <div className="flex items-start justify-between">
                <span className="font-mono text-sm text-accent">{track.index}</span>
                <span
                  aria-hidden
                  className="font-mono text-xl text-fg-faint transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent"
                >
                  &#8599;
                </span>
              </div>

              <div>
                <h3 className="display-md font-semibold text-fg">{track.title}</h3>
                <p className="mt-4 max-w-[36ch] text-[15px] leading-relaxed text-fg-soft">
                  {track.blurb}
                </p>
                <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-1.5 font-mono text-[11px] tracking-[0.14em] text-fg-faint uppercase">
                  {track.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            </Link>
          </Reveal>
        );
      })}
    </div>
  );
}
