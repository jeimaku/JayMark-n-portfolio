import { cn } from "../../lib/utils";

export default function Badge({ children, className }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-neutral-100/20 bg-neutral-100/10 px-3 py-1 text-xs font-semibold text-neutral-100",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]",
        className
      )}
    >
      {children}
    </span>
  );
}