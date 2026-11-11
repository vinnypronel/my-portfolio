export type Category = "research" | "freelance" | "leadership";

/**
 * The three category accent systems. Tailwind needs literal class names,
 * so every color treatment a category can receive is enumerated here and
 * reused sitewide (tags, filter pills, card accents, section markers).
 */
export interface CategoryMeta {
  key: Category;
  label: string;
  shortLabel: string;
  href: string;
  blurb: string;
  /** text color on light surfaces */
  text: string;
  /** solid background (used for accent bars, dots, active pills) */
  bg: string;
  /** soft tinted background */
  bgSoft: string;
  /** tinted border for cards/tags */
  border: string;
  /** hover border for cards */
  borderHover: string;
  /** bright text variant for dark (ink) surfaces */
  textBright: string;
  /** looping hover clip + its poster frame (see components/BackgroundVideo) */
  video: string;
  videoPoster: string;
}

export const categoryMeta: Record<Category, CategoryMeta> = {
  research: {
    key: "research",
    label: "Research",
    shortLabel: "Research",
    href: "/research",
    blurb:
      "Data-driven and HCI research, from a 52-state economic analysis to an AI debate-coaching study presented in New Orleans.",
    text: "text-research",
    bg: "bg-research",
    bgSoft: "bg-research/8",
    border: "border-research/30",
    borderHover: "hover:border-research/60",
    textBright: "text-research-bright",
    video: "/video/cat-research.mp4",
    videoPoster: "/video/cat-research.jpg",
  },
  freelance: {
    key: "freelance",
    label: "Freelance & Client Work",
    shortLabel: "Freelance",
    href: "/projects?cat=freelance",
    blurb:
      "Real businesses, real deadlines, real production sites: built, shipped, and maintained for clients across New Jersey.",
    text: "text-freelance",
    bg: "bg-freelance",
    bgSoft: "bg-freelance/8",
    border: "border-freelance/30",
    borderHover: "hover:border-freelance/60",
    textBright: "text-freelance-bright",
    video: "/video/cat-freelance.mp4",
    videoPoster: "/video/cat-freelance.jpg",
  },
  leadership: {
    key: "leadership",
    label: "Hackathons & Leadership",
    shortLabel: "Leadership",
    href: "/projects?cat=leadership",
    blurb:
      "Competition builds, e-board leadership, mentorship, and teaching: the work that happens alongside the work.",
    text: "text-leadership",
    bg: "bg-leadership",
    bgSoft: "bg-leadership/8",
    border: "border-leadership/30",
    borderHover: "hover:border-leadership/60",
    textBright: "text-leadership-bright",
    video: "/video/cat-leadership.mp4",
    videoPoster: "/video/cat-leadership.jpg",
  },
};

export const categoryOrder: Category[] = ["research", "freelance", "leadership"];
