"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/**
 * Decorative looping background video for below-the-fold sections.
 *
 *  - nothing downloads until the element is near the viewport (preload="none"
 *    plus a rect check that sets `src` on first approach)
 *  - playback pauses whenever it scrolls out of view
 *  - `mode="manual"` defers play/pause to the `active` prop (hover cards)
 *  - under prefers-reduced-motion no video loads at all; the poster renders
 *  - always aria-hidden: these carry no information
 */
export function AmbientVideo({
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
  const y = useTransform(scrollYProgress, [0, 1], [`${-parallax}%`, `${parallax}%`]);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el || reduce) return;

    const MARGIN = 300;
    const check = () => {
      const r = el.getBoundingClientRect();
      const visible =
        r.bottom > -MARGIN &&
        r.top < window.innerHeight + MARGIN &&
        r.right > 0 &&
        r.left < window.innerWidth;
      setInView((prev) => (prev === visible ? prev : visible));
      if (visible) setCanLoad(true);
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
