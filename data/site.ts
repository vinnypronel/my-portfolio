/**
 * Sitewide constants. Everything marked PLACEHOLDER should be swapped
 * with real values before launch; nothing else references them directly.
 */
export const site = {
  /** Personal brand, used for the wordmark, titles, and OG card */
  brand: "pronelweb",
  handle: "@pronelweb",
  name: "Vinny",
  fullName: "Vincent Pronel",
  role: "Independent web developer",
  tagline: "Websites and platforms that earn their keep.",
  positioning:
    "pronelweb is the independent web practice of Vincent Pronel: production websites and platforms for real businesses, backed by published HCI and data research.",
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
  /**
   * Resume variations, each tailored to a track. The first is the default
   * that the footer and nav link to. Files live in public/resume/; replace a
   * PDF in place and every link follows. The `download` attribute on
   * same-origin links forces a save instead of an in-tab preview.
   */
  resumes: [
    {
      key: "swe",
      label: "Software engineering",
      file: "/resume/Vincent-Pronel-Software-Engineering.pdf",
      downloadName: "Vincent-Pronel-Software-Engineering.pdf",
      blurb: "Full-stack delivery: five production client sites, the WiCyS chapter site, payments, and admin tooling, with the research platforms as engineering case studies.",
      focus: ["TypeScript, React, Next.js, Node.js", "Cloudflare Workers, D1, R2, Vercel, Supabase", "JDI and JavaParser tooling", "OpenAI and Gemini APIs"],
    },
    {
      key: "ai",
      label: "AI and ML",
      file: "/resume/Vincent-Pronel-AI-ML.pdf",
      downloadName: "Vincent-Pronel-AI-ML.pdf",
      blurb: "Model evaluation and human-subject studies: a GPT-4o mini fine-tuning pipeline, a three-condition evaluation framework, and an IRB-approved learning study.",
      focus: ["Supervised fine-tuning, JSONL datasets", "LLM-as-a-judge evaluation", "Prompt design, study design", "Python, TypeScript, SQL"],
    },
    {
      key: "data",
      label: "Data and databases",
      file: "/resume/Vincent-Pronel-Data.pdf",
      downloadName: "Vincent-Pronel-Data.pdf",
      blurb: "Schema design and analysis: population-weighted data marts, correlation analysis across 52 states and territories, and interactive Google Charts dashboards.",
      focus: ["SQL, MySQL, PostgreSQL, Supabase, D1", "Data marts, aggregation, normalization", "Scatter plots, trendlines, correlation matrices", "PHP, Python, JavaScript"],
    },
  ],
  resumePath: "/resume/Vincent-Pronel-Software-Engineering.pdf",
  resumeDownloadName: "Vincent-Pronel-Software-Engineering.pdf",
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
