import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { SkillsGrid } from "@/components/SkillsGrid";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "First-generation college student from Parlin, NJ, juggling research, freelance client work, tutoring, and leadership roles at Kean University.",
  openGraph: {
    title: "About · Vinny",
    description:
      "First-generation college student from Parlin, NJ: researcher, freelance developer, mentor, and e-board leader at Kean.",
  },
};

/**
 * Roles held this year. Active ones carry no marker; anything finished gets a
 * `completed` label so a wrapped-up role never reads as if it's still running.
 * Ordered active-first so the live work leads.
 */
const roles: { title: string; detail: string; completed?: string }[] = [
  {
    title: "Researcher · IUSE Scholars Academy",
    detail: "Data-driven economic research, advised by Prof. Pauline Wang",
  },
  {
    title: "Lead Web Developer · Kean WiCyS",
    detail:
      "E-board role; building and maintaining the chapter's official site, its events and announcements system, and its resource hub",
  },
  {
    title: "Peer mentor & tutor · Code Samurai",
    detail: "Mentoring fellow CS students",
  },
  {
    title: "Data Visualization & Analytics Intern · GSSRP",
    detail:
      "Led daily labs under Dr. Ching-yu Huang, teaching 5 high school students SQL, PHP, MySQL, JavaScript, and Google Charts, taking them from raw datasets to deployed database-driven sites",
    completed: "Completed · Jul 6 to 30, 2026",
  },
];

const education = [
  {
    program: "CRA UR2PhD",
    detail:
      "Undergraduate research training program (CAHSI/CRA), faculty mentor Dr. Yan Ma, including the conference showcase in New Orleans.",
  },
  {
    program: "CodePath TIP103",
    detail: "Advanced Technical Interview Prep, completed.",
  },
];

export default function AboutPage() {
  return (
    <div className="container-site pt-16 pb-8 sm:pt-24">
      {/* Story */}
      <div className="grid gap-14 lg:grid-cols-12">
        <header className="lg:col-span-7">
          <Reveal>
            <p className="eyebrow">About</p>
            <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-6xl">
              Built in New Jersey.{" "}
              <em className="text-accent">First in the family.</em>
            </h1>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="prose-measure mt-7 flex flex-col gap-5">
              <p>
                I&rsquo;m {site.name}, a first-generation college student from
                the Sayreville/Old Bridge (Parlin) area of New Jersey. Right
                now I&rsquo;m juggling four things at once: academic research,
                freelance client work, tutoring, and leadership roles at Kean
                University. The throughline is that all of it ships.
              </p>
              <p>
                On the research side, I&rsquo;ve built database architectures
                and visualization layers to study whether jobs actually
                guarantee living wages, and run HCI studies on how AI coaching
                tools shape student argumentation. On the client side, I design
                and build production websites for real businesses, the kind
                with owners who call when something breaks, which is exactly
                why I build things that don&rsquo;t.
              </p>
              <p>
                What&rsquo;s next: an MS in Computer Science, and more work at
                the intersection of building tools and studying how people
                actually use them.
              </p>
            </div>
          </Reveal>
        </header>

        {/* Photo */}
        <div className="lg:col-span-5">
          <Reveal delay={0.2}>
            {/* PLACEHOLDER: replace this block with your real photo.
                Drop it at /public/about/headshot.jpg and swap in:
                <Image src="/about/headshot.jpg" alt="Vinny" fill className="object-cover" /> */}
            <div
              role="img"
              aria-label="Photo of Vinny, coming soon"
              className="relative flex aspect-[4/5] items-center justify-center overflow-hidden rounded-2xl border hairline bg-paper-deep"
            >
              <div className="text-center">
                <span className="font-display text-7xl font-semibold text-ink/15">
                  V.
                </span>
                <p className="mt-3 text-xs font-semibold tracking-[0.18em] uppercase text-ink-faint">
                  Photo coming soon
                </p>
              </div>
              <span
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-1.5 bg-gradient-to-r from-research via-freelance to-leadership"
              />
            </div>
          </Reveal>
        </div>
      </div>

      {/* Roles */}
      <section aria-labelledby="roles-title" className="mt-24">
        <Reveal>
          <p className="eyebrow">Roles</p>
          <h2 id="roles-title" className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Four hats, worn this year.
          </h2>
        </Reveal>
        <ul className="mt-10 grid gap-5 sm:grid-cols-2">
          {roles.map((role, i) => (
            <li key={role.title}>
              <Reveal delay={i * 0.08} className="h-full">
                <div
                  className={`flex h-full flex-col rounded-2xl border p-6 shadow-card ${
                    role.completed
                      ? "border-line bg-paper-deep/40"
                      : "border-line bg-cream"
                  }`}
                >
                  <p className="font-display text-lg font-semibold">{role.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                    {role.detail}
                  </p>
                  {role.completed && (
                    <p className="mt-4 text-[11px] font-semibold tracking-[0.14em] uppercase text-ink-faint">
                      {role.completed}
                    </p>
                  )}
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {/* Skills */}
      <section aria-labelledby="skills-title" className="mt-24">
        <Reveal>
          <p className="eyebrow">Skills</p>
          <h2 id="skills-title" className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            The toolbox, organized.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-10 rounded-2xl border hairline bg-paper-deep/50 p-8 sm:p-10">
            <SkillsGrid />
          </div>
        </Reveal>
      </section>

      {/* Education & Training */}
      <section aria-labelledby="education-title" className="mt-24">
        <Reveal>
          <p className="eyebrow">Education &amp; training</p>
          <h2 id="education-title" className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Programs that shaped the work.
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-10 lg:grid-cols-12">
          <ul className="flex flex-col gap-4 lg:col-span-7">
            {education.map((item, i) => (
              <li key={item.program}>
                <Reveal delay={i * 0.08}>
                  <div className="flex gap-5 rounded-2xl border border-line bg-cream p-6 shadow-card">
                    <span aria-hidden className="mt-1 size-2.5 shrink-0 rounded-full bg-accent" />
                    <div>
                      <p className="font-display text-lg font-semibold">{item.program}</p>
                      <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>

          {/* New Orleans photo moment */}
          <div className="lg:col-span-5">
            <Reveal delay={0.15}>
              <p className="text-sm font-semibold">
                The New Orleans showcase{" "}
                <span className="font-normal text-ink-soft">
                  · UR2PhD conference trip
                </span>
              </p>
              {/* PLACEHOLDER: swap these three tiles for real photos from the
                  New Orleans UR2PhD showcase trip. Drop them in
                  /public/about/new-orleans-1.jpg (2, 3) and replace each div
                  with an <Image> of the same dimensions. */}
              <div className="mt-4 grid grid-cols-3 gap-3">
                {[1, 2, 3].map((n) => (
                  <div
                    key={n}
                    role="img"
                    aria-label={`New Orleans conference photo ${n}, coming soon`}
                    className="flex aspect-square items-center justify-center rounded-xl border border-dashed border-leadership/40 bg-leadership/8"
                  >
                    <span className="font-display text-2xl text-leadership/40">
                      {n}
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-xs text-ink-faint">
                Photos from the trip land here.
              </p>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
