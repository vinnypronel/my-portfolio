"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export interface ScrubStep {
  index: string;
  title: string;
  body: string;
}

/**
 * Scroll-bound video. The section pins for `steps.length` viewports while
 * the clip's currentTime follows scroll progress, and each step's copy fades
 * through in turn. The clip is encoded all-intra (every frame a keyframe) so
 * seeking is instant; see scripts/process-videos.ps1.
 *
 *  - the clip only starts downloading when the section is within one
 *    viewport of the top of the screen
 *  - under prefers-reduced-motion the section is not pinned: the poster shows
 *    and the steps stack as plain copy
 */
export function ScrubVideo({
  src,
  poster,
  eyebrow,
  steps,
}: {
  src: string;
  poster: string;
  eyebrow: string;
  steps: ScrubStep[];
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reduce, setReduce] = useState(false);
  const [canLoad, setCanLoad] = useState(false);

  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // Lazy source: attach once the section is one viewport away.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || reduce) return;
    const check = () => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 2) {
        setCanLoad(true);
        window.removeEventListener("scroll", check);
      }
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, [reduce]);

  // Pin + scrub once metadata is in.
  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video || reduce || !canLoad) return;

    let ctx: gsap.Context | undefined;

    const build = () => {
      ctx = gsap.context(() => {
        const stepEls = gsap.utils.toArray<HTMLElement>("[data-step]", section);
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: `+=${steps.length * 100}%`,
            scrub: 0.6,
            pin: true,
            anticipatePin: 1,
          },
        });

        tl.to(video, { currentTime: video.duration || 10 }, 0);

        // Each step occupies an equal slice of the pinned range.
        const slice = 1 / steps.length;
        stepEls.forEach((el, i) => {
          const start = i * slice;
          if (i > 0) {
            tl.fromTo(el, { autoAlpha: 0, y: 32 }, { autoAlpha: 1, y: 0, duration: slice * 0.25 }, start);
          }
          if (i < stepEls.length - 1) {
            tl.to(el, { autoAlpha: 0, y: -24, duration: slice * 0.25 }, start + slice * 0.75);
          }
        });
      }, section);
    };

    if (video.readyState >= 1) build();
    else video.addEventListener("loadedmetadata", build, { once: true });

    return () => {
      video.removeEventListener("loadedmetadata", build);
      ctx?.revert();
    };
  }, [reduce, canLoad, steps.length]);

  if (reduce) {
    return (
      <section ref={sectionRef} className="relative isolate overflow-hidden bg-ink-900">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-cover bg-center opacity-50"
          style={{ backgroundImage: `url(${poster})` }}
        />
        <div className="container-site py-24 sm:py-32">
          <p className="eyebrow">{eyebrow}</p>
          <ol className="mt-10 grid gap-12 md:grid-cols-3">
            {steps.map((s) => (
              <li key={s.index}>
                <p className="font-mono text-sm text-accent">{s.index}</p>
                <h3 className="display-md mt-3 font-semibold">{s.title}</h3>
                <p className="prose-measure mt-4">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="relative isolate h-screen min-h-[640px] overflow-hidden bg-void">
      <video
        ref={videoRef}
        aria-hidden
        muted
        playsInline
        preload={canLoad ? "auto" : "none"}
        poster={poster}
        src={canLoad ? src : undefined}
        tabIndex={-1}
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-void via-void/70 to-void/20" />
      <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-32 bg-gradient-to-b from-void to-transparent" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-void to-transparent" />

      <div className="container-site relative flex h-full flex-col justify-center">
        <p className="eyebrow">{eyebrow}</p>
        <div className="relative mt-8 min-h-[18rem]">
          {steps.map((s, i) => (
            <div
              key={s.index}
              data-step
              className="absolute inset-x-0 top-0 max-w-3xl"
              style={i > 0 ? { opacity: 0, visibility: "hidden" } : undefined}
            >
              <p className="font-mono text-sm text-accent">{s.index}</p>
              <h3 className="display-lg mt-4 font-semibold">{s.title}</h3>
              <p className="prose-measure mt-6">{s.body}</p>
            </div>
          ))}
        </div>

        {/* Progress rail */}
        <ol aria-hidden className="absolute right-5 bottom-10 flex gap-6 font-mono text-xs text-fg-faint sm:right-8 lg:right-12">
          {steps.map((s) => (
            <li key={s.index}>{s.index}</li>
          ))}
        </ol>
      </div>
    </section>
  );
}
