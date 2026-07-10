import { cn } from "../../lib/utils";

export default function Section({
  children,
  id,
  className,
  spacing = "default",
  optimize = true,
}) {
  const spacingClasses = {
    default: "py-20 md:py-28 lg:py-32",
    compact: "py-16 md:py-20 lg:py-24",
    hero: "min-h-screen py-28 md:py-32",
  };

  const shouldOptimize = optimize && spacing !== "hero";

  return (
    <section
      id={id}
      className={cn(
        "relative w-full overflow-hidden",
        shouldOptimize && "content-auto-section",
        spacingClasses[spacing],
        className
      )}
    >
      {children}
    </section>
  );
}