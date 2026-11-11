import { skillGroups } from "@/data/skills";

/** Categorized skills: grouped list per PRD 6.6, not a flat cloud. */
export function SkillsGrid() {
  return (
    <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
      {skillGroups.map((group, i) => {
        const exploring = group.label === "Currently exploring";
        return (
          <div
            key={group.label}
            className={i === skillGroups.length - 1 ? "sm:col-span-2" : ""}
          >
            <h3 className="eyebrow">{group.label}</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <li
                  key={skill}
                  className={`rounded-lg border px-3 py-1.5 text-sm font-medium ${
                    exploring
                      ? "border-accent/25 bg-accent/8 text-accent-deep"
                      : "border-line bg-cream text-ink"
                  }`}
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
