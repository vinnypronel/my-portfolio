import type { Metadata } from "next";
import { Reveal, RevealLines } from "@/components/Reveal";
import { SkillsGrid } from "@/components/SkillsGrid";
import { SectionHeading } from "@/components/SectionHeading";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Studio",
  description:
    "pronelweb is the studio of Vincent Pronel: a developer and researcher in New Jersey who designs, builds, and maintains every project himself.",
  openGraph: {
    title: "Studio · pronelweb",
    description:
      "The studio of Vincent Pronel: a developer and researcher in New Jersey who designs, builds, and maintains every project himself.",
  },
};

/**
 * Roles held this year. Active ones carry no marker; anything finished gets a
 * `completed` label so a wrapped-up role never reads as if it's still running.
 */
const roles: { title: string; detail: string; completed?: string }[] = [
  {
    title: "Founder, pronelweb",
    detail: "Design, build, and maintenance of production sites and booking platforms for New Jersey businesses",
  },
  {
    title: "Researcher, IUSE Scholars Academy",
    detail: "Data-driven economic research, advised by Prof. Pauline Wang",
  },
  {
    title: "Lead Web Developer, Kean WiCyS",
    detail: "E-board role; building and maintaining the chapter's official site, its events and announcements system, and its resource hub",
  },
  {
    title: "Peer mentor and tutor, Code Samurai",
    detail: "Mentoring fellow CS students",
  },
  {
    title: "Data Visualization and Analytics Intern, GSSRP",
    detail: "Led daily labs under Dr. Ching-yu Huang, teaching 5 high school students SQL, PHP, MySQL, JavaScript, and Google Charts, from raw datasets to deployed database-driven sites",
    completed: "Completed · Jul 6 to 30, 2026",
  },
];

const education = [
  {
    program: "B.S. Computer Science, Kean University",
    detail: "Expected May 2027. Dean's List, Spring 2024 and Fall 2025.",
  },
  {
    program: "CRA UR2PhD",
    detail: "Undergraduate research training program (CAHSI/CRA), faculty mentor Dr. Yan Ma, including the conference showcase in New Orleans.",
  },
  {
    program: "CodePath TIP103",
    detail: "Advanced Technical Interview Prep, completed.",
  },
];

export default function AboutPage() {
  return (
    <div className="container-site pt-36 pb-8 sm:pt-44">
      {/* Story */}
      <div className="grid gap-14 lg:grid-cols-12">
        <header className="lg:col-span-7">
          <Reveal immediate>
            <p className="eyebrow">The studio</p>
          </Reveal>
          <RevealLines
            immediate
            delay={0.1}
            as="h1"
            className="display-xl mt-6 font-semibold text-fg"
            lines={["Built in", "New Jersey.", "First in the family."]}
          />
          <Reveal immediate delay={0.45}>
            <div className="prose-measure mt-10 flex flex-col gap-5">
              <p>
                I&rsquo;m {site.fullName}, a first-generation college student
                from the Sayreville and Old Bridge area of New Jersey. {site.brand} is
                where the client work ships from: production websites and booking
                platforms for real businesses, the kind with owners who call when
                something breaks, which is exactly why I build things that
                don&rsquo;t.
              </p>
              <p>
                The other half of the week is research. I&rsquo;ve built database
                architectures and visualization layers to study whether jobs
                actually guarantee living wages, and run HCI studies on how AI
                coaching tools shape student argumentation. That rigor is the
                reason the client work holds up.
              </p>
              <p>
                What&rsquo;s next: an MS in Computer Science, and more work at the
                intersection of building tools and studying how people actually
                use them.
              </p>
            </div>
          </Reveal>
        </header>

        {/* Photo */}
        <div className="lg:col-span-5">
          <Reveal immediate delay={0.3}>
            {/* PLACEHOLDER: replace this block with the real photo.
                Drop it at /public/about/headshot.jpg and swap in:
                <Image src="/about/headshot.jpg" alt="Vincent Pronel" fill className="object-cover" /> */}
            <div
              role="img"
              aria-label={`Photo of ${site.fullName}, coming soon`}
              className="relative flex aspect-[4/5] items-end overflow-hidden rounded-[6px] border border-line bg-ink-800 p-6"
            >
              <div
                aria-hidden
                className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgb(0_229_255_/_0.12),transparent_60%)]"
              />
              <p className="relative font-mono text-[11px] tracking-[0.18em] text-fg-faint uppercase">
                Portrait / pending
              </p>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Roles */}
      <section aria-labelledby="roles-title" className="mt-32">
        <SectionHeading eyebrow="Roles" lines={["Five hats,", "worn this year."]} />
        <ul className="mt-12 flex flex-col divide-y divide-line border-y border-line">
          {roles.map((role, i) => (
            <li key={role.title}>
              <Reveal delay={i * 0.05}>
                <div className="grid gap-3 py-6 sm:grid-cols-12 sm:gap-8">
                  <span className="font-mono text-xs text-accent sm:col-span-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className={`text-lg font-semibold sm:col-span-4 ${role.completed ? "text-fg-soft" : "text-fg"}`}>
                    {role.title}
                  </p>
                  <div className="sm:col-span-7">
                    <p className="text-sm leading-relaxed text-fg-soft">{role.detail}</p>
                    {role.completed && (
                      <p className="mt-3 font-mono text-[11px] tracking-[0.14em] text-fg-faint uppercase">
                        {role.completed}
                      </p>
                    )}
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {/* Skills */}
      <section aria-labelledby="skills-title" className="mt-32">
        <SectionHeading eyebrow="Toolbox" lines={["The stack,", "organized."]} />
        <Reveal delay={0.1}>
          <div className="mt-12">
            <SkillsGrid />
          </div>
        </Reveal>
      </section>

      {/* Education */}
      <section aria-labelledby="education-title" className="mt-32">
        <SectionHeading eyebrow="Education and training" lines={["Programs that", "shaped the work."]} />
        <div className="mt-12 grid gap-12 lg:grid-cols-12">
          <ul className="flex flex-col divide-y divide-line border-y border-line lg:col-span-7">
            {education.map((item, i) => (
              <li key={item.program}>
                <Reveal delay={i * 0.06}>
                  <div className="py-6">
                    <p className="text-lg font-semibold text-fg">{item.program}</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-fg-soft">{item.detail}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>

          {/* New Orleans photo moment */}
          <div className="lg:col-span-5">
            <Reveal delay={0.15}>
              <p className="eyebrow">The New Orleans showcase · UR2PhD</p>
              {/* PLACEHOLDER: swap these three tiles for real photos from the
                  New Orleans UR2PhD showcase trip. Drop them in
                  /public/about/new-orleans-1.jpg (2, 3) and replace each div
                  with an <Image> of the same dimensions. */}
              <div className="mt-5 grid grid-cols-3 gap-3">
                {[1, 2, 3].map((n) => (
                  <div
                    key={n}
                    role="img"
                    aria-label={`New Orleans conference photo ${n}, coming soon`}
                    className="flex aspect-square items-end rounded-[6px] border border-dashed border-line-strong bg-ink-900 p-3"
                  >
                    <span className="font-mono text-[10px] tracking-[0.14em] text-fg-faint uppercase">
                      Photo 0{n}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
