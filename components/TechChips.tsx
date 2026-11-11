/** Tech-stack chips, used on project cards and detail pages. */
export function TechChips({
  stack,
  size = "sm",
}: {
  stack: string[];
  size?: "sm" | "md";
}) {
  if (stack.length === 0) return null;
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="Tech stack">
      {stack.map((tech) => (
        <li
          key={tech}
          className={`rounded-md border border-line bg-cream font-medium text-ink-soft ${
            size === "md" ? "px-3 py-1.5 text-sm" : "px-2.5 py-1 text-xs"
          }`}
        >
          {tech}
        </li>
      ))}
    </ul>
  );
}
