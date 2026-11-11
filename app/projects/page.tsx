import type { Metadata } from "next";
import { ProjectsExplorer } from "@/components/ProjectsExplorer";
import { Reveal } from "@/components/Reveal";
import type { Filter } from "@/components/CategoryFilterPills";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Research, freelance client builds, and hackathon & leadership work, filterable by category.",
  openGraph: {
    title: "Work · Vinny",
    description:
      "Research, freelance client builds, and hackathon & leadership work, filterable by category.",
  },
};

const validFilters: Filter[] = ["all", "research", "freelance", "leadership"];

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string }>;
}) {
  const { cat } = await searchParams;
  const initialFilter: Filter = validFilters.includes(cat as Filter)
    ? (cat as Filter)
    : "all";

  return (
    <div className="container-site pt-16 pb-8 sm:pt-24">
      <Reveal>
        <p className="eyebrow">Work</p>
        <h1 className="mt-4 max-w-[16ch] font-display text-4xl font-semibold tracking-tight sm:text-6xl">
          Everything, in one grid.
        </h1>
        <p className="prose-measure mt-5">
          Research, client builds, and competition work side by side. Filter
          by category, or scan it all. Featured projects always lead.
        </p>
      </Reveal>

      <div className="mt-12">
        <ProjectsExplorer initialFilter={initialFilter} />
      </div>
    </div>
  );
}
