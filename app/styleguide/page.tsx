import type { Metadata } from "next";
import { StatBlock } from "@/components/StatBlock";
import { CategoryTag } from "@/components/CategoryTag";
import { StatusBadge } from "@/components/StatusBadge";
import { TechChips } from "@/components/TechChips";
import { ResearchFinding } from "@/components/ResearchFinding";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/data/projects";
import { categoryMeta, categoryOrder } from "@/data/categories";

/**
 * Internal design-system reference, intentionally not linked in the nav.
 * Visit /styleguide during development to see every token and base component.
 */
export const metadata: Metadata = {
  title: "Styleguide",
  robots: { index: false },
};

const swatches = [
  { name: "paper", cls: "bg-paper border border-line" },
  { name: "paper-deep", cls: "bg-paper-deep" },
  { name: "cream", cls: "bg-cream border border-line" },
  { name: "ink", cls: "bg-ink" },
  { name: "ink-soft", cls: "bg-ink-soft" },
  { name: "line", cls: "bg-line" },
  { name: "accent", cls: "bg-accent" },
  { name: "accent-deep", cls: "bg-accent-deep" },
  { name: "research", cls: "bg-research" },
  { name: "freelance", cls: "bg-freelance" },
  { name: "leadership", cls: "bg-leadership" },
];

export default function StyleguidePage() {
  return (
    <div className="container-site flex flex-col gap-16 pt-16 pb-8">
      <header>
        <p className="eyebrow">Internal</p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight">
          Design system reference
        </h1>
        <p className="mt-3 text-ink-soft">
          Tokens and base components. Not linked in the nav.
        </p>
      </header>

      <section>
        <h2 className="eyebrow">Type scale · Fraunces display / Instrument Sans body</h2>
        <div className="mt-6 flex flex-col gap-4">
          <p className="font-display text-6xl font-semibold tracking-tight">Display / 60</p>
          <p className="font-display text-4xl font-semibold tracking-tight">Heading 1 / 36</p>
          <p className="font-display text-2xl font-semibold tracking-tight">Heading 2 / 24</p>
          <p className="font-display text-xl font-semibold">Heading 3 / 20</p>
          <p className="prose-measure">
            Body / 17. Generous line-height and measure so research write-ups
            never feel like a wall of text.
          </p>
          <p className="eyebrow">Eyebrow / 12 tracked caps</p>
        </div>
      </section>

      <section>
        <h2 className="eyebrow">Color tokens</h2>
        <div className="mt-6 flex flex-wrap gap-4">
          {swatches.map((s) => (
            <div key={s.name} className="flex flex-col items-center gap-2">
              <div className={`size-16 rounded-xl ${s.cls}`} />
              <span className="text-xs font-medium text-ink-soft">{s.name}</span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="eyebrow">Buttons</h2>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button className="btn btn-primary">Primary action</button>
          <button className="btn btn-outline">Secondary action</button>
        </div>
      </section>

      <section>
        <h2 className="eyebrow">Tags, badges &amp; chips</h2>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          {categoryOrder.map((c) => (
            <CategoryTag key={c} category={c} full />
          ))}
          <StatusBadge status="in-progress" />
          <StatusBadge status="planned" />
        </div>
        <div className="mt-4">
          <TechChips stack={["Next.js", "TypeScript", "Tailwind CSS", "GSAP"]} />
        </div>
      </section>

      <section>
        <h2 className="eyebrow">Stat block</h2>
        <div className="mt-6 grid max-w-xl grid-cols-2 gap-8">
          <StatBlock value="52" label="states & territories analyzed" />
          <StatBlock value="100%" label="citation fabrication rate uncovered" />
        </div>
      </section>

      <section>
        <h2 className="eyebrow">Research finding · default &amp; emphasis</h2>
        <div className="mt-6 flex max-w-3xl flex-col gap-5">
          <ResearchFinding
            finding={{
              value: "r = −0.7366",
              label: "Poverty ↔ income",
              detail: "Default variant of the finding callout.",
            }}
          />
          <ResearchFinding
            finding={{
              value: "100%",
              label: "Citation fabrication rate",
              detail: "Emphasis variant, reserved for headline findings.",
              emphasis: true,
            }}
          />
        </div>
      </section>

      <section>
        <h2 className="eyebrow">Project card ×3 (category accents)</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categoryOrder.map((c) => {
            const sample = projects.find((p) => p.category === c);
            return sample ? <ProjectCard key={c} project={sample} /> : null;
          })}
        </div>
        <p className="mt-4 text-xs text-ink-faint">
          Category accents: {categoryOrder.map((c) => categoryMeta[c].label).join(" · ")}
        </p>
      </section>
    </div>
  );
}
