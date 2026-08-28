import { useState } from "react";

const FALLBACK_IMAGE =
  "/old-portfolio-assets/3d/hero/fallback/hero-workspace-fallback.png";

export default function HeroStaticFallback({
  message = "Interactive 3D is unavailable. A static preview is shown instead.",
}) {
  const [imageFailed, setImageFailed] =
    useState(false);

  return (
    <div className="relative h-full w-full overflow-hidden bg-neutral-950">
      {!imageFailed ? (
        <img
          src={FALLBACK_IMAGE}
          alt="Static preview of Jay Mark Apelado's interactive systems workspace"
          className="h-full w-full object-contain p-2 sm:p-4 lg:p-6"
          loading="eager"
          decoding="async"
          onError={() => setImageFailed(true)}
        />
      ) : (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_55%_45%,rgba(255,255,255,0.14),transparent_26rem)]"
        />
      )}

      <p role="status" className="sr-only">
        {message}
      </p>

      <div className="pointer-events-none absolute bottom-4 right-4 hidden lg:flex">
        <p className="max-w-xs rounded-full border border-white/10 bg-neutral-950/80 px-4 py-2 text-center text-xs leading-5 text-neutral-300 backdrop-blur">
          {message}
        </p>
      </div>
    </div>
  );
}