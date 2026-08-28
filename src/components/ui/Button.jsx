import { cn } from "../../lib/utils";

const variants = {
  primary:
    "bg-neutral-100 text-neutral-950 hover:bg-white shadow-[0_12px_30px_rgba(0,0,0,0.42)]",
  secondary:
    "border border-white/15 bg-white/[0.03] text-white hover:border-neutral-100/50 hover:bg-white/[0.07]",
  ghost:
    "text-neutral-300 hover:bg-white/[0.06] hover:text-white",
};

const sizes = {
  sm: "px-4 py-2 text-xs",
  md: "px-5 py-3 text-sm",
  lg: "px-6 py-3.5 text-base",
};

export default function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className,
  target,
  rel,
  type = "button",
  ...props
}) {
  const classes = cn(
    "group inline-flex max-w-full items-center justify-center gap-2 rounded-full text-center font-semibold tracking-tight transition duration-300",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-100 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950",
    variants[variant],
    sizes[size],
    className
  );

  if (href) {
    const isExternal =
      href.startsWith("http://") ||
      href.startsWith("https://") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:");

    const safeTarget = target || (isExternal ? "_blank" : undefined);
    const safeRel =
      rel || safeTarget === "_blank" ? "noopener noreferrer" : undefined;

    return (
      <a
        href={href}
        className={classes}
        target={safeTarget}
        rel={safeRel}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
}