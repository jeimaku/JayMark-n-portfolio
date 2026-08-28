import {
  useEffect,
  useId,
  useRef,
} from "react";

const FOCUSABLE_SELECTOR = [
  "button:not([disabled])",
  "a[href]",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

function CloseIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className="h-5 w-5"
    >
      <path
        d="M5 5l10 10M15 5 5 15"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function CaseStudyMediaLightbox({
  media,
  onClose,
  reducedMotion = false,
}) {
  const titleId = useId();
  const descriptionId = useId();

  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (!media) {
      return undefined;
    }

    const previouslyFocused =
      document.activeElement;

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const animationFrame =
      window.requestAnimationFrame(() => {
        closeButtonRef.current?.focus();
      });

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();

        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const focusableElements = [
        ...dialogRef.current.querySelectorAll(
          FOCUSABLE_SELECTOR
        ),
      ];

      if (focusableElements.length === 0) {
        event.preventDefault();

        return;
      }

      const firstElement =
        focusableElements[0];

      const lastElement =
        focusableElements[
          focusableElements.length - 1
        ];

      if (
        event.shiftKey &&
        document.activeElement === firstElement
      ) {
        event.preventDefault();
        lastElement.focus();
      } else if (
        !event.shiftKey &&
        document.activeElement === lastElement
      ) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.cancelAnimationFrame(
        animationFrame
      );

      document.removeEventListener(
        "keydown",
        handleKeyDown
      );

      document.body.style.overflow =
        previousOverflow;

      if (
        previouslyFocused instanceof HTMLElement
      ) {
        previouslyFocused.focus();
      }
    };
  }, [media, onClose]);

  if (!media) {
    return null;
  }

  const isVideo =
    media.type === "video" ||
    /\.(mp4|webm|ogg)(\?.*)?$/i.test(
      media.src ?? ""
    );

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={
        media.caption ? descriptionId : undefined
      }
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-neutral-950/90 p-3 backdrop-blur-md sm:p-6"
    >
      <div className="relative flex max-h-[94vh] w-full max-w-6xl flex-col overflow-hidden rounded-3xl border border-white/15 bg-neutral-950 shadow-[0_35px_110px_rgba(0,0,0,0.65)]">
        <div className="flex items-start justify-between gap-5 border-b border-white/10 px-4 py-4 sm:px-6">
          <div className="min-w-0">
            <p className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-white">
              Media Preview
            </p>

            <h2
              id={titleId}
              className="mt-2 truncate text-base font-semibold text-white sm:text-lg"
            >
              {media.title ??
                media.alt ??
                "Project media"}
            </h2>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close media viewer"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.035] text-neutral-300 transition hover:border-neutral-100/30 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="flex min-h-0 flex-1 items-center justify-center overflow-auto bg-black/30 p-3 sm:p-5">
          {isVideo ? (
            <video
              src={media.src}
              poster={media.poster}
              controls
              autoPlay={!reducedMotion}
              muted
              playsInline
              preload="metadata"
              className="max-h-[72vh] w-full rounded-2xl object-contain"
            >
              Your browser does not support video
              playback.
            </video>
          ) : (
            <img
              src={media.src}
              alt={
                media.alt ??
                media.title ??
                "Expanded project preview"
              }
              decoding="async"
              className="max-h-[72vh] w-full rounded-2xl object-contain"
            />
          )}
        </div>

        {media.caption ? (
          <p
            id={descriptionId}
            className="border-t border-white/10 px-4 py-4 text-xs leading-6 text-neutral-400 sm:px-6"
          >
            {media.caption}
          </p>
        ) : null}
      </div>
    </div>
  );
}