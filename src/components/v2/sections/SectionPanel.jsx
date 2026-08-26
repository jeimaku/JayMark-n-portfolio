export default function SectionPanel({
  as: Component = "div",
  children,
  className = "",
}) {
  return (
    <Component
      className={[
        "ambient-surface relative overflow-hidden rounded-3xl",
        "border border-white/10",
        className,
      ].join(" ")}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.055),transparent_20rem)]"
      />

      <div className="relative">
        {children}
      </div>
    </Component>
  );
}
