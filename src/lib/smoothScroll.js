export const HEADER_SCROLL_OFFSET = 96;

export const PORTFOLIO_SECTIONS = [
  {
    id: "home",
    label: "Home",
  },
  {
    id: "about",
    label: "About",
  },
  {
    id: "skills",
    label: "Skills",
  },
  {
    id: "projects",
    label: "Projects",
  },
  {
    id: "experience",
    label: "Experience",
  },
  {
    id: "education",
    label: "Education",
  },
  {
    id: "certifications",
    label: "Certifications",
  },
  {
    id: "contact",
    label: "Contact",
  },
];

let smoothScrollInstance = null;
let pendingPortfolioNavigation = null;

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  );
}

function getElementScrollTarget(element, offset) {
  return Math.max(
    0,
    window.scrollY +
      element.getBoundingClientRect().top +
      offset
  );
}

export function setSmoothScrollInstance(instance) {
  smoothScrollInstance = instance;
}

export function clearSmoothScrollInstance(instance) {
  if (
    !instance ||
    smoothScrollInstance === instance
  ) {
    smoothScrollInstance = null;
  }
}

export function stopSmoothScroll() {
  smoothScrollInstance?.stop();
}

export function startSmoothScroll() {
  smoothScrollInstance?.start();
}

export function scrollToElement(
  element,
  {
    immediate = false,
    offset = -HEADER_SCROLL_OFFSET,
  } = {}
) {
  if (
    !element ||
    typeof window === "undefined"
  ) {
    return false;
  }

  const target = getElementScrollTarget(
    element,
    offset
  );

  if (smoothScrollInstance) {
    smoothScrollInstance.scrollTo(target, {
      immediate,
    });

    return true;
  }

  window.scrollTo({
    top: target,
    left: 0,
    behavior:
      immediate || prefersReducedMotion()
        ? "auto"
        : "smooth",
  });

  return true;
}

export function scrollToTop({ immediate = false } = {}) {
  if (typeof window === "undefined") {
    return;
  }

  if (smoothScrollInstance) {
    smoothScrollInstance.scrollTo(0, {
      immediate,
    });

    return;
  }

  window.scrollTo({
    top: 0,
    left: 0,
    behavior:
      immediate || prefersReducedMotion()
        ? "auto"
        : "smooth",
  });
}

export function isPortfolioSection(sectionId) {
  return PORTFOLIO_SECTIONS.some(
    (section) => section.id === sectionId
  );
}

export function scrollToPortfolioSection(
  sectionId,
  options
) {
  if (!isPortfolioSection(sectionId)) {
    return false;
  }

  return scrollToElement(
    document.getElementById(sectionId),
    options
  );
}

export function markPortfolioNavigation(sectionId) {
  if (!isPortfolioSection(sectionId)) {
    return;
  }

  pendingPortfolioNavigation = {
    expiresAt: Date.now() + 1000,
    sectionId,
  };
}

export function isPendingPortfolioNavigation(sectionId) {
  if (
    !pendingPortfolioNavigation ||
    Date.now() >
      pendingPortfolioNavigation.expiresAt
  ) {
    pendingPortfolioNavigation = null;
    return false;
  }

  return (
    pendingPortfolioNavigation.sectionId ===
    sectionId
  );
}

export function clearPendingPortfolioNavigation(sectionId) {
  if (
    pendingPortfolioNavigation?.sectionId ===
    sectionId
  ) {
    pendingPortfolioNavigation = null;
  }
}
