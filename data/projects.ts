import type { Category } from "./categories";

export type ProjectStatus = "in-progress" | "planned";

export interface ProjectLink {
  label: string;
  href: string;
}

export interface Project {
  slug: string;
  title: string;
  oneLiner: string;
  category: Category;
  featured?: boolean;
  status?: ProjectStatus;
  timeframe?: string;
  client?: string;
  role: string;
  team?: string;
  stack: string[];
  problem: string;
  built: string[];
  outcome: string[];
  links: ProjectLink[];
  /**
   * PLACEHOLDER: set `image` to a real screenshot path once you have one,
   * e.g. image: "/projects/days-ice-cream.png" (drop the file in /public/projects/).
   * Until then the card/detail pages render a designed placeholder visual.
   */
  image?: string;
  imageAlt?: string;
  /** For research projects: anchor on /research with the full narrative */
  researchAnchor?: string;
}

export const projects: Project[] = [
  // ── Research ────────────────────────────────────────────────
  {
    slug: "jobs-vs-wages",
    title: "Jobs vs. Wages",
    oneLiner:
      "Does having a job guarantee a living wage? A 52-state economic analysis built on MySQL, PHP, and Google Charts.",
    category: "research",
    timeframe: "IUSE Scholars Academy · 2025–26 academic year",
    role: "Solo researcher, advised by Prof. Pauline Wang",
    stack: ["MySQL", "SQL", "PHP", "Google Charts"],
    problem:
      "Employment rates are treated as a proxy for economic health, but do jobs alone actually predict income? This project tested that assumption across all 52 U.S. states and territories.",
    built: [
      "A MySQL database architecture with three purpose-built data marts: state_data, state_summary, and gny_county_data",
      "An ETL pipeline from the SimpleMaps uszips 2022 dataset (52 states and territories), aggregating 33,000 ZIP-level records into 3,203 county rows",
      "A PHP + Google Charts visualization layer producing bar and scatter charts",
      "Pearson correlation analysis across four socioeconomic attributes",
      "A full student research journal and Excel analysis workbook documenting the methodology",
    ],
    outcome: [
      "Unemployment rate explains only ~14% of income variation (r = −0.3753), so a job alone is a weak predictor of wages",
      "Poverty rate is a far stronger predictor (r = −0.7366)",
      "College education rate is the strongest predictor of income (r = 0.7872)",
      "Puerto Rico identified as the primary statistical outlier",
      "Presented at the GMiS Research Posters Competition",
    ],
    links: [
      // PLACEHOLDER: add a GitHub repo link here if/when you make one public, e.g.
      // { label: "View code on GitHub", href: "https://github.com/YOUR-GITHUB-USERNAME/jobs-vs-wages" },
    ],
    researchAnchor: "/research#jobs-vs-wages",
  },
  {
    slug: "debate-coach",
    title: "Debate Coach",
    oneLiner:
      "How do different AI coaching configurations shape argumentation? A within-subjects HCI study that uncovered a 100% citation fabrication rate.",
    category: "research",
    featured: true,
    timeframe: "CRA UR2PhD · 2025–26 academic year",
    role: "Team researcher",
    team: "With Kiana Nunez and Matthew Ngoy · faculty mentor Dr. Yan Ma · grad mentor Karina Ponze",
    stack: ["GPT-4o-mini", "HCI study design", "Within-subjects methodology"],
    problem:
      "AI coaching tools are being handed to students with little evidence about how their configuration changes the advice, or the risks. This study compared three configurations of the same model head-to-head.",
    built: [
      "A within-subjects study design testing three AI coaching conditions on argumentation",
      "Three GPT-4o-mini configurations: vanilla, prompted devil's advocate, and fine-tuned",
      "A structured evaluation of coaching output quality, including citation verification",
    ],
    outcome: [
      "100% citation fabrication rate identified in Condition C (the fine-tuned configuration): every citation it produced was fabricated",
      "Presented at the UR2PhD conference showcase in New Orleans",
    ],
    links: [
      // PLACEHOLDER: add a GitHub repo or paper/poster link here when shareable.
    ],
    researchAnchor: "/research#debate-coach",
  },
  {
    slug: "summer-data-code-visualization",
    title: "Java Execution Visualizer",
    oneLiner:
      "An AI-assisted interactive Java execution visualizer for undergraduate CS education, with a live stack and heap renderer.",
    category: "research",
    status: "in-progress",
    timeframe: "CRA UR2PhD-REU · June 2026 to present",
    role: "Undergraduate Research Fellow, advised by Dr. Yan Ma",
    stack: ["Java", "JDI", "Google Gemini"],
    problem:
      "Students learning Java have to hold the stack and the heap in their heads from static course materials. This project renders execution as it happens, and tests whether seeing it actually helps.",
    built: [
      "A trace-ingestion pipeline that parses JDI and java jail execution traces",
      "A live stack and heap renderer that draws reference arrows between values",
      "Google Gemini integration producing trace-aligned explanations of each step",
      "An IRB-approved pilot study measuring learning outcomes and cognitive load against static materials",
    ],
    outcome: [
      "In progress: the pilot study is running, and results will be published here once the data is in",
    ],
    links: [],
    researchAnchor: "/research#summer-visualization",
  },

  // ── Freelance / Client Work ─────────────────────────────────
  {
    slug: "days-ice-cream",
    title: "Day's Ice Cream",
    oneLiner:
      "A live production site for a family-run ice cream shop, with a custom admin edit mode so the owner updates content himself.",
    category: "freelance",
    featured: true,
    timeframe: "Mar 2026 to May 2026",
    client: "Day's Ice Cream (family-owned shop)",
    role: "Freelance designer & developer (solo)",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "Vercel"],
    problem:
      "A family ice cream business needed a real web presence, one the owner could keep current himself without calling a developer every time the menu changed.",
    built: [
      "A complete marketing site designed and built from scratch in Next.js + TypeScript",
      "A custom admin edit mode backed by Supabase, so non-technical owners update live site content straight from a relational database",
      "Fully responsive layout built with Tailwind CSS",
      "Production deployment on Vercel with a custom domain",
    ],
    outcome: [
      "Live in production at daysicecream.com, handling 600+ monthly visitors",
      "The owner updates all site content independently, with no developer intervention",
    ],
    links: [
      { label: "Visit the live site", href: "https://daysicecream.com" },
      // PLACEHOLDER: add a GitHub repo link here if you make the code public.
    ],
    imageAlt: "Screenshot of the Day's Ice Cream website homepage",
  },
  {
    slug: "adzio",
    title: "Adzio",
    oneLiner:
      "A co-founded web agency with a live site built to sell, featuring custom GSAP animation and button systems throughout.",
    category: "freelance",
    featured: true,
    timeframe: "Feb 2026 to Aug 2026",
    client: "Own agency",
    role: "Co-founder & developer",
    team: "Co-founded with Devyn Schroeder and Anton Veliu",
    stack: [
      "Next.js",
      "Tailwind CSS",
      "Framer Motion",
      "GSAP",
      "Custom animation systems",
    ],
    problem:
      "An agency site has to prove its own pitch: if the site selling web work doesn't feel premium, nothing else matters.",
    built: [
      "The live agency website with custom GSAP animation sequences",
      "A bespoke animated button and interaction system built from scratch",
      "VSL (video sales letter) production supporting the agency's outreach",
    ],
    outcome: [
      "Live agency site in production",
      "VSL production pipeline established for client outreach",
    ],
    links: [{ label: "Visit the live site", href: "https://adzio.io" }],
    imageAlt: "Screenshot of the Adzio agency website",
  },
  {
    slug: "tedis-hair-studio",
    title: "Tedi's Hair Studio",
    oneLiner:
      "A full rebuild for a Matawan, NJ salon: a forest green brand system and custom booking to replace Booksy.",
    category: "freelance",
    status: "in-progress",
    client: "Tedi's Hair Studio, Matawan NJ",
    role: "Freelance designer & developer (solo)",
    stack: ["Next.js", "Brand system design", "Custom booking system"],
    problem:
      "The salon was renting its booking flow from Booksy, paying for a generic experience that didn't match the brand and didn't belong to them.",
    built: [
      "A full site rebuild specification, completed and client-approved scope",
      "A forest green brand system designed for the studio",
      "A custom booking flow to replace the Booksy dependency",
      "The Next.js build, in progress now",
    ],
    outcome: [
      "In progress: spec and brand system are locked, the build is underway",
    ],
    links: [
      // PLACEHOLDER: add mockup/spec links or the live site once the build ships.
    ],
    imageAlt: "Tedi's Hair Studio rebuild mockups",
  },
  {
    slug: "aio-training",
    title: "AIO Training",
    oneLiner:
      "A full-stack fitness booking platform that replaced manual scheduling, shipped in two weeks and live in production.",
    category: "freelance",
    featured: true,
    timeframe: "June 2026 to July 2026",
    client: "AIO Training (fitness training business)",
    role: "Freelance developer (solo)",
    stack: ["Next.js", "Tailwind CSS", "Supabase", "Vercel"],
    problem:
      "Sessions were being scheduled by hand. The business needed trainers to publish real-time availability and clients to book and pay for sessions themselves, with no one in the middle.",
    built: [
      "A full-stack booking platform replacing the manual scheduling process",
      "Real-time availability publishing for trainers, with clients booking directly against it",
      "Integrated payment processing so clients pay for sessions at the point of booking",
      "A Supabase schema architected for user profiles and session management",
      "Production deployment on Vercel at trainingaio.com",
    ],
    outcome: [
      "Shipped within 2 weeks and delivered, live in production at trainingaio.com",
      "The business runs its own bookings and payments end to end, with no developer in the loop",
    ],
    links: [{ label: "Visit the live site", href: "https://trainingaio.com" }],
    imageAlt: "Screenshot of the AIO Training booking platform",
  },

  // ── Hackathons & Leadership ─────────────────────────────────
  {
    slug: "sonder-figbuild",
    title: "Sonder · FigBuild 2026",
    oneLiner:
      "A trauma-informed identity hub app for people with DID, prototyped in Figma and placed at FigBuild 2026.",
    category: "leadership",
    timeframe: "FigBuild 2026",
    role: "Designer & prototyper",
    stack: ["Figma", "Prototyping", "Trauma-informed design"],
    problem:
      "People with dissociative identity disorder (DID) lack digital tools designed around their actual needs. Sonder prototyped an identity hub built trauma-informed from the ground up.",
    built: [
      "A complete app prototype designed and built in Figma for the FigBuild 2026 competition",
      "Trauma-informed interaction patterns and flows designed specifically for DID users",
    ],
    outcome: ["Placed in the FigBuild 2026 competition"],
    links: [
      // PLACEHOLDER: add the public Figma prototype link if you want it viewable.
    ],
    imageAlt: "Sonder app prototype screens",
  },
  {
    slug: "howtoob",
    title: "HowToob",
    oneLiner:
      "A YouTube-style learning platform built as an object-oriented team project, with AI-generated quizzes from uploaded lessons.",
    category: "leadership",
    // PLACEHOLDER: add your teammates' names and your specific contribution
    // (which parts you owned) so this reads as your work rather than the
    // team's in general. The repo sits under a teammate's account.
    role: "Developer, team course project",
    stack: [
      "React",
      "Vite",
      "Flask",
      "Python",
      "PostgreSQL",
      "Docker",
    ],
    problem:
      "A course project to build a full learning platform end to end: video lessons, accounts, and a way to check that people actually learned something.",
    built: [
      "A Flask backend paired with a React and Vite frontend, served through Flask as a single deployment",
      "AI quiz generation from uploaded lesson media, with transcript caching and video frame sampling",
      "Role-based access with user roles and subscription tiers",
      "Database migrations through Flask-Migrate and Alembic, with SQLite for local development and PostgreSQL in production",
      "Docker containerization targeting DigitalOcean App Platform",
    ],
    outcome: [
      "Delivered as a working MVP for the course, with the full stack running from a single URL",
    ],
    links: [
      { label: "View the repo on GitHub", href: "https://github.com/loraencb/HowToob" },
    ],
    imageAlt: "HowToob learning platform screens",
  },
  {
    slug: "wicys-kean-website",
    title: "WiCyS Kean Chapter Website",
    oneLiner:
      "The official Kean University WiCyS chapter site: an events and announcements system plus a resource hub, built and maintained in-house.",
    category: "leadership",
    status: "in-progress",
    timeframe: "Jan 2026 to present",
    role: "Lead Web Developer, WiCyS Kean e-board",
    stack: ["Next.js", "REST API integrations"],
    problem:
      "The Kean Women in CyberSecurity chapter needs an official web home for events, membership, and visibility on campus.",
    built: [
      "The chapter's official full-stack website, built and maintained end to end",
      "An events and announcements system the e-board updates as the semester runs",
      "A resource hub collecting chapter materials in one place",
      "REST API integrations feeding the events, announcements, and resource content",
      "Deployment on production-level infrastructure",
    ],
    outcome: [
      "In progress: the events and announcements system and the resource hub are the current shipping focus",
      "Maintained continuously since January 2026 as the chapter's official site",
    ],
    links: [
      // No public URL yet; add the live link once the chapter site is announced.
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacentProjects(slug: string): {
  prev: Project | undefined;
  next: Project | undefined;
} {
  const i = projects.findIndex((p) => p.slug === slug);
  return {
    prev: i > 0 ? projects[i - 1] : projects[projects.length - 1],
    next: i < projects.length - 1 ? projects[i + 1] : projects[0],
  };
}

/** Home page order: client work leads, the strongest research study closes. */
const featuredOrder = ["days-ice-cream", "aio-training", "adzio", "debate-coach"];
export const featuredProjects = featuredOrder
  .map((slug) => projects.find((p) => p.slug === slug))
  .filter((p): p is Project => Boolean(p));
