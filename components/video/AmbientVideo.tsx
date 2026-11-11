"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";

/**
 * Decorative or walkthrough loop for below-the-fold content.
 *
 * Built for instant starts with no wasted bytes:
 *  - nothing downloads until the element is within `margin` px of the
 *    viewport; at that point `src` is attached with preload="auto", so the
 *    first seconds are already buffered by the time the clip scrolls into view
 *  - playback starts on entering the viewport and pauses on leaving, so an
 *    off-screen clip never decodes
 *  - `eager` (case-study heroes) attaches the source on mount
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
  eager = false,
  margin = 600,
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
  /** attach the source immediately instead of waiting for approach */
  eager?: boolean;
  /** how far outside the viewport (px) the source is attached */
  margin?: number;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(false);
  const [canLoad, setCanLoad] = useState(eager);
  const reduce = useReducedMotionSafe();

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [`${-parallax}%`, `${parallax}%`]);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el || reduce) return;

    const check = () => {
      const r = el.getBoundingClientRect();
      const near =
        r.bottom > -margin &&
        r.top < window.innerHeight + margin &&
        r.right > 0 &&
        r.left < window.innerWidth;
      const visible = r.bottom > 0 && r.top < window.innerHeight;
      setInView((prev) => (prev === visible ? prev : visible));
      if (near) setCanLoad(true);
    };

    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, [reduce, margin]);

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
          className={`${videoClassName} bg-center bg-no-repeat ${
            videoClassName.includes("object-contain") ? "bg-contain" : "bg-cover"
          }`}
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
          disablePictureInPicture
          disableRemotePlayback
          preload={canLoad ? "auto" : "none"}
          tabIndex={-1}
          className={videoClassName}
          style={parallax ? { y } : undefined}
        />
      )}
    </div>
  );
}
