"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { site } from "@/data/site";
import { HeroVideo } from "@/components/video/HeroVideo";
import { Reveal, RevealLines } from "@/components/Reveal";
import { Marquee } from "@/components/Marquee";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Full-viewport hero on the inverted topographic loop. The clip drifts and
 * dims as the visitor scrolls, so the next section reads cleanly.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "18%"]);
  const videoOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.15]);
  const copyY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-12%"]);

  return (
    <section ref={ref} className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-void">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ y: videoY, opacity: videoOpacity }}
      >
        <HeroVideo
          src="/video/hero-topo.mp4"
          mobileSrc="/video/hero-topo-mobile.mp4"
          poster="/video/hero-topo.webp"
          className="opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-void/60 via-transparent to-void" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,rgb(0_229_255_/_0.10),transparent_55%)]" />
      </motion.div>

      <motion.div
        style={{ y: copyY }}
        className="container-site flex flex-1 flex-col justify-end pt-32 pb-12 sm:pb-16"
      >
        <Reveal immediate delay={0.2} y={16}>
          <p className="eyebrow flex flex-wrap items-center gap-3 text-fg-soft">
            <span className="text-fg">{site.handle}</span>
            <span aria-hidden className="h-px w-6 bg-line-strong" />
            <span>Digital studio</span>
            <span aria-hidden className="h-px w-6 bg-line-strong" />
            <span>{site.location}</span>
          </p>
        </Reveal>

        <RevealLines
          immediate
          delay={0.35}
          as="h1"
          className="display-xl mt-8 max-w-[14ch] font-semibold text-fg"
          lines={["Websites that sell.", "Platforms that run", "themselves."]}
        />

        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end">
          <Reveal immediate delay={0.75} y={16} className="lg:col-span-6">
            <p className="prose-measure">
              {site.brand} designs and builds production Next.js sites and
              booking platforms for real businesses, with the rigor of published
              research behind every decision.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact" className="btn btn-primary">
                Start a project
              </Link>
              <Link href="/projects" className="btn btn-ghost">
                See the work
              </Link>
            </div>
          </Reveal>

          <motion.div
            className="hidden items-center justify-end gap-4 font-mono text-[11px] tracking-[0.18em] text-fg-faint uppercase lg:col-span-6 lg:flex"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2, ease }}
          >
            <span>Scroll</span>
            <span className="relative h-12 w-px overflow-hidden bg-line-strong">
              <motion.span
                aria-hidden
                className="absolute inset-x-0 top-0 h-1/2 bg-accent"
                animate={reduce ? undefined : { y: ["-100%", "200%"] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              />
            </span>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="relative border-t border-line bg-void/40 py-5 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.1, ease }}
      >
        <div className="container-site flex items-center gap-8">
          <p className="eyebrow shrink-0">Trusted by</p>
          <Marquee items={site.clients} label="Clients and organizations" className="flex-1" />
        </div>
      </motion.div>
    </section>
  );
}
