import { skillGroups } from "@/data/skills";

const iconNames: Record<string, string> = {
  JavaScript: "javascript", TypeScript: "typescript", PHP: "php", Python: "python", React: "react", "Next.js": "nextdotjs", "Tailwind CSS": "tailwindcss", "Node.js / Express": "nodedotjs", MySQL: "mysql", "Supabase (Postgres)": "supabase", "Git / GitHub": "github", Figma: "figma", Vercel: "vercel", "Google Charts": "google", "Framer Motion": "framer", GSAP: "greensock",
};

/** Categorized skills with visual marks so the stack reads at a glance. */
export function SkillsGrid() {
  return (
    <div className="grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      {skillGroups.map((group) => {
        const exploring = group.label === "Currently exploring";
        return (
          <div key={group.label} className="border-t border-line pt-5">
            <h3 className={`eyebrow ${exploring ? "text-accent" : ""}`}>{group.label}</h3>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {group.skills.map((skill) => (
                <li key={skill} className="flex items-center gap-3 rounded border border-line bg-ink-900/60 px-3 py-2.5 text-sm text-fg">
                  {iconNames[skill] ? <img src={`https://cdn.simpleicons.org/${iconNames[skill]}`} alt="" aria-hidden className="h-5 w-5 opacity-85" /> : <span aria-hidden className="grid h-5 w-5 place-items-center rounded-sm bg-accent/15 font-mono text-[10px] text-accent">+</span>}
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
