"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Site-wide Framer config. reducedMotion="user" makes every motion component
 * skip transform animations (opacity still animates) when the visitor
 * prefers reduced motion, without any component reading the media query
 * during render.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
