import type { Metadata } from "next";
import { Reveal, RevealLines } from "@/components/Reveal";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Resume",
  description: "Resume for Vincent Pronel, developer and researcher. Download the PDF.",
  openGraph: {
    title: "Resume · pronelweb",
    description: "Resume for Vincent Pronel, developer and researcher. Download the PDF.",
  },
};

const sections: { title: string; items: string[] }[] = [
  {
    title: "Roles",
    items: [
      "Founder, pronelweb",
      "Researcher, IUSE Scholars Academy",
      "Lead Web Developer, Kean WiCyS (e-board)",
      "Peer mentor and tutor, Code Samurai",
      "Co-founder, Adzio",
      "Data Visualization and Analytics Intern, GSSRP (Jul 6 to 30, 2026)",
    ],
  },
  {
    title: "Research and presentations",
    items: [
      "GMiS Research Posters Competition · Jobs vs. Wages",
      "UR2PhD conference showcase, New Orleans · Debate Coach",
    ],
  },
  {
    title: "Education and training",
    items: [
      "B.S. Computer Science, Kean University · Expected May 2027",
      "Dean's List · Spring 2024, Fall 2025",
      "CRA UR2PhD research training program",
      "CodePath TIP103 · Advanced Technical Interview Prep",
    ],
  },
  {
    title: "Core stack",
    items: ["TypeScript / React / Next.js / Tailwind CSS / GSAP / Node.js / MySQL / PHP / Python / SQL"],
  },
];

export default function ResumePage() {
  return (
    <div className="container-site pt-36 pb-8 sm:pt-44">
      <div className="grid gap-16 lg:grid-cols-12">
        <header className="lg:col-span-5">
          <Reveal immediate>
            <p className="eyebrow">Resume</p>
          </Reveal>
          <RevealLines
            immediate
            delay={0.1}
            as="h1"
            className="display-xl mt-6 font-semibold text-fg"
            lines={["The", "one-pager."]}
          />
          <Reveal immediate delay={0.4}>
            <p className="prose-measure mt-8">{site.positioning}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              {/* To update: replace public/resume.pdf and every link follows. */}
              <a href={site.resumePath} download={site.resumeDownloadName} className="btn btn-primary">
                Download PDF
              </a>
              <a href={site.resumePath} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                Open in new tab
              </a>
            </div>
          </Reveal>
        </header>

        <div className="lg:col-span-6 lg:col-start-7">
          <Reveal immediate delay={0.35}>
            <dl className="flex flex-col divide-y divide-line border-y border-line">
              {sections.map((s) => (
                <div key={s.title} className="grid gap-3 py-7 sm:grid-cols-12 sm:gap-8">
                  <dt className="eyebrow sm:col-span-4">{s.title}</dt>
                  <dd className="sm:col-span-8">
                    <ul className="flex flex-col gap-2 text-[15px] leading-relaxed text-fg">
                      {s.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
