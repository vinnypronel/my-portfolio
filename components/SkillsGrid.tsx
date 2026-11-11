import { skillGroups } from "@/data/skills";

/** Categorized skills as mono lists, no chips. */
export function SkillsGrid() {
  return (
    <div className="grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      {skillGroups.map((group) => {
        const exploring = group.label === "Currently exploring";
        return (
          <div key={group.label} className="border-t border-line pt-5">
            <h3 className={`eyebrow ${exploring ? "text-accent" : ""}`}>{group.label}</h3>
            <ul className="mt-4 flex flex-col gap-1.5 text-[15px] text-fg">
              {group.skills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
