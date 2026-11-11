import type Lenis from "lenis";

/** The single Lenis instance, so the nav overlay can stop and start scroll. */
let instance: Lenis | null = null;

export function setLenis(lenis: Lenis | null) {
  instance = lenis;
}

export function getLenis() {
  return instance;
}
