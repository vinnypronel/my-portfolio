"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { site } from "@/data/site";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Three resume variations behind text tabs. The active tab shows that
 * version's focus and its download / open buttons. Files live in
 * public/resume/ and are listed in data/site.ts.
 */
export function ResumeSwitcher() {
  const [active, setActive] = useState<(typeof site.resumes)[number]["key"]>(site.resumes[0].key);
  const reduce = useReducedMotionSafe();
  const current = site.resumes.find((r) => r.key === active) ?? site.resumes[0];

  return (
    <div>
      <div
        role="tablist"
        aria-label="Resume version"
        className="flex flex-wrap gap-x-8 gap-y-3 border-b border-line"
      >
        {site.resumes.map((r) => {
          const on = r.key === active;
          return (
            <button
              key={r.key}
              type="button"
              role="tab"
              aria-selected={on}
              aria-controls={`resume-${r.key}`}
              onClick={() => setActive(r.key)}
              className={`relative -mb-px pb-4 font-mono text-[13px] tracking-[0.08em] uppercase transition-colors duration-300 ${
                on ? "text-fg" : "text-fg-faint hover:text-fg-soft"
              }`}
            >
              {r.label}
              {on && (
                <motion.span
                  layoutId="resume-tab"
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-px bg-accent"
                  transition={{ duration: 0.5, ease }}
                />
              )}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={current.key}
          id={`resume-${current.key}`}
          role="tabpanel"
          initial={{ opacity: 0, y: reduce ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: reduce ? 0 : -8 }}
          transition={{ duration: 0.4, ease }}
          className="pt-8"
        >
          <p className="prose-measure">{current.blurb}</p>
          <ul className="mt-6 flex flex-col gap-2 font-mono text-[12px] tracking-[0.06em] text-fg-soft">
            {current.focus.map((f) => (
              <li key={f} className="flex gap-3">
                <span aria-hidden className="mt-2 h-px w-4 shrink-0 bg-accent" />
                {f}
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href={current.file} download={current.downloadName} className="btn btn-primary">
              Download PDF
            </a>
            <a href={current.file} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              Open in new tab
            </a>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
