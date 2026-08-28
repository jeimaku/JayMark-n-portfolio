export default function SectionDivider({
  className = "",
}) {
  return (
    <div
      aria-hidden="true"
      className={[
        "pointer-events-none absolute inset-x-0 top-0",
        "mx-auto h-px max-w-[90rem]",
        "bg-gradient-to-r from-transparent",
        "via-neutral-100/15 to-transparent",
        className,
      ].join(" ")}
    />
  );
}