import {
  useEffect,
} from "react";

import {
  useNavigate,
} from "react-router";

import Lenis from "lenis";

import {
  cancelFrame,
  frame,
} from "motion/react";

import "lenis/dist/lenis.css";

import {
  clearSmoothScrollInstance,
  isPortfolioSection,
  markPortfolioNavigation,
  scrollToPortfolioSection,
  setSmoothScrollInstance,
} from "../../lib/smoothScroll";

const LENIS_OPTIONS = {
  autoRaf: false,
  lerp: 0.09,
  smoothWheel: true,
  syncTouch: false,
  touchMultiplier: 1,
  wheelMultiplier: 0.9,
  anchors: false,
  respectReducedMotion: true,
};

function getPortfolioAnchor(event) {
  if (
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey ||
    !(event.target instanceof Element)
  ) {
    return null;
  }

  const anchor = event.target.closest("a[href^='#']");

  if (!anchor) {
    return null;
  }

  const sectionId = decodeURIComponent(
    anchor.hash.replace("#", "")
  );

  return isPortfolioSection(sectionId)
    ? sectionId
    : null;
}

export default function SmoothScrollProvider({
  children,
}) {
  const navigate = useNavigate();

  useEffect(() => {
    const lenis = new Lenis(LENIS_OPTIONS);

    const updateLenis = ({ timestamp }) => {
      lenis.raf(timestamp);
    };

    setSmoothScrollInstance(lenis);
    frame.update(updateLenis, true);

    return () => {
      cancelFrame(updateLenis);
      clearSmoothScrollInstance(lenis);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const handleAnchorClick = (event) => {
      const sectionId = getPortfolioAnchor(event);

      if (!sectionId) {
        return;
      }

      event.preventDefault();
      markPortfolioNavigation(sectionId);
      navigate({
        pathname: "/",
        hash: `#${sectionId}`,
      });
      scrollToPortfolioSection(sectionId);
    };

    document.addEventListener(
      "click",
      handleAnchorClick
    );

    return () => {
      document.removeEventListener(
        "click",
        handleAnchorClick
      );
    };
  }, [navigate]);

  return children;
}
