export interface SkillGroup {
  label: string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    label: "Languages",
    skills: ["JavaScript", "TypeScript", "PHP", "SQL", "Python", "C"],
  },
  {
    label: "Frontend",
    skills: ["React", "Next.js", "Tailwind CSS", "GSAP", "Framer Motion"],
  },
  {
    label: "Backend & Data",
    skills: ["Node.js / Express", "MySQL", "Supabase (Postgres)"],
  },
  {
    label: "Tools & Platforms",
    skills: [
      "Git / GitHub",
      "Figma",
      "Vercel",
      "Sanity.io",
      "Google Charts",
      "FileZilla",
    ],
  },
  {
    label: "Currently exploring",
    skills: ["Claude Code", "Antigravity", "Agentic dev workflows"],
  },
];
