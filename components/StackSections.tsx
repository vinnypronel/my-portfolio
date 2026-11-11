"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function isCard(el: Element): el is HTMLElement {
  if (!(el instanceof HTMLElement) || el.hasAttribute("data-stack-skip")) return false;
  const style = getComputedStyle(el);
  if (style.display === "none" || style.position === "fixed" || style.position === "absolute") return false;
  if (el.matches("header, [data-site-header]")) return false;
  return el.offsetHeight > 0;
}

/**
 * Stacked section scroll. The direct children of <main> become cards: each
 * pins once its bottom reaches the bottom of the screen, and the next card
 * slides up over it with rounded top corners and a shadow. A card always
 * scrolls fully into view before it is covered, so nothing is cut off.
 *
 * The CSS lives in globals.css (.stack-root / .stack-card). This script only
 * measures each card into --stack-card-h and assigns rising z-indexes.
 * Opt a page out with <main data-stack="off">; skip one element with
 * data-stack-skip. Pages with fewer than two cards are left alone.
 */
export function StackSections() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.querySelector("main");
    if (!root) return;
    let cards: HTMLElement[] = [];
    let observer: ResizeObserver | null = null;

    const measure = (targets: HTMLElement[]) => {
      for (const card of targets) {
        card.style.setProperty("--stack-card-h", `${Math.ceil(card.offsetHeight)}px`);
      }
    };
    const stop = () => {
      observer?.disconnect();
      observer = null;
      for (const card of cards) {
        card.classList.remove("stack-card", "stack-card-first", "stack-card-last");
        card.style.removeProperty("--stack-card-h");
        card.style.removeProperty("z-index");
      }
      cards = [];
      root.classList.remove("stack-root");
    };
    const start = () => {
      stop();
      if (root.getAttribute("data-stack") === "off") return;
      cards = Array.from(root.children).filter(isCard);
      if (cards.length < 2) {
        cards = [];
        return;
      }
      root.classList.add("stack-root");
      cards.forEach((card, index) => {
        card.classList.add("stack-card");
        if (index === 0) card.classList.add("stack-card-first");
        if (index === cards.length - 1) card.classList.add("stack-card-last");
        card.style.zIndex = String(index + 1);
      });
      measure(cards);
      observer = new ResizeObserver((entries) =>
        measure(entries.map((entry) => entry.target as HTMLElement))
      );
      cards.forEach((card) => observer?.observe(card));
    };

    start();
    const sections = new MutationObserver(() => requestAnimationFrame(start));
    sections.observe(root, { childList: true });
    return () => {
      sections.disconnect();
      stop();
    };
  }, [pathname]);

  return null;
}
