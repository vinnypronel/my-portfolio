/**
 * Sitewide constants. Everything marked PLACEHOLDER should be swapped
 * with real values before launch; nothing else references them directly.
 */
export const site = {
  /** Studio brand, used for the wordmark, titles, and OG card */
  brand: "pronelweb",
  handle: "@pronelweb",
  name: "Vinny",
  fullName: "Vincent Pronel",
  role: "Digital studio",
  tagline: "Websites and platforms that earn their keep.",
  positioning:
    "pronelweb is the digital studio of Vincent Pronel: production Next.js sites and booking platforms for real businesses, backed by published HCI and data research.",
  email: "vinnypronel050@gmail.com",
  location: "New Jersey",
  // PLACEHOLDER: replace with your real production domain once deployed
  // (used for canonical URLs, sitemap, and Open Graph).
  url: "https://vinny-portfolio.vercel.app",
  socials: {
    github: "https://github.com/vinnypronel",
    linkedin: "https://www.linkedin.com/in/vincent-pronel/",
    instagram: "https://www.instagram.com/pronelweb/",
  },
  resumePath: "/resume.pdf",
  /**
   * Filename the visitor's browser saves the resume as. The `download`
   * attribute on same-origin links forces a save instead of an in-tab
   * preview, so recruiters get a clearly-named file in one click.
   */
  resumeDownloadName: "Vincent-Pronel-Resume.pdf",
  /** Names shown in the hero marquee. All real clients or orgs. */
  clients: [
    "Day's Ice Cream",
    "AIO Training",
    "Adzio",
    "Tedi's Hair Studio",
    "WiCyS Kean",
    "Kean University",
  ],
} as const;
