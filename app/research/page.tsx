import type { Metadata } from "next";
import { researchNarratives } from "@/data/research";
import { ResearchFinding } from "@/components/ResearchFinding";
import { StatusBadge } from "@/components/StatusBadge";
import { Reveal, RevealLines } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Data-driven and HCI research: a 52-state economic analysis and an AI debate-coaching study that uncovered a 100% citation fabrication rate.",
  openGraph: {
    title: "Research · pronelweb",
    description:
      "A 52-state economic analysis and an AI debate-coaching study that uncovered a 100% citation fabrication rate.",
  },
};

export default function ResearchPage() {
  return (
    <div className="container-site pt-36 pb-8 sm:pt-44">
      <header>
        <Reveal immediate>
          <p className="eyebrow">Research</p>
        </Reveal>
        <RevealLines
          immediate
          delay={0.1}
          as="h1"
          className="display-xl mt-6 font-semibold text-fg"
          lines={["Findings worth", "reading closely."]}
        />
        <Reveal immediate delay={0.4}>
          <p className="prose-measure mt-8">
            Two completed studies, one in data-driven economic analysis and one
            in human-AI interaction, plus an active summer project. Full
            methodology included, because rigor is the point.
          </p>
        </Reveal>
      </header>

      <div className="mt-24 flex flex-col gap-28">
        {researchNarratives.map((study, n) => (
          <Reveal key={study.id}>
            <section
              id={study.id}
              aria-labelledby={`${study.id}-title`}
              className="scroll-mt-28 border-t border-line pt-10"
            >
              <div className="grid gap-12 lg:grid-cols-12">
                {/* Meta column */}
                <div className="lg:col-span-4">
                  <div className="flex flex-col gap-5 lg:sticky lg:top-28">
                    <div className="flex flex-wrap items-center gap-5 font-mono text-[11px] tracking-[0.18em] text-fg-faint uppercase">
                      <span className="text-accent">{String(n + 1).padStart(2, "0")}</span>
                      <span>{study.program}</span>
                      {study.status === "in-progress" && <StatusBadge status="in-progress" />}
                    </div>
                    <h2 id={`${study.id}-title`} className="display-lg font-semibold text-fg">
                      {study.title}
                    </h2>
                    <dl className="flex flex-col gap-2 text-sm text-fg-soft">
                      <div>
                        <dt className="sr-only">Timeframe</dt>
                        <dd>{study.timeframe}</dd>
                      </div>
                      {study.advisor && (
                        <div>
                          <dt className="sr-only">Advisor</dt>
                          <dd className="text-fg">{study.advisor}</dd>
                        </div>
                      )}
                      {study.team && (
                        <div>
                          <dt className="sr-only">Team</dt>
                          <dd>{study.team}</dd>
                        </div>
                      )}
                      {study.presentation && (
                        <div className="mt-3 border-l border-accent pl-4">
                          <dt className="eyebrow">Presented at</dt>
                          <dd className="mt-1 text-fg">{study.presentation}</dd>
                        </div>
                      )}
                    </dl>
                  </div>
                </div>

                {/* Content column */}
                <div className="flex flex-col gap-12 lg:col-span-7 lg:col-start-6">
                  <div>
                    <p className="eyebrow">Research question</p>
                    <p className="display-md mt-4 font-medium text-fg">{study.question}</p>
                    {study.dataset && (
                      <p className="mt-5 text-sm text-fg-soft">
                        <span className="font-mono text-[11px] tracking-[0.14em] text-fg-faint uppercase">
                          Dataset
                        </span>{" "}
                        <span className="ml-2">{study.dataset}</span>
                      </p>
                    )}
                  </div>

                  {study.methodology.length > 0 && (
                    <div>
                      <p className="eyebrow">Methodology</p>
                      <ol className="mt-5 flex flex-col divide-y divide-line border-y border-line">
                        {study.methodology.map((step, i) => (
                          <li key={step} className="flex gap-6 py-4">
                            <span className="shrink-0 font-mono text-xs text-accent">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <p className="leading-relaxed text-fg-soft">{step}</p>
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}

                  {study.findings.length > 0 && (
                    <div>
                      <p className="eyebrow">Findings</p>
                      <div className="mt-5 flex flex-col gap-4">
                        {study.findings
                          .filter((f) => f.emphasis)
                          .map((f) => (
                            <ResearchFinding key={f.label} finding={f} />
                          ))}
                        <div className="grid gap-4 sm:grid-cols-2">
                          {study.findings
                            .filter((f) => !f.emphasis)
                            .map((f) => (
                              <ResearchFinding key={f.label} finding={f} />
                            ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {study.showChart && (
                    <div>
                      <p className="eyebrow">Visualization</p>
                      {/* PLACEHOLDER: replace this block with the real Google Charts
                          exports (bar + scatter) from the IUSE project. Drop the
                          images in /public/research/ and swap in an <Image>. */}
                      <div
                        role="img"
                        aria-label="Chart placeholder: the project's Google Charts bar and scatter outputs will appear here"
                        className="relative mt-5 flex aspect-[16/7] items-end overflow-hidden rounded-[6px] border border-dashed border-line-strong bg-ink-900 p-6"
                      >
                        <div
                          aria-hidden
                          className="absolute inset-0 bg-[linear-gradient(rgb(255_255_255_/_0.04)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255_/_0.04)_1px,transparent_1px)] bg-[size:48px_48px]"
                        />
                        <p className="relative font-mono text-[11px] tracking-[0.18em] text-fg-faint uppercase">
                          Google Charts exports / pending
                        </p>
                      </div>
                    </div>
                  )}

                  {study.deliverables && (
                    <p className="border-l border-line pl-5 text-sm leading-relaxed text-fg-soft">
                      <span className="font-mono text-[11px] tracking-[0.14em] text-fg-faint uppercase">
                        Deliverables
                      </span>
                      <br />
                      {study.deliverables}
                    </p>
                  )}

                  {study.status === "in-progress" && (
                    <p className="border-l border-accent pl-5 text-sm leading-relaxed text-fg-soft">
                      This study is active; findings will be published here once the
                      pilot study wraps.
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
