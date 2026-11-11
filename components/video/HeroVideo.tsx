"use client";

import { useEffect, useRef } from "react";

/**
 * Above-the-fold hero loop. The one clip that loads eagerly.
 *
 *  - the browser picks the mobile or desktop source at parse time, no JS
 *  - the poster paints first and is the LCP candidate (preloaded in layout)
 *  - under prefers-reduced-motion playback never starts and the poster stays
 *  - always aria-hidden: decorative only
 */
export function HeroVideo({
  src,
  mobileSrc,
  poster,
  className = "",
}: {
  src: string;
  mobileSrc?: string;
  poster: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.pause();
      video.removeAttribute("autoplay");
      return;
    }
    video.play().catch(() => {});
  }, []);

  return (
    <video
      ref={ref}
      aria-hidden
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      poster={poster}
      tabIndex={-1}
      className={`h-full w-full object-cover ${className}`}
    >
      {mobileSrc && <source src={mobileSrc} media="(max-width: 767px)" type="video/mp4" />}
      <source src={src} type="video/mp4" />
    </video>
  );
}
