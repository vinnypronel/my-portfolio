"use client";

import { useEffect, useState } from "react";

/**
 * Hydration-safe reduced-motion flag. Framer's useReducedMotion reads the
 * media query during render, so the server (false) and a reduced-motion
 * client (true) produce different markup and React reports a hydration
 * mismatch. This returns false for the server and first client render, then
 * updates after mount and follows later changes to the preference.
 */
export function useReducedMotionSafe() {
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduce(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return reduce;
}
