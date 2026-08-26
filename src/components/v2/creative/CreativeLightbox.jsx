import {
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import {
  startSmoothScroll,
  stopSmoothScroll,
} from "../../../lib/smoothScroll";

const FOCUSABLE_SELECTOR = [
  "button:not([disabled])",
  "a[href]",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

function getFocusableElements(container) {
  if (!container) {
    return [];
  }

  return [...container.querySelectorAll(FOCUSABLE_SELECTOR)].filter(
    (element) => element instanceof HTMLElement && element.getClientRects().length > 0
  );
}

function isTextInput(target) {
  if (!(target instanceof HTMLElement)) {
    return false;
  }

  return (
    target.isContentEditable ||
    ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName) ||
    target.getAttribute("role") === "textbox" ||
    target.getAttribute("role") === "combobox"
  );
}

function getImageKey(image, index) {
  return image.id ?? image.src ?? index;
}

export default function CreativeLightbox({
  images = [],
  activeIndex = null,
  onClose,
  onNavigate,
  reducedMotion = false,
}) {
  const titleId = useId();
  const metadataId = useId();
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);
  const focusedElementRef = useRef(null);
  const [direction, setDirection] = useState(1);

  const imageCount = images.length;
  const isOpen =
    Number.isInteger(activeIndex) &&
    activeIndex >= 0 &&
    activeIndex < imageCount;
  const activeImage = isOpen ? images[activeIndex] : null;
  const canNavigatePrevious = isOpen && activeIndex > 0;
  const canNavigateNext = isOpen && activeIndex < imageCount - 1;

  const requestClose = () => {
    if (typeof onClose === "function") {
      onClose();
    }
  };

  const navigateToIndex = (nextIndex) => {
    if (
      !isOpen ||
      nextIndex < 0 ||
      nextIndex >= imageCount ||
      nextIndex === activeIndex ||
      typeof onNavigate !== "function"
    ) {
      return;
    }

    setDirection(nextIndex > activeIndex ? 1 : -1);
    onNavigate(nextIndex);
  };

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    focusedElementRef.current = document.activeElement;

    const previousOverflow = document.body.style.overflow;
    const focusFrame = window.requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    document.body.style.overflow = "hidden";
    stopSmoothScroll();

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.body.style.overflow = previousOverflow;
      startSmoothScroll();

      if (focusedElementRef.current instanceof HTMLElement) {
        focusedElementRef.current.focus();
      }

      focusedElementRef.current = null;
    };
  }, [isOpen]);

  const handleDialogKeyDown = (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      requestClose();

      return;
    }

    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      if (event.defaultPrevented || isTextInput(event.target)) {
        return;
      }

      event.preventDefault();
      navigateToIndex(
        event.key === "ArrowLeft" ? activeIndex - 1 : activeIndex + 1
      );

      return;
    }

    if (event.key !== "Tab") {
      return;
    }

    const focusableElements = getFocusableElements(dialogRef.current);

    if (focusableElements.length === 0) {
      event.preventDefault();
      dialogRef.current?.focus();

      return;
    }

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  };

  const imageMotion = reducedMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.14 },
      }
    : {
        initial: {
          opacity: 0,
          x: direction * 20,
        },
        animate: { opacity: 1, x: 0 },
        exit: {
          opacity: 0,
          x: direction * -14,
        },
        transition: {
          duration: 0.22,
          ease: [0.22, 1, 0.36, 1],
        },
      };

  return (
    <AnimatePresence initial={false}>
      {activeImage ? (
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={metadataId}
          aria-label="Artwork viewer"
          tabIndex={-1}
          data-lenis-prevent=""
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reducedMotion ? 0.12 : 0.2 }}
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              requestClose();
            }
          }}
          onKeyDown={handleDialogKeyDown}
          className="fixed inset-0 z-[130] flex items-center justify-center bg-slate-950/92 p-3 backdrop-blur-xl sm:p-6"
        >
          <motion.section
            initial={
              reducedMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 16, scale: 0.985 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              reducedMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 10, scale: 0.99 }
            }
            transition={{
              duration: reducedMotion ? 0.14 : 0.24,
              ease: [0.22, 1, 0.36, 1],
            }}
            onClick={(event) => event.stopPropagation()}
            className="relative flex max-h-[94vh] w-full max-w-6xl flex-col overflow-hidden rounded-[1.75rem] border border-white/15 bg-slate-950 shadow-[0_35px_120px_rgba(0,0,0,0.7)]"
          >
            <header className="flex items-start justify-between gap-5 border-b border-white/10 px-4 py-4 sm:px-6">
              <div className="min-w-0">
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-cyan-200">
                  {activeImage.category ?? "Artwork"}
                </p>

                <h2
                  id={titleId}
                  className="mt-2 truncate text-base font-semibold text-white sm:text-lg"
                >
                  {activeImage.title ?? activeImage.name ?? activeImage.alt ?? "Artwork preview"}
                </h2>
              </div>

              <button
                ref={closeButtonRef}
                type="button"
                onClick={requestClose}
                aria-label="Close artwork viewer"
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.035] text-slate-300 transition hover:border-cyan-300/35 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200"
              >
                <X size={19} aria-hidden="true" />
              </button>
            </header>

            <div className="relative min-h-0 flex-1 overflow-hidden bg-black/30 px-3 py-4 sm:px-5 sm:py-5">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={getImageKey(activeImage, activeIndex)}
                  initial={imageMotion.initial}
                  animate={imageMotion.animate}
                  exit={imageMotion.exit}
                  transition={imageMotion.transition}
                  className="flex h-full min-h-[18rem] items-center justify-center"
                >
                  <img
                    src={activeImage.src}
                    alt={
                      activeImage.alt ??
                      activeImage.title ??
                      activeImage.name ??
                      "Expanded artwork"
                    }
                    decoding="async"
                    draggable={false}
                    className="max-h-[67vh] w-full select-none rounded-2xl object-contain"
                  />
                </motion.div>
              </AnimatePresence>

              <button
                type="button"
                onClick={() => navigateToIndex(activeIndex - 1)}
                disabled={!canNavigatePrevious}
                aria-label="View previous artwork"
                className="absolute left-5 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-slate-950/75 text-white shadow-lg shadow-black/30 backdrop-blur transition hover:border-cyan-200/50 hover:bg-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200 disabled:pointer-events-none disabled:opacity-30 sm:left-7"
              >
                <ChevronLeft size={21} aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={() => navigateToIndex(activeIndex + 1)}
                disabled={!canNavigateNext}
                aria-label="View next artwork"
                className="absolute right-5 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-slate-950/75 text-white shadow-lg shadow-black/30 backdrop-blur transition hover:border-cyan-200/50 hover:bg-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200 disabled:pointer-events-none disabled:opacity-30 sm:right-7"
              >
                <ChevronRight size={21} aria-hidden="true" />
              </button>
            </div>

            <footer
              id={metadataId}
              className="flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-white/10 px-4 py-3 text-xs text-slate-400 sm:px-6"
            >
              <span>{activeImage.group ?? "Selected work"}</span>
              <span aria-hidden="true" className="text-slate-600">
                /
              </span>
              <span>{activeImage.category ?? "Artwork"}</span>
              <span aria-hidden="true" className="text-slate-600">
                /
              </span>
              <span>
                {activeIndex + 1} of {imageCount}
              </span>
            </footer>
          </motion.section>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
