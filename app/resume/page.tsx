import type { Metadata } from "next";
import { Reveal, RevealLines } from "@/components/Reveal";
import { ResumeSwitcher } from "@/components/ResumeSwitcher";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Resume for Vincent Pronel in three versions: software engineering, AI and ML, and data. Download the PDF.",
  openGraph: {
    title: "Resume · pronelweb",
    description:
      "Resume for Vincent Pronel in three versions: software engineering, AI and ML, and data. Download the PDF.",
  },
};

/* Shared across all three versions; taken from the current resumes. */
const sections: { title: string; items: string[] }[] = [
  {
    title: "Experience",
    items: [
      "Independent Web Developer, pronelweb · Jan 2026 to present. Five production sites for five paying clients plus the WiCyS Kean chapter site; two with live payments.",
      "Computer Science Tutor, Code Samurai · Jan 2026 to present. Selected by CS faculty for one-on-one Database Management Systems tutoring.",
      "Data Visualization and Analytics Intern, GSSRP · July 2026. Lectured daily and wrote 8 labs for 5 high school students under Dr. Ching-yu Huang.",
    ],
  },
  {
    title: "Research",
    items: [
      "AI-Assisted Java Execution Visualizer · CRA UR2PhD-REU Fellowship, June 2026 to present. Competitively selected, $8,000 funded, 400 hours. Advisor Dr. Yan Ma.",
      "Jobs vs. Wages · NSF IUSE Scholars Academy, May 2026 to present. Competitively selected, $1,400 funded. Advisor Dr. Pauline Wang. Presented at GMiS 2026, Albuquerque.",
      "AI Debate Coach Evaluation · CRA UR2PhD, Feb to Apr 2026. Advisor Dr. Yan Ma. Presented at the UR2PhD Research Showcase, New Orleans.",
    ],
  },
  {
    title: "Education",
    items: [
      "B.S. Computer Science, Kean University · Expected 2027",
      "Dean's List · Spring 2024, Fall 2025",
      "Web Developer, WiCyS Kean Chapter E-Board",
    ],
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
            lines={["One page,", "three cuts."]}
          />
          <Reveal immediate delay={0.4}>
            <p className="prose-measure mt-8">
              The same year of work, framed for the role you are hiring for.
              Pick the version that matches and download it.
            </p>
          </Reveal>
          <Reveal immediate delay={0.5}>
            <div className="mt-12">
              <ResumeSwitcher />
            </div>
          </Reveal>
        </header>

        <div className="lg:col-span-6 lg:col-start-7">
          <Reveal immediate delay={0.35}>
            <dl className="flex flex-col divide-y divide-line border-y border-line">
              {sections.map((s) => (
                <div key={s.title} className="grid gap-3 py-7 sm:grid-cols-12 sm:gap-8">
                  <dt className="eyebrow sm:col-span-3">{s.title}</dt>
                  <dd className="sm:col-span-9">
                    <ul className="flex flex-col gap-3 text-[15px] leading-relaxed text-fg">
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
