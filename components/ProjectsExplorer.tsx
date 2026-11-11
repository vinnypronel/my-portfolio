"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { projects } from "@/data/projects";
import type { Category } from "@/data/categories";
import { CategoryFilterPills, type Filter } from "./CategoryFilterPills";
import { ProjectCard } from "./ProjectCard";

/** Filterable, animated project grid. Featured items always sort first. */
export function ProjectsExplorer({ initialFilter = "all" }: { initialFilter?: Filter }) {
  const [filter, setFilter] = useState<Filter>(initialFilter);
  const reduce = useReducedMotion();

  const counts = useMemo(() => {
    const base: Record<Filter, number> = {
      all: projects.length,
      research: 0,
      freelance: 0,
      leadership: 0,
    };
    for (const p of projects) base[p.category] += 1;
    return base;
  }, []);

  const visible = useMemo(() => {
    const list =
      filter === "all"
        ? projects
        : projects.filter((p) => p.category === (filter as Category));
    // Featured first, stable otherwise
    return [...list].sort(
      (a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured))
    );
  }, [filter]);

  return (
    <div className="flex flex-col gap-10">
      <CategoryFilterPills value={filter} onChange={setFilter} counts={counts} />

      <motion.ul layout={!reduce} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((project) => (
            <motion.li
              key={project.slug}
              layout={!reduce}
              initial={{ opacity: 0, scale: reduce ? 1 : 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: reduce ? 1 : 0.96 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProjectCard project={project} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
}
