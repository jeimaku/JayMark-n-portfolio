import { useCallback, useEffect, useRef, useState } from "react";
import {
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import useMotionRuntime from "./useMotionRuntime";

/**
 * useProjectCarousel
 *
 * High-performance, fully responsive horizontal project showcase hook.
 *
 * Responsibilities:
 * - Active project index synchronization (guaranteed to match visible slide)
 * - ResizeObserver + window resize recovery (realigns scroll & track without reload)
 * - Safe desktop <-> tablet/mobile breakpoint switching (width >= 1024px, height >= 700px)
 * - Automatic reset & lock release when scrolling outside section boundaries
 * - IntersectionObserver fallback cleanup
 * - Smooth pointer drag / swipe with snap on release
 * - Keyboard navigation (ArrowLeft, ArrowRight, Home, End)
 * - Pure transform & opacity animation on requestAnimationFrame
 */
export default function useProjectCarousel({
  projectCount = 5,
} = {}) {
  const containerRef = useRef(null);
  const stageRef = useRef(null);

  const {
    allowComplexMotion,
    prefersReducedMotion,
  } = useMotionRuntime();

  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isDesktopMode, setIsDesktopMode] = useState(() => {
    if (typeof window === "undefined") return true;
    return window.innerWidth >= 1024 && window.innerHeight >= 700 && projectCount > 1;
  });

  const activeIndexRef = useRef(0);
  const isDraggingRef = useRef(false);
  const dragRef = useRef({ startX: 0, startProgress: 0, active: false });
  const resizeTimeoutRef = useRef(null);

  const lastIndex = Math.max(projectCount - 1, 0);

  // 1. Responsive Viewport Mode Check
  const checkViewportMode = useCallback(() => {
    if (typeof window === "undefined") return true;
    const meetsWidth = window.innerWidth >= 1024;
    const meetsHeight = window.innerHeight >= 700;
    const suitable = meetsWidth && meetsHeight && allowComplexMotion && projectCount > 1;
    setIsDesktopMode((prev) => (prev === suitable ? prev : suitable));
    return suitable;
  }, [allowComplexMotion, projectCount]);

  // 2. Measure vertical scroll progress through the tall container
  const { scrollYProgress: rawScrollProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Spring-smoothed scroll progress for organic momentum
  const smoothScrollProgress = useSpring(rawScrollProgress, {
    stiffness: 140,
    damping: 26,
    mass: 0.18,
    restDelta: 0.0005,
  });

  // Master progress MotionValue [0, 1] driving the horizontal track
  const progressValue = useMotionValue(0);

  // Track shift: from 0% (slide 1) to -((N-1)/N * 100)% (last slide)
  const maxShiftPercent = lastIndex > 0 ? (lastIndex / projectCount) * 100 : 0;
  const trackX = useTransform(
    progressValue,
    [0, 1],
    ["0%", `-${maxShiftPercent}%`]
  );

  // 3. Keep progressValue and activeProjectIndex in lockstep with scroll
  useMotionValueEvent(smoothScrollProgress, "change", (latest) => {
    if (isDraggingRef.current || !isDesktopMode) return;

    const clampedProgress = Math.max(0, Math.min(1, latest));
    progressValue.set(clampedProgress);

    // Compute active index safely
    const computedIndex = Math.min(
      lastIndex,
      Math.max(0, Math.round(clampedProgress * lastIndex))
    );

    if (computedIndex !== activeIndexRef.current) {
      activeIndexRef.current = computedIndex;
      setActiveProjectIndex(computedIndex);
    }
  });

  // 4. Programmatic Navigation with precise scroll alignment
  const goToProject = useCallback(
    (targetIndex, smooth = true) => {
      const safeIndex = Math.min(lastIndex, Math.max(0, targetIndex));
      activeIndexRef.current = safeIndex;
      setActiveProjectIndex(safeIndex);

      const targetProgress = lastIndex > 0 ? safeIndex / lastIndex : 0;
      progressValue.set(targetProgress);

      const container = containerRef.current;
      if (!container || !isDesktopMode) return;

      const rect = container.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const containerTop = rect.top + scrollTop;
      const totalScrollable = container.offsetHeight - window.innerHeight;

      if (totalScrollable > 0) {
        const targetScroll = containerTop + targetProgress * totalScrollable;
        window.scrollTo({
          top: targetScroll,
          behavior: smooth && !prefersReducedMotion ? "smooth" : "auto",
        });
      }
    },
    [isDesktopMode, lastIndex, prefersReducedMotion, progressValue]
  );

  const goPrevious = useCallback(() => {
    if (activeIndexRef.current > 0) {
      goToProject(activeIndexRef.current - 1);
    }
  }, [goToProject]);

  const goNext = useCallback(() => {
    if (activeIndexRef.current < lastIndex) {
      goToProject(activeIndexRef.current + 1);
    } else {
      // Release smoothly into the next section (Experience)
      const experienceSection = document.getElementById("experience");
      if (experienceSection) {
        experienceSection.scrollIntoView({
          behavior: prefersReducedMotion ? "auto" : "smooth",
          block: "start",
        });
      } else {
        window.scrollBy({
          top: window.innerHeight * 0.8,
          behavior: prefersReducedMotion ? "auto" : "smooth",
        });
      }
    }
  }, [goToProject, lastIndex, prefersReducedMotion]);

  // 5. Resize Recovery: Recalculate dimensions & realign active project
  useEffect(() => {
    const handleResize = () => {
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }

      resizeTimeoutRef.current = setTimeout(() => {
        const isSuitable = checkViewportMode();
        if (!isSuitable) {
          // In mobile mode, reset drag and progress
          isDraggingRef.current = false;
          setIsDragging(false);
          return;
        }

        // Keep current active index clamped within bounds
        const safeIndex = Math.min(activeIndexRef.current, lastIndex);
        activeIndexRef.current = safeIndex;
        setActiveProjectIndex(safeIndex);

        // Realign scroll position to match active slide if currently within section
        const container = containerRef.current;
        if (container) {
          const rect = container.getBoundingClientRect();
          const scrollTop = window.scrollY || document.documentElement.scrollTop;
          const inView = rect.top <= 120 && rect.bottom >= window.innerHeight - 120;

          if (inView) {
            const containerTop = rect.top + scrollTop;
            const totalScrollable = container.offsetHeight - window.innerHeight;
            if (totalScrollable > 0) {
              const targetProgress = safeIndex / lastIndex;
              progressValue.set(targetProgress);
              const targetScroll = containerTop + targetProgress * totalScrollable;
              window.scrollTo({
                top: targetScroll,
                behavior: "auto", // Instant alignment on resize
              });
            }
          }
        }
      }, 60);
    };

    window.addEventListener("resize", handleResize, { passive: true });

    let resizeObserver = null;
    if (typeof ResizeObserver !== "undefined" && containerRef.current) {
      resizeObserver = new ResizeObserver(() => {
        handleResize();
      });
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
    };
  }, [checkViewportMode, lastIndex, progressValue]);

  // 6. Leaving Section Detection: Reset temporary states & prevent persisting locks
  useEffect(() => {
    const handleScrollBoundaryCheck = () => {
      const container = containerRef.current;
      if (!container || !isDesktopMode) return;

      const rect = container.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Scrolled well above the section
      if (rect.top > viewportHeight * 0.75) {
        if (activeIndexRef.current !== 0) {
          activeIndexRef.current = 0;
          setActiveProjectIndex(0);
          progressValue.set(0);
        }
        if (isDraggingRef.current) {
          isDraggingRef.current = false;
          setIsDragging(false);
        }
      }

      // Scrolled well below the section
      if (rect.bottom < -viewportHeight * 0.25) {
        if (activeIndexRef.current !== lastIndex) {
          activeIndexRef.current = lastIndex;
          setActiveProjectIndex(lastIndex);
          progressValue.set(1);
        }
        if (isDraggingRef.current) {
          isDraggingRef.current = false;
          setIsDragging(false);
        }
      }
    };

    window.addEventListener("scroll", handleScrollBoundaryCheck, { passive: true });
    return () => window.removeEventListener("scroll", handleScrollBoundaryCheck);
  }, [isDesktopMode, lastIndex, progressValue]);

  // 7. IntersectionObserver Fallback: Reset state when completely out of viewport
  useEffect(() => {
    const container = containerRef.current;
    if (!container || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry.isIntersecting) {
          // Release pointer capture & drag flags if user scrolled away while dragging
          if (isDraggingRef.current) {
            isDraggingRef.current = false;
            setIsDragging(false);
          }
        }
      },
      { threshold: 0 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // 8. Keyboard Navigation
  useEffect(() => {
    if (!isDesktopMode) return;

    const handleKeyDown = (event) => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const inView = rect.top <= 120 && rect.bottom >= window.innerHeight - 120;
      if (!inView) return;

      if (event.key === "ArrowRight" || event.key === "PageDown") {
        event.preventDefault();
        goNext();
      } else if (event.key === "ArrowLeft" || event.key === "PageUp") {
        event.preventDefault();
        goPrevious();
      } else if (event.key === "Home") {
        event.preventDefault();
        goToProject(0);
      } else if (event.key === "End") {
        event.preventDefault();
        goToProject(lastIndex);
      } else if (event.key === "Escape") {
        isDraggingRef.current = false;
        setIsDragging(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goNext, goPrevious, goToProject, isDesktopMode, lastIndex]);

  // 9. Pointer Drag & Touch Handling
  const handlePointerDown = useCallback(
    (event) => {
      if (!isDesktopMode || event.button !== 0) return;
      if (
        event.target instanceof Element &&
        event.target.closest("a, button, input, textarea, select, [data-no-project-drag]")
      ) {
        return;
      }

      const stage = stageRef.current;
      if (!stage) return;

      dragRef.current = {
        startX: event.clientX,
        startProgress: progressValue.get(),
        active: false,
      };
      stage.setPointerCapture(event.pointerId);
    },
    [isDesktopMode, progressValue]
  );

  const handlePointerMove = useCallback(
    (event) => {
      if (!stageRef.current?.hasPointerCapture(event.pointerId)) return;
      const deltaX = event.clientX - dragRef.current.startX;

      if (!dragRef.current.active && Math.abs(deltaX) > 8) {
        dragRef.current.active = true;
        isDraggingRef.current = true;
        setIsDragging(true);
      }
      if (!dragRef.current.active) return;

      const container = containerRef.current;
      if (!container) return;

      const stageWidth = window.innerWidth || 1200;
      const progressDelta = -deltaX / (stageWidth * lastIndex);
      let targetProgress = dragRef.current.startProgress + progressDelta;

      // Edge resistance
      if (targetProgress < 0) {
        targetProgress = targetProgress * 0.25;
      } else if (targetProgress > 1) {
        targetProgress = 1 + (targetProgress - 1) * 0.25;
      }

      progressValue.set(Math.max(-0.05, Math.min(1.05, targetProgress)));

      const totalScrollable = container.offsetHeight - window.innerHeight;
      const rect = container.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const containerTop = rect.top + scrollTop;

      if (totalScrollable > 0) {
        window.scrollTo({
          top: containerTop + Math.max(0, Math.min(1, targetProgress)) * totalScrollable,
          behavior: "auto",
        });
      }
    },
    [lastIndex, progressValue]
  );

  const handlePointerUp = useCallback(
    (event) => {
      if (stageRef.current?.hasPointerCapture(event.pointerId)) {
        stageRef.current.releasePointerCapture(event.pointerId);
      }
      if (dragRef.current.active) {
        dragRef.current.active = false;
        isDraggingRef.current = false;
        setIsDragging(false);

        const currentProg = progressValue.get();
        const nearestIndex = Math.min(
          lastIndex,
          Math.max(0, Math.round(currentProg * lastIndex))
        );
        goToProject(nearestIndex, true);
      }
    },
    [goToProject, lastIndex, progressValue]
  );

  const canGoPrevious = activeProjectIndex > 0;
  const canGoNext = activeProjectIndex < lastIndex;

  return {
    containerRef,
    stageRef,
    activeProjectIndex,
    progressValue,
    trackX,
    isDragging,
    isDesktopMode,
    canGoPrevious,
    canGoNext,
    goToProject,
    goPrevious,
    goNext,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
  };
}

