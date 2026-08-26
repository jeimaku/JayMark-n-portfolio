import {
  useLayoutEffect,
} from "react";

import {
  useLocation,
} from "react-router";

import {
  clearPendingPortfolioNavigation,
  HEADER_SCROLL_OFFSET,
  isPortfolioSection,
  isPendingPortfolioNavigation,
  scrollToElement,
  scrollToTop,
} from "../../lib/smoothScroll";

const MAX_HASH_TARGET_ATTEMPTS = 8;

export default function ScrollToTop() {
  const {
    hash,
    pathname,
  } = useLocation();

  useLayoutEffect(() => {
    const previousScrollRestoration =
      window.history.scrollRestoration;

    window.history.scrollRestoration = "manual";

    return () => {
      window.history.scrollRestoration =
        previousScrollRestoration;
    };
  }, []);

  useLayoutEffect(() => {
    const sectionId = hash
      ? decodeURIComponent(hash.replace("#", ""))
      : null;

    let animationFrame = 0;
    let attempts = 0;

    const restorePosition = () => {
      const target = sectionId
        ? document.getElementById(sectionId)
        : null;

      if (target) {
        const portfolioTarget =
          pathname === "/" &&
          isPortfolioSection(sectionId);

        if (
          portfolioTarget &&
          isPendingPortfolioNavigation(sectionId)
        ) {
          window.setTimeout(() => {
            clearPendingPortfolioNavigation(sectionId);
          }, 0);

          return;
        }

        scrollToElement(target, {
          immediate: true,
          offset: portfolioTarget
            ? -HEADER_SCROLL_OFFSET
            : 0,
        });

        return;
      }

      attempts += 1;

      if (
        sectionId &&
        attempts < MAX_HASH_TARGET_ATTEMPTS
      ) {
        animationFrame =
          window.requestAnimationFrame(
            restorePosition
          );
        return;
      }

      if (!sectionId) {
        scrollToTop({
          immediate: true,
        });
      }
    };

    animationFrame = window.requestAnimationFrame(
      restorePosition
    );

    return () => {
      window.cancelAnimationFrame(animationFrame);
    };
  }, [hash, pathname]);

  return null;
}
