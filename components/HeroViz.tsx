"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * Animated hero visualization: a stylized scatter plot of the real
 * IUSE finding (college education rate vs. median income, r = 0.7872).
 * The r value is the actual result; dot positions are illustrative.
 * GSAP staggers the dots in, draws the trend line, then floats gently.
 * Fully static when the user prefers reduced motion.
 */

// Deterministic, correlated point cloud (x: education, y: income; SVG coords).
// One deliberate outlier (Puerto Rico) rendered in the freelance coral.
const POINTS: [number, number][] = [
  [64, 292], [82, 306], [95, 274], [108, 288], [120, 258],
  [134, 270], [148, 242], [160, 256], [172, 228], [186, 240],
  [198, 212], [210, 224], [222, 196], [236, 208], [248, 182],
  [260, 192], [272, 166], [286, 176], [298, 152], [310, 160],
  [322, 138], [336, 146], [348, 122], [360, 130], [372, 108],
  [386, 116], [398, 94], [410, 102], [424, 84], [436, 72],
];
const OUTLIER: [number, number] = [118, 330];

export function HeroViz() {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".viz-axis", { opacity: 0, duration: 0.5 })
        .from(
          ".viz-dot",
          {
            scale: 0,
            transformOrigin: "center center",
            y: 24,
            opacity: 0,
            duration: 0.6,
            stagger: 0.025,
          },
          "-=0.2"
        )
        .from(
          ".viz-trend",
          { strokeDashoffset: 560, duration: 1.1, ease: "power2.inOut" },
          "-=0.6"
        )
        .from(".viz-label", { opacity: 0, y: 10, duration: 0.5 }, "-=0.4")
        .from(".viz-outlier", { scale: 0, opacity: 0, transformOrigin: "center center", duration: 0.5 }, "-=0.3");

      // Gentle perpetual float
      gsap.to(svg, {
        y: -8,
        duration: 4,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
    }, svg);

    return () => ctx.revert();
  }, []);

  return (
    <figure aria-label="Scatter plot: college education rate strongly predicts median household income, correlation r equals 0.7872, with Puerto Rico marked as an outlier">
      <svg
        ref={ref}
        viewBox="0 0 500 400"
        className="w-full max-w-[520px]"
        role="presentation"
      >
        {/* Grid */}
        {[120, 180, 240, 300].map((y) => (
          <line key={y} x1="48" y1={y} x2="472" y2={y} stroke="var(--color-line)" strokeWidth="1" />
        ))}

        {/* Axes */}
        <line className="viz-axis" x1="48" y1="352" x2="472" y2="352" stroke="var(--color-ink-faint)" strokeWidth="1.5" />
        <line className="viz-axis" x1="48" y1="352" x2="48" y2="48" stroke="var(--color-ink-faint)" strokeWidth="1.5" />

        {/* Trend line */}
        <line
          className="viz-trend"
          x1="60"
          y1="304"
          x2="450"
          y2="66"
          stroke="var(--color-accent)"
          strokeWidth="2.5"
          strokeDasharray="560"
          strokeLinecap="round"
        />

        {/* Data points */}
        {POINTS.map(([cx, cy], i) => (
          <circle
            key={i}
            className="viz-dot"
            cx={cx}
            cy={cy}
            r="6"
            fill="var(--color-research)"
            fillOpacity={0.55 + (i % 3) * 0.15}
          />
        ))}

        {/* Puerto Rico outlier */}
        <g className="viz-outlier">
          <circle cx={OUTLIER[0]} cy={OUTLIER[1]} r="7" fill="var(--color-freelance)" />
          <text
            x={OUTLIER[0] + 14}
            y={OUTLIER[1] + 4}
            fontSize="12"
            fontWeight="600"
            fill="var(--color-freelance)"
          >
            PR (outlier)
          </text>
        </g>

        {/* Finding label */}
        <g className="viz-label">
          <rect x="290" y="292" width="182" height="64" rx="12" fill="var(--color-ink)" />
          <text x="308" y="320" fontSize="20" fontWeight="700" fill="var(--color-accent-bright)" fontFamily="var(--font-display)">
            r = 0.7872
          </text>
          <text x="308" y="340" fontSize="11" fill="var(--color-cream)" fillOpacity="0.75">
            education rate × median income
          </text>
        </g>

        {/* Axis labels */}
        <text x="260" y="384" fontSize="11" textAnchor="middle" fill="var(--color-ink-faint)" fontWeight="600" letterSpacing="0.1em">
          COLLEGE EDUCATION RATE
        </text>
        <text x="24" y="200" fontSize="11" textAnchor="middle" fill="var(--color-ink-faint)" fontWeight="600" letterSpacing="0.1em" transform="rotate(-90 24 200)">
          MEDIAN INCOME
        </text>
      </svg>
      <figcaption className="mt-3 text-xs text-ink-faint">
        From the IUSE Jobs vs. Wages analysis of 52 states &amp; territories.
        Illustrative scatter; the correlation is real.
      </figcaption>
    </figure>
  );
}
