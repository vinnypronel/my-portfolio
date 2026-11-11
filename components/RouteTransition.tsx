"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type Phase = "hidden" | "enter" | "exit";

const COVER_MS = 180;
const EXIT_MS = 420;
const FAILSAFE_MS = 4000;

/**
 * Route fade transition. On an eligible internal link click the current
 * <main> fades up and out over 180ms while a thin accent line grows across
 * the top; navigation starts after the cover; the new page rises into place
 * over 420ms and the line completes and fades. Header and footer stay put.
 *
 * Never intercepts: prevented events, modified or non-left clicks, reduced
 * motion, links without href, non-_self targets, downloads, hash / mailto /
 * tel / absolute http(s) links, cross-origin URLs, the current pathname, or
 * API routes. A failsafe exits the transition if navigation never settles.
 */
export function RouteTransition() {
  const pathname = usePathname();
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("hidden");
  const phaseRef = useRef<Phase>("hidden");
  const lastSettled = useRef(pathname);

  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  useEffect(() => {
    const timers: number[] = [];

    function onClick(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const anchor = (event.target as Element | null)?.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;
      if (anchor.target && anchor.target !== "_self") return;
      if (anchor.hasAttribute("download")) return;
      if (/^(#|mailto:|tel:|https?:\/\/)/.test(href)) return;

      let url: URL;
      try {
        url = new URL(href, window.location.origin);
      } catch {
        return;
      }

      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname) return;
      if (url.pathname.startsWith("/api")) return;

      event.preventDefault();
      const destination = url.pathname + url.search + url.hash;
      phaseRef.current = "enter";
      setPhase("enter");

      timers.push(
        window.setTimeout(() => router.push(destination), COVER_MS),
        window.setTimeout(() => {
          if (phaseRef.current === "enter") setPhase("exit");
        }, COVER_MS + FAILSAFE_MS)
      );
    }

    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [router]);

  useEffect(() => {
    if (pathname === lastSettled.current) return;
    lastSettled.current = pathname;
    if (phaseRef.current !== "enter") return;
    setPhase("exit");
  }, [pathname]);

  useEffect(() => {
    if (phase !== "exit") return;
    const timer = window.setTimeout(() => setPhase("hidden"), EXIT_MS);
    return () => window.clearTimeout(timer);
  }, [phase]);

  useEffect(() => {
    const root = document.documentElement;
    if (phase === "enter") root.dataset.route = "out";
    else if (phase === "exit") root.dataset.route = "in";
    else delete root.dataset.route;
    return () => {
      delete root.dataset.route;
    };
  }, [phase]);

  return (
    <div
      aria-hidden
      className={`route-line route-line-${phase} pointer-events-none fixed inset-x-0 top-0 z-[90] h-[2px] origin-left bg-accent`}
    />
  );
}
