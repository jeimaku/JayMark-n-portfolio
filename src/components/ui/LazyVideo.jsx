import { useEffect, useRef, useState } from "react";
import { cn } from "../../lib/utils";

export default function LazyVideo({
  src,
  className,
  autoPlay = false,
  muted = true,
  loop = false,
  playsInline = true,
  controls = false,
  preload = "metadata",
  lazy = true,
  ...props
}) {
  const videoRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(!lazy);

  useEffect(() => {
    if (!lazy || shouldLoad) return;

    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      {
        root: null,
        rootMargin: "300px",
        threshold: 0.01,
      }
    );

    observer.observe(video);

    return () => observer.disconnect();
  }, [lazy, shouldLoad]);

  useEffect(() => {
    const video = videoRef.current;

    if (!video || !shouldLoad || !autoPlay) return;

    const playVideo = async () => {
      try {
        await video.play();
      } catch {
        // Browser may block autoplay in some cases. Since videos are muted,
        // most browsers will allow it, but failing silently is safe.
      }
    };

    playVideo();
  }, [shouldLoad, autoPlay, src]);

  return (
    <video
      ref={videoRef}
      src={shouldLoad ? src : undefined}
      className={cn("bg-black", className)}
      autoPlay={autoPlay}
      muted={muted}
      loop={loop}
      playsInline={playsInline}
      controls={controls}
      preload={shouldLoad ? preload : "none"}
      {...props}
    />
  );
}