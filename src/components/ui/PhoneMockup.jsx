import { Play, Smartphone } from "lucide-react";
import { cn } from "../../lib/utils";
import LazyVideo from "./LazyVideo";

export default function PhoneMockup({
  videoSrc,
  title,
  label,
  className,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group mx-auto block w-full max-w-[18rem] text-left",
        className
      )}
    >
      <div className="relative rounded-[2.6rem] border border-white/15 bg-slate-950 p-2 shadow-2xl shadow-black/40 transition duration-300 group-hover:-translate-y-1 group-hover:border-cyan-300/40">
        <div className="absolute left-1/2 top-4 z-20 h-5 w-24 -translate-x-1/2 rounded-full bg-black/80" />

        <div className="relative aspect-[9/19.5] overflow-hidden rounded-[2rem] border border-white/10 bg-black">
          {videoSrc ? (
            <LazyVideo
              src={videoSrc}
              className="h-full w-full object-contain"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              lazy
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-slate-900 p-6 text-center text-slate-500">
              <div>
                <Smartphone className="mx-auto" size={34} />
                <p className="mt-3 text-sm">Video preview unavailable</p>
              </div>
            </div>
          )}

          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">
              {label}
            </p>

            <p className="mt-1 break-safe text-sm font-semibold text-white">
              {title}
            </p>
          </div>

          <div className="pointer-events-none absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-slate-950/70 text-white backdrop-blur">
            <Play size={15} fill="currentColor" />
          </div>
        </div>
      </div>
    </button>
  );
}