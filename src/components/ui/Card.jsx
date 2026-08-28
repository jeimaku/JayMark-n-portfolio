import { cn } from "../../lib/utils";

export default function Card({ children, className }) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.035] p-6 shadow-2xl shadow-black/20 backdrop-blur-xl",
        "transition duration-300 hover:-translate-y-1 hover:border-neutral-100/30 hover:bg-white/[0.055]",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neutral-100/60 to-transparent" />
        <div className="absolute -right-24 -top-24 h-48 w-48 rounded-full bg-neutral-100/10 blur-3xl" />
      </div>

      <div className="relative z-10">{children}</div>
    </div>
  );
}