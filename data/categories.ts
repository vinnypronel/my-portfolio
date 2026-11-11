export type Category = "research" | "freelance" | "leadership";

/**
 * The three work categories. On the dark system a category is carried by
 * its label alone (mono, tracked caps), never by a color: the single cyan
 * accent is reserved for interactive states.
 */
export interface CategoryMeta {
  key: Category;
  label: string;
  shortLabel: string;
  href: string;
  blurb: string;
}

export const categoryMeta: Record<Category, CategoryMeta> = {
  freelance: {
    key: "freelance",
    label: "Client Work",
    shortLabel: "Client",
    href: "/projects?cat=freelance",
    blurb:
      "Production sites and booking platforms for real businesses, designed, built, shipped, and maintained.",
  },
  research: {
    key: "research",
    label: "Research",
    shortLabel: "Research",
    href: "/research",
    blurb:
      "Data-driven and HCI research, from a 52-state economic analysis to an AI coaching study presented in New Orleans.",
  },
  leadership: {
    key: "leadership",
    label: "Hackathons & Leadership",
    shortLabel: "Leadership",
    href: "/projects?cat=leadership",
    blurb:
      "Competition builds, e-board leadership, mentorship, and teaching: the work that happens alongside the work.",
  },
};

export const categoryOrder: Category[] = ["freelance", "research", "leadership"];
