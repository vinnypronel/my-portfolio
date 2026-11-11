"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/**
 * Decorative looping background video.
 *
 * Behaviour that keeps it cheap and accessible:
 *  - nothing downloads until the element is near the viewport (preload="none"
 *    plus an IntersectionObserver that sets `src` on first approach)
 *  - playback pauses whenever it scrolls out of view
 *  - `mode="manual"` defers play/pause to the `active` prop (used for hover cards)
 *  - under prefers-reduced-motion no video loads at all; the poster still renders
 *  - always aria-hidden: these carry no information
 *
 * Source clips live in /public/video (processed from the Gemini originals in
 * "Video Backgrounds/": cropped to strip the sparkle watermark, then
 * crossfaded into a seamless 9s loop).
 */
export function BackgroundVideo({
  src,
  poster,
  className = "",
  videoClassName = "h-full w-full object-cover",
  mode = "in-view",
  active = false,
  parallax = 0,
}: {
  src: string;
  poster: string;
  /** wrapper classes (position it yourself, e.g. "absolute inset-0") */
  className?: string;
  /** classes on the video/still itself */
  videoClassName?: string;
  mode?: "in-view" | "manual";
  /** only used when mode="manual" */
  active?: boolean;
  /** percent of vertical drift across the scroll range; 0 disables */
  parallax?: number;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(false);
  const [canLoad, setCanLoad] = useState(false);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`${-parallax}%`, `${parallax}%`]
  );

  useEffect(() => {
    const el = wrapRef.current;
    if (!el || reduce) return;

    // Deliberately a rect check rather than IntersectionObserver: it resolves
    // synchronously on mount (so a clip already on screen at load starts
    // without waiting for an async callback) and behaves identically in
    // embedded/offscreen renderers where IO never reports.
    const MARGIN = 200;

    const check = () => {
      const r = el.getBoundingClientRect();
      const visible =
        r.bottom > -MARGIN &&
        r.top < window.innerHeight + MARGIN &&
        r.right > 0 &&
        r.left < window.innerWidth;

      // Functional updates so an unchanged value bails out of re-rendering.
      setInView((prev) => (prev === visible ? prev : visible));
      if (visible) setCanLoad((prev) => prev || true);
    };

    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, [reduce]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !canLoad) return;

    if (inView && (mode === "in-view" || active)) {
      // Autoplay can still be refused (e.g. battery saver); failing is fine,
      // the poster stays visible underneath.
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [inView, active, mode, canLoad]);

  return (
    <div ref={wrapRef} aria-hidden className={`overflow-hidden ${className}`}>
      {reduce ? (
        <div
          className={`${videoClassName} bg-cover bg-center`}
          style={{ backgroundImage: `url(${poster})` }}
        />
      ) : (
        <motion.video
          ref={videoRef}
          src={canLoad ? src : undefined}
          poster={poster}
          muted
          loop
          playsInline
          preload="none"
          tabIndex={-1}
          className={videoClassName}
          style={parallax ? { y } : undefined}
        />
      )}
    </div>
  );
}
