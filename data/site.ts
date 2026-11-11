/**
 * Sitewide constants. Everything marked PLACEHOLDER should be swapped
 * with real values before launch; nothing else references them directly.
 */
export const site = {
  name: "Vinny",
  fullName: "Vincent Pronel",
  role: "Full-Stack Developer & Researcher",
  positioning:
    "Full-stack developer and researcher who ships client work and studies how people use the tools he builds.",
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
   * (Deliberately not a Content-Disposition header: that would also stop
   * the /resume page from embedding the PDF inline.)
   */
  resumeDownloadName: "Vincent-Pronel-Resume.pdf",
} as const;
