import type { Metadata } from "next";
import { researchNarratives } from "@/data/research";
import { ResearchFinding } from "@/components/ResearchFinding";
import { StatusBadge } from "@/components/StatusBadge";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Data-driven and HCI research: a 52-state economic analysis (r = 0.7872 education–income correlation) and an AI debate-coaching study that uncovered a 100% citation fabrication rate.",
  openGraph: {
    title: "Research · Vinny",
    description:
      "A 52-state economic analysis and an AI debate-coaching study that uncovered a 100% citation fabrication rate.",
  },
};

export default function ResearchPage() {
  return (
    <div className="container-site pt-16 pb-8 sm:pt-24">
      {/* Header */}
      <header className="max-w-3xl">
        <Reveal>
          <p className="eyebrow">Research</p>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-6xl">
            Findings worth <em className="text-research">reading closely.</em>
          </h1>
          <p className="prose-measure mt-5">
            Two completed studies, one in data-driven economic analysis and one
            in human-AI interaction, plus an active summer project. Full
            methodology included, because rigor is the point.
          </p>
        </Reveal>
      </header>

      <div className="mt-16 flex flex-col gap-20">
        {researchNarratives.map((study) => (
          <Reveal key={study.id}>
            <section
              id={study.id}
              aria-labelledby={`${study.id}-title`}
              className="scroll-mt-28 border-t hairline pt-12"
            >
              <div className="grid gap-10 lg:grid-cols-12">
                {/* Meta column */}
                <div className="lg:col-span-4">
                  <div className="flex flex-col gap-4 lg:sticky lg:top-28">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="text-[11px] font-semibold tracking-[0.14em] uppercase text-research">
                        {study.program}
                      </span>
                      {study.status === "in-progress" && (
                        <StatusBadge status="in-progress" />
                      )}
                    </div>
                    <h2
                      id={`${study.id}-title`}
                      className="font-display text-3xl font-semibold tracking-tight sm:text-4xl"
                    >
                      {study.title}
                    </h2>
                    <dl className="flex flex-col gap-2 text-sm text-ink-soft">
                      <div>
                        <dt className="sr-only">Timeframe</dt>
                        <dd>{study.timeframe}</dd>
                      </div>
                      {study.advisor && (
                        <div>
                          <dt className="sr-only">Advisor</dt>
                          <dd className="font-medium text-ink">{study.advisor}</dd>
                        </div>
                      )}
                      {study.team && (
                        <div>
                          <dt className="sr-only">Team</dt>
                          <dd>{study.team}</dd>
                        </div>
                      )}
                      {study.presentation && (
                        <div className="mt-2 rounded-xl border border-research/25 bg-research/8 px-4 py-3">
                          <dt className="text-[10px] font-semibold tracking-[0.18em] uppercase text-research">
                            Presented at
                          </dt>
                          <dd className="mt-1 font-medium text-ink">
                            {study.presentation}
                          </dd>
                        </div>
                      )}
                    </dl>
                  </div>
                </div>

                {/* Content column */}
                <div className="flex flex-col gap-10 lg:col-span-8">
                  <div>
                    <h3 className="eyebrow">Research question</h3>
                    <p className="mt-3 font-display text-xl leading-relaxed font-medium text-balance sm:text-2xl">
                      {study.question}
                    </p>
                    {study.dataset && (
                      <p className="mt-4 text-sm text-ink-soft">
                        <span className="font-semibold text-ink">Dataset:</span>{" "}
                        {study.dataset}
                      </p>
                    )}
                  </div>

                  {study.methodology.length > 0 && (
                    <div>
                      <h3 className="eyebrow">Methodology</h3>
                      <ol className="mt-4 flex flex-col gap-4">
                        {study.methodology.map((step, i) => (
                          <li key={step} className="flex gap-4">
                            <span
                              aria-hidden
                              className="flex size-7 shrink-0 items-center justify-center rounded-full border border-research/30 font-display text-sm font-semibold text-research"
                            >
                              {i + 1}
                            </span>
                            <p className="leading-relaxed text-ink-soft">{step}</p>
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}

                  {study.findings.length > 0 && (
                    <div>
                      <h3 className="eyebrow">Findings</h3>
                      <div className="mt-4 flex flex-col gap-5">
                        {/* Emphasized finding gets full width; the rest pair up */}
                        {study.findings.filter((f) => f.emphasis).map((f) => (
                          <ResearchFinding key={f.label} finding={f} />
                        ))}
                        <div className="grid gap-5 sm:grid-cols-2">
                          {study.findings.filter((f) => !f.emphasis).map((f) => (
                            <ResearchFinding key={f.label} finding={f} />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {study.showChart && (
                    <div>
                      <h3 className="eyebrow">Visualization</h3>
                      {/* PLACEHOLDER: replace this block with the real Google Charts
                          exports (bar + scatter) from the IUSE project. Drop the
                          images in /public/research/ and swap in an <Image>. */}
                      <div
                        role="img"
                        aria-label="Chart placeholder: the project's Google Charts bar and scatter outputs will appear here"
                        className="mt-4 flex aspect-[16/7] items-center justify-center rounded-2xl border border-dashed border-research/40 bg-research/8"
                      >
                        <div className="px-6 text-center">
                          <p className="font-display text-lg font-semibold text-research">
                            Google Charts exports land here
                          </p>
                          <p className="mt-1.5 text-sm text-ink-soft">
                            Bar &amp; scatter charts from the live PHP
                            visualization layer.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {study.deliverables && (
                    <p className="rounded-xl border hairline bg-paper-deep/60 px-5 py-4 text-sm leading-relaxed text-ink-soft">
                      <span className="font-semibold text-ink">
                        Deliverables:
                      </span>{" "}
                      {study.deliverables}
                    </p>
                  )}

                  {study.status === "in-progress" && (
                    <p className="rounded-xl border border-dashed hairline px-5 py-4 text-sm leading-relaxed text-ink-soft">
                      This study is active; findings will be published here once
                      the pilot study wraps.
                    </p>
                  )}
                </div>
              </div>
            </section>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
