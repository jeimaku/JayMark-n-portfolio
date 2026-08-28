import { motion } from "motion/react";

export default function CreativeArtworkItem({
  artwork,
  duplicate = false,
  inactive = false,
  variant = "wall",
  onBlur,
  onFocus,
  onOpen,
  onPointerEnter,
  onPointerLeave,
}) {
  const isWallArtwork = variant === "wall";
  const liftMotion = isWallArtwork
    ? { y: -6, z: 34, scale: 1.03 }
    : { y: -4, scale: 1.018 };

  return (
    <li
      aria-hidden={duplicate || undefined}
      className="creative-artwork-placement min-w-0"
    >
      <motion.button
        type="button"
        tabIndex={duplicate ? -1 : undefined}
        aria-label={
          duplicate
            ? undefined
            : `Open ${artwork.title}, ${artwork.category}, ${artwork.group}`
        }
        onBlur={duplicate ? undefined : onBlur}
        onFocus={duplicate ? undefined : onFocus}
        onClick={() => onOpen?.(artwork.id)}
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
        whileHover={liftMotion}
        whileFocus={liftMotion}
        transition={{
          duration: 0.28,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{ aspectRatio: artwork.ratio ?? 1.5 }}
        className={[
          "creative-artwork group relative block w-full cursor-zoom-in overflow-hidden",
          "rounded-[1.15rem] border border-white/[0.14] bg-[#030712]/90 p-1.5",
          "shadow-[0_20px_58px_rgba(0,0,0,0.42)]",
          "transition-[opacity,border-color,box-shadow] duration-300 ease-out",
          "hover:border-cyan-100/45 hover:shadow-[0_28px_72px_rgba(0,0,0,0.52)]",
          "focus-visible:border-cyan-200/55 focus-visible:outline-none",
          "focus-visible:ring-2 focus-visible:ring-cyan-200/80 focus-visible:ring-offset-4",
          "focus-visible:ring-offset-slate-950",
          inactive ? "opacity-70" : "opacity-100",
        ].join(" ")}
      >
        <img
          src={artwork.thumbnail ?? artwork.src}
          alt={duplicate ? "" : artwork.alt}
          loading="lazy"
          decoding="async"
          draggable={false}
          className="h-full w-full select-none rounded-[0.82rem] object-contain"
        />

        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-1.5 rounded-[0.82rem] bg-gradient-to-t from-slate-950/80 via-slate-950/5 to-transparent opacity-35 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
        />

        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-4 bottom-3.5 flex translate-y-1 items-end justify-between gap-3 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
        >
          <span className="min-w-0 text-left">
            <span className="block truncate text-[0.61rem] font-semibold uppercase tracking-[0.18em] text-cyan-100">
              {artwork.category}
            </span>
            <span className="mt-1 block truncate text-xs font-medium text-white">
              {artwork.title}
            </span>
          </span>

          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/20 bg-slate-950/75 text-sm text-cyan-100 backdrop-blur-sm">
            ↗
          </span>
        </span>
      </motion.button>
    </li>
  );
}
