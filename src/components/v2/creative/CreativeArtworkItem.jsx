const ARTWORK_HEIGHTS = {
  wide: "h-[12.5rem] sm:h-[15rem] lg:h-[18rem]",
  phone: "h-[19rem] sm:h-[22rem] lg:h-[25rem]",
  portrait: "h-[17rem] sm:h-[20rem] lg:h-[23rem]",
  square: "h-[15rem] sm:h-[18rem] lg:h-[20rem]",
};

export default function CreativeArtworkItem({
  artwork,
  duplicate = false,
  inactive = false,
  staticLayout = false,
  onBlur,
  onFocus,
  onOpen,
  onPointerEnter,
  onPointerLeave,
}) {
  const heightClass =
    ARTWORK_HEIGHTS[artwork.aspect] ??
    ARTWORK_HEIGHTS.wide;

  return (
    <li
      aria-hidden={duplicate || undefined}
      className="shrink-0"
    >
      <button
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
        style={{ aspectRatio: artwork.ratio ?? 1.5 }}
        className={[
          "creative-artwork group relative block shrink-0 cursor-zoom-in overflow-hidden",
          "rounded-[1.2rem] border border-white/[0.13] bg-slate-950/78",
          "shadow-[0_18px_55px_rgba(0,0,0,0.34)]",
          "transition-[transform,opacity,border-color,box-shadow] duration-300 ease-out",
          "hover:-translate-y-1 hover:scale-[1.02] hover:border-cyan-200/45",
          "hover:shadow-[0_24px_68px_rgba(0,0,0,0.42)]",
          "focus-visible:-translate-y-1 focus-visible:scale-[1.02]",
          "focus-visible:border-cyan-200/55 focus-visible:outline-none",
          "focus-visible:ring-2 focus-visible:ring-cyan-200/80 focus-visible:ring-offset-4",
          "focus-visible:ring-offset-slate-950",
          heightClass,
          staticLayout ? "snap-start" : "",
          inactive ? "opacity-70" : "opacity-100",
        ].join(" ")}
      >
        <img
          src={artwork.thumbnail ?? artwork.src}
          alt={duplicate ? "" : artwork.alt}
          loading="lazy"
          decoding="async"
          draggable={false}
          className="h-full w-full select-none object-contain"
        />

        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/72 via-slate-950/5 to-transparent opacity-40 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
        />

        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-4 bottom-3 flex translate-y-1 items-end justify-between gap-3 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
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
      </button>
    </li>
  );
}
