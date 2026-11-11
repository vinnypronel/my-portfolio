"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { projects } from "@/data/projects";
import { categoryMeta, categoryOrder, type Category } from "@/data/categories";
import { ProjectCard } from "./ProjectCard";

export type Filter = Category | "all";

/** Filterable, animated project grid. Featured items always sort first. */
export function ProjectsExplorer({ initialFilter = "all" }: { initialFilter?: Filter }) {
  const [filter, setFilter] = useState<Filter>(initialFilter);
  const reduce = useReducedMotion();

  const counts = useMemo(() => {
    const base: Record<Filter, number> = { all: projects.length, research: 0, freelance: 0, leadership: 0 };
    for (const p of projects) base[p.category] += 1;
    return base;
  }, []);

  const visible = useMemo(() => {
    const list = filter === "all" ? projects : projects.filter((p) => p.category === filter);
    return [...list].sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
  }, [filter]);

  const tabs: { key: Filter; label: string }[] = [
    { key: "all", label: "All" },
    ...categoryOrder.map((c) => ({ key: c as Filter, label: categoryMeta[c].label })),
  ];

  return (
    <div className="flex flex-col gap-12">
      {/* Text tabs: active one carries a cyan underline */}
      <div
        role="group"
        aria-label="Filter projects by category"
        className="flex flex-wrap gap-x-8 gap-y-3 border-b border-line"
      >
        {tabs.map((tab) => {
          const active = filter === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(tab.key)}
              className={`relative -mb-px flex items-baseline gap-2 pb-4 font-mono text-[13px] tracking-[0.08em] uppercase transition-colors duration-300 ${
                active ? "text-fg" : "text-fg-faint hover:text-fg-soft"
              }`}
            >
              {tab.label}
              <span className="text-[10px] tabular-nums opacity-70">{counts[tab.key]}</span>
              {active && (
                <motion.span
                  layoutId="work-tab"
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-px bg-accent"
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                />
              )}
            </button>
          );
        })}
      </div>

      <motion.ul layout={!reduce} className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((project) => (
            <motion.li
              key={project.slug}
              layout={!reduce}
              initial={{ opacity: 0, y: reduce ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reduce ? 0 : -8 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <ProjectCard project={project} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
}
