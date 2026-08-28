import { ImageOff, Play } from "lucide-react";
import { cn } from "../../lib/utils";
import LazyVideo from "./LazyVideo";

export default function MediaFrame({
  src,
  alt,
  type = "image",
  className,
  mediaClassName,
  showPlayIcon = false,
  eager = false,
}) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-neutral-950/60",
        className
      )}
    >
      {src ? (
        type === "video" ? (
          <LazyVideo
            src={src}
            className={cn(
              "h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]",
              mediaClassName
            )}
            muted
            loop={false}
            playsInline
            controls
            preload="metadata"
            lazy={!eager}
          />
        ) : (
          <img
            src={src}
            alt={alt || ""}
            loading={eager ? "eager" : "lazy"}
            decoding="async"
            fetchPriority={eager ? "high" : "auto"}
            className={cn(
              "h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]",
              mediaClassName
            )}
          />
        )
      ) : (
        <div className="flex min-h-[14rem] items-center justify-center p-6 text-neutral-600">
          <div className="text-center">
            <ImageOff className="mx-auto" size={30} />
            <p className="mt-3 text-sm">Media placeholder</p>
          </div>
        </div>
      )}

      {showPlayIcon && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-neutral-950/10">
          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-neutral-950/60 text-white backdrop-blur">
            <Play size={22} fill="currentColor" />
          </div>
        </div>
      )}
    </div>
  );
}