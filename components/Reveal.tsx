"use client";

import { motion } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import type { CSSProperties, ReactNode } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Scroll-triggered reveal used sitewide. Animates once on entering the
 * viewport. `immediate` is for above-the-fold content: it renders a plain
 * element with a CSS keyframe entrance, so the first paint never waits on
 * hydration and the LCP is unaffected. Collapses to a fade under reduced
 * motion (Framer path) or to an instant show (CSS path, via the global rule).
 */
export function Reveal({
  children,
  delay = 0,
  y = 32,
  immediate = false,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  immediate?: boolean;
  className?: string;
}) {
  const reduce = useReducedMotionSafe();

  if (immediate) {
    return (
      <div
        className={`rise ${className ?? ""}`}
        style={{ "--delay": `${delay}s`, "--rise-y": `${y}px` } as CSSProperties}
      >
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Line-by-line text reveal: each line is clipped and slides up in sequence.
 * Pass the lines as an array so the breaks are deliberate.
 *
 * `immediate` uses the CSS keyframe path (no hydration dependency). The
 * in-view path puts the observer on the clipping wrapper, not the moving
 * line: IntersectionObserver clips by overflow-hidden ancestors, so a line
 * that starts translated out of its mask would never register as visible.
 */
export function RevealLines({
  lines,
  as: Tag = "h1",
  id,
  className = "",
  delay = 0,
  immediate = false,
}: {
  lines: ReactNode[];
  as?: "h1" | "h2" | "h3" | "p";
  id?: string;
  className?: string;
  delay?: number;
  immediate?: boolean;
}) {
  const reduce = useReducedMotionSafe();

  if (immediate) {
    return (
      <Tag className={className}>
        {lines.map((line, i) => (
          <span key={i} className="line-mask">
            <span
              className="line-up block"
              style={{ "--delay": `${delay + i * 0.09}s` } as CSSProperties}
            >
              {line}
            </span>
          </span>
        ))}
      </Tag>
    );
  }

  const variants = {
    hidden: { y: reduce ? 0 : "110%", opacity: reduce ? 0 : 1 },
    shown: { y: 0, opacity: 1 },
  };

  return (
    <Tag id={id} className={className}>
      {lines.map((line, i) => (
        <motion.span
          key={i}
          className="line-mask"
          initial="hidden"
          whileInView="shown"
          viewport={{ once: true, margin: "-60px" }}
        >
          <motion.span
            className="block"
            variants={variants}
            transition={{ duration: 1, delay: delay + i * 0.09, ease }}
          >
            {line}
          </motion.span>
        </motion.span>
      ))}
    </Tag>
  );
}
