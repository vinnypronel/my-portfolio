"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Scroll-triggered reveal used sitewide. Animates once on entering the
 * viewport; `immediate` runs it on mount instead (above-the-fold content, so
 * the LCP never waits on an intersection callback). Collapses to a fade under
 * reduced motion.
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
  const reduce = useReducedMotion();
  const hidden = { opacity: 0, y: reduce ? 0 : y };
  const shown = { opacity: 1, y: 0 };

  return (
    <motion.div
      className={className}
      initial={hidden}
      animate={immediate ? shown : undefined}
      whileInView={immediate ? undefined : shown}
      viewport={immediate ? undefined : { once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Line-by-line text reveal: each line is clipped and slides up in sequence.
 * Pass the lines as an array so the breaks are deliberate.
 */
export function RevealLines({
  lines,
  as: Tag = "h1",
  className = "",
  delay = 0,
  immediate = false,
}: {
  lines: ReactNode[];
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  delay?: number;
  immediate?: boolean;
}) {
  const reduce = useReducedMotion();

  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        <span key={i} className="line-mask">
          <motion.span
            className="block"
            initial={{ y: reduce ? 0 : "110%", opacity: reduce ? 0 : 1 }}
            animate={immediate ? { y: 0, opacity: 1 } : undefined}
            whileInView={immediate ? undefined : { y: 0, opacity: 1 }}
            viewport={immediate ? undefined : { once: true, margin: "-80px" }}
            transition={{ duration: 1, delay: delay + i * 0.09, ease }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
