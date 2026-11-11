import type { Metadata } from "next";
import { ProjectsExplorer, type Filter } from "@/components/ProjectsExplorer";
import { Reveal, RevealLines } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Client builds, research, and hackathon and leadership work, filterable by category.",
  openGraph: {
    title: "Work · pronelweb",
    description:
      "Client builds, research, and hackathon and leadership work, filterable by category.",
  },
};

const validFilters: Filter[] = ["all", "research", "freelance", "leadership"];

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string }>;
}) {
  const { cat } = await searchParams;
  const initialFilter: Filter = validFilters.includes(cat as Filter) ? (cat as Filter) : "all";

  return (
    <div className="container-site pt-36 pb-8 sm:pt-44">
      <Reveal immediate>
        <p className="eyebrow">Work</p>
      </Reveal>
      <RevealLines
        immediate
        delay={0.1}
        as="h1"
        className="display-xl mt-6 font-semibold text-fg"
        lines={["Everything,", "in one grid."]}
      />
      <Reveal immediate delay={0.4}>
        <p className="prose-measure mt-8">
          Client builds, research, and competition work side by side. Filter by
          category or scan it all. Featured projects always lead.
        </p>
      </Reveal>

      <div className="mt-16">
        <ProjectsExplorer initialFilter={initialFilter} />
      </div>
    </div>
  );
}
