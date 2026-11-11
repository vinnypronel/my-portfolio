"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { useRef } from "react";
import { site } from "@/data/site";
import { Reveal, RevealLines } from "@/components/Reveal";
import Image from "next/image";

/**
 * A focused introduction: one person, one portrait, and one clear offer.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const copyY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-12%"]);

  return (
    <section ref={ref} className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-void">
      <motion.div
        style={{ y: copyY }}
        className="container-site flex flex-1 items-center py-32 sm:py-40"
      >
        <div className="grid w-full items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal immediate delay={0.2} y={16}>
              <p className="eyebrow flex flex-wrap items-center gap-3 text-fg-soft"><span className="text-fg">{site.handle}</span><span aria-hidden className="h-px w-6 bg-line-strong" /><span>Independent web developer</span><span aria-hidden className="h-px w-6 bg-line-strong" /><span>{site.location}</span></p>
            </Reveal>
            <RevealLines immediate delay={0.35} as="h1" className="display-xl mt-8 max-w-[11ch] font-semibold text-fg" lines={["Websites that", "work hard."]} />
            <p className="prose-measure">
              I&rsquo;m {site.fullName}, an independent web developer building thoughtful, high-performing websites and platforms for people with something worth putting online.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact" className="btn btn-primary">
                Start a project
              </Link>
              <Link href="/projects" className="btn btn-ghost">
                See the work
              </Link>
            </div>
          </div>
          <Reveal immediate delay={0.45} y={16} className="lg:col-span-5"><div className="relative mx-auto aspect-[4/5] w-full max-w-[430px] overflow-hidden rounded-[6px] border border-line bg-ink-800"><Image src="/about/headshot.jpg" alt={`${site.fullName}, independent web developer`} fill priority sizes="(max-width: 1024px) 90vw, 36vw" className="object-cover object-top" /></div></Reveal>
        </div>
      </motion.div>
    </section>
  );
}
