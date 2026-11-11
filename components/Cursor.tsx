"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * Desktop-only cursor dot. Follows the pointer with a short lag and grows
 * into a thin ring over links and buttons. Hidden on touch devices and under
 * prefers-reduced-motion; the native cursor stays visible throughout.
 */
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    el.style.display = "block";
    const xTo = gsap.quickTo(el, "x", { duration: 0.35, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.35, ease: "power3.out" });

    const move = (e: PointerEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };
    const over = (e: PointerEvent) => {
      const t = e.target as HTMLElement | null;
      const interactive = t?.closest("a, button, [role=button], input, textarea, label");
      el.dataset.hover = interactive ? "true" : "false";
    };
    const leave = () => {
      el.dataset.hover = "false";
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[100] hidden -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
    >
      <div className="size-2.5 rounded-full bg-fg transition-all duration-300 ease-out [[data-hover=true]>&]:size-12 [[data-hover=true]>&]:bg-transparent [[data-hover=true]>&]:ring-1 [[data-hover=true]>&]:ring-fg" />
    </div>
  );
}
