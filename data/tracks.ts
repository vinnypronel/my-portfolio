/**
 * The three service tracks on the home page. Each one owns a graded silk
 * clip (see scripts/process-videos.ps1) that plays on hover or in view.
 */
export interface Track {
  index: string;
  title: string;
  blurb: string;
  points: string[];
  href: string;
  video: string;
  poster: string;
}

export const tracks: Track[] = [
  {
    index: "01",
    title: "Websites for businesses",
    blurb:
      "Marketing sites that owners update themselves. Designed from scratch, built in Next.js, live on a custom domain.",
    points: ["Brand system", "Custom CMS edit mode", "SEO and performance"],
    href: "/projects?cat=freelance",
    video: "/video/track-web.mp4",
    poster: "/video/track-web.webp",
  },
  {
    index: "02",
    title: "Booking and product platforms",
    blurb:
      "Scheduling, payments, and accounts that replace the manual process, so the business runs without a developer in the loop.",
    points: ["Real-time availability", "Payments", "Supabase and Postgres"],
    href: "/projects/aio-training",
    video: "/video/track-platforms.mp4",
    poster: "/video/track-platforms.webp",
  },
  {
    index: "03",
    title: "Research and data",
    blurb:
      "HCI and data analysis work, presented at GMiS and the UR2PhD showcase. The same rigor that goes into a study goes into every build.",
    points: ["HCI study design", "Data pipelines", "Visualization"],
    href: "/research",
    video: "/video/track-research.mp4",
    poster: "/video/track-research.webp",
  },
];
