import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { Reveal, RevealLines } from "@/components/Reveal";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a project with pronelweb: websites and booking platforms for businesses, research collaborations, or internships.",
  openGraph: {
    title: "Contact · pronelweb",
    description:
      "Start a project with pronelweb: websites and booking platforms for businesses, research collaborations, or internships.",
  },
};

export default function ContactPage() {
  return (
    <div className="container-site pt-36 pb-8 sm:pt-44">
      <div className="grid gap-16 lg:grid-cols-12">
        <header className="lg:col-span-5">
          <Reveal immediate>
            <p className="eyebrow">Contact</p>
          </Reveal>
          <RevealLines
            immediate
            delay={0.1}
            as="h1"
            className="display-xl mt-6 font-semibold text-fg"
            lines={["Let's build", "something that", "pays for itself."]}
          />
          <Reveal immediate delay={0.45}>
            <p className="prose-measure mt-8">
              Run a business and need a site that brings in customers, or a
              booking flow you own instead of rent? Start here. Research
              collaborations and internships are welcome too.
            </p>
          </Reveal>

          <Reveal immediate delay={0.55}>
            <dl className="mt-12 flex flex-col gap-6 border-t border-line pt-6">
              <div>
                <dt className="eyebrow">Email</dt>
                <dd className="mt-2">
                  <a href={`mailto:${site.email}`} className="link-sweep text-fg hover:text-accent">
                    {site.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="eyebrow">Elsewhere</dt>
                <dd className="mt-2 flex flex-wrap gap-x-6 gap-y-2">
                  <a href={site.socials.linkedin} target="_blank" rel="noopener noreferrer" className="link-sweep text-fg hover:text-accent">
                    LinkedIn &#8599;
                  </a>
                  <a href={site.socials.github} target="_blank" rel="noopener noreferrer" className="link-sweep text-fg hover:text-accent">
                    GitHub &#8599;
                  </a>
                  <a href={site.socials.instagram} target="_blank" rel="noopener noreferrer" className="link-sweep text-fg hover:text-accent">
                    Instagram &#8599;
                  </a>
                </dd>
              </div>
              <div>
                <dt className="eyebrow">Based in</dt>
                <dd className="mt-2 text-fg">{site.location}</dd>
              </div>
            </dl>
          </Reveal>
        </header>

        <div className="lg:col-span-6 lg:col-start-7">
          <Reveal immediate delay={0.4}>
            <div className="rounded-[6px] border border-line bg-ink-900 p-7 sm:p-10">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
