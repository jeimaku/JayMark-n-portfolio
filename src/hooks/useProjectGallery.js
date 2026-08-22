import { useCallback, useEffect, useRef, useState } from "react";
import useMotionRuntime from "./useMotionRuntime";

/**
 * useProjectGallery
 *
 * Lightweight, accessible hook for the interactive project gallery.
 *
 * Provides:
 * - Controlled active project state (0 to N - 1)
 * - Direction tracking (-1 / 1) for directional motion transitions
 * - Active screenshot/tab index for multi-screen projects
 * - Keyboard navigation (Left / Right Arrow) when section is active in viewport
 * - Natural swipe gesture detection for touchscreens without scroll locking
 */
export default function useProjectGallery({
  projects = [],
  initialIndex = 0,
} = {}) {
  const projectCount = projects.length;
  const lastIndex = Math.max(projectCount - 1, 0);

  const [activeIndex, setActiveIndex] = useState(() => {
    const clamped = Math.min(lastIndex, Math.max(0, initialIndex));
    return clamped;
  });

  const [direction, setDirection] = useState(1);
  const [activeScreenIndex, setActiveScreenIndex] = useState(0);

  const sectionRef = useRef(null);
  const activeIndexRef = useRef(activeIndex);

  const { prefersReducedMotion } = useMotionRuntime();

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  // Reset active screen index whenever the project changes
  const goToProject = useCallback(
    (index) => {
      const clamped = Math.min(lastIndex, Math.max(0, index));
      if (clamped === activeIndexRef.current) return;

      setDirection(clamped > activeIndexRef.current ? 1 : -1);
      activeIndexRef.current = clamped;
      setActiveIndex(clamped);
      setActiveScreenIndex(0);
    },
    [lastIndex]
  );

  const goPrevious = useCallback(() => {
    if (activeIndexRef.current > 0) {
      goToProject(activeIndexRef.current - 1);
    } else {
      goToProject(lastIndex);
    }
  }, [goToProject, lastIndex]);

  const goNext = useCallback(() => {
    if (activeIndexRef.current < lastIndex) {
      goToProject(activeIndexRef.current + 1);
    } else {
      goToProject(0);
    }
  }, [goToProject, lastIndex]);

  // Keyboard navigation when the section is in view
  useEffect(() => {
    const handleKeyDown = (event) => {
      // Ignore if typing in text inputs/forms
      if (
        event.target instanceof Element &&
        event.target.closest("input, textarea, select")
      ) {
        return;
      }

      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const inView =
        rect.top <= window.innerHeight * 0.75 &&
        rect.bottom >= window.innerHeight * 0.25;

      if (!inView) return;

      if (event.key === "ArrowRight") {
        event.preventDefault();
        goNext();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        goPrevious();
      } else if (event.key === "Home") {
        event.preventDefault();
        goToProject(0);
      } else if (event.key === "End") {
        event.preventDefault();
        goToProject(lastIndex);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goNext, goPrevious, goToProject, lastIndex]);

  // Touch swipe support (lightweight, non-blocking)
  const touchStartRef = useRef({ x: 0, y: 0, time: 0 });

  const handleTouchStart = useCallback((event) => {
    const touch = event.touches[0];
    if (!touch) return;
    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now(),
    };
  }, []);

  const handleTouchEnd = useCallback(
    (event) => {
      const touch = event.changedTouches[0];
      if (!touch) return;

      const deltaX = touch.clientX - touchStartRef.current.x;
      const deltaY = touch.clientY - touchStartRef.current.y;
      const deltaTime = Date.now() - touchStartRef.current.time;

      // Ensure horizontal swipe is dominant and swift
      const isHorizontalSwipe =
        Math.abs(deltaX) > 48 &&
        Math.abs(deltaX) > Math.abs(deltaY) * 1.35 &&
        deltaTime < 450;

      if (isHorizontalSwipe) {
        if (deltaX < 0) {
          goNext();
        } else {
          goPrevious();
        }
      }
    },
    [goNext, goPrevious]
  );

  const activeProject = projects[activeIndex] ?? null;

  return {
    sectionRef,
    activeIndex,
    direction,
    activeProject,
    activeScreenIndex,
    setActiveScreenIndex,
    goToProject,
    goNext,
    goPrevious,
    canGoPrevious: activeIndex > 0,
    canGoNext: activeIndex < lastIndex,
    handleTouchStart,
    handleTouchEnd,
    prefersReducedMotion,
  };
}

