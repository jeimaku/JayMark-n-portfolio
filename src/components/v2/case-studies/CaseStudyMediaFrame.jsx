import { useState } from "react";

export default function CaseStudyMediaFrame({
  src,
  alt,
  caption,
  eager = false,
  className = "",
  imageClassName = "",
}) {
  const [imageFailed, setImageFailed] =
    useState(false);

  return (
    <figure
      className={[
        "overflow-hidden rounded-3xl",
        "border border-white/10",
        "bg-neutral-900/35",
        "shadow-[0_28px_80px_rgba(0,0,0,0.35)]",
        className,
      ].join(" ")}
    >
      <div className="relative overflow-hidden bg-neutral-950">
        {!imageFailed && src ? (
          <img
            src={src}
            alt={alt}
            loading={eager ? "eager" : "lazy"}
            decoding="async"
            onError={() => setImageFailed(true)}
            className={[
              "w-full object-cover object-top",
              imageClassName,
            ].join(" ")}
          />
        ) : (
          <div
            role="img"
            aria-label={alt}
            className="flex aspect-[16/10] w-full items-center justify-center bg-neutral-900"
          >
            <div className="text-center">
              <p className="text-4xl font-semibold tracking-[-0.05em] text-neutral-100">
                JM
              </p>

              <p className="mt-3 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-neutral-600">
                Project Preview
              </p>
            </div>
          </div>
        )}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/[0.035]"
        />
      </div>

      {caption ? (
        <figcaption className="border-t border-white/10 px-4 py-3 text-xs leading-5 text-neutral-500 sm:px-5">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}