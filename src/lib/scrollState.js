import {
  PORTFOLIO_SECTIONS,
} from "./smoothScroll";

const subscribers = new Set();

let activeTrackerCount = 0;
let animationFrame = 0;
let scrollState = {
  activeSection: "home",
  isScrolled: false,
  scrollProgress: 0,
};

function getDocumentScrollProgress() {
  const scrollableDistance =
    document.documentElement.scrollHeight -
    window.innerHeight;

  if (scrollableDistance <= 0) {
    return 0;
  }

  return Math.min(
    1,
    Math.max(
      0,
      window.scrollY / scrollableDistance
    )
  );
}

function getCurrentSection() {
  const viewportProbe = Math.min(
    window.innerHeight * 0.32,
    260
  );

  const reachedPageEnd =
    window.scrollY + window.innerHeight >=
    document.documentElement.scrollHeight - 8;

  if (reachedPageEnd) {
    return "contact";
  }

  let currentSection =
    PORTFOLIO_SECTIONS[0].id;

  for (const item of PORTFOLIO_SECTIONS) {
    const section = document.getElementById(
      item.id
    );

    if (!section) {
      continue;
    }

    const bounds = section.getBoundingClientRect();

    if (
      bounds.top <= viewportProbe &&
      bounds.bottom > viewportProbe
    ) {
      return item.id;
    }

    if (bounds.top <= viewportProbe) {
      currentSection = item.id;
    }
  }

  return currentSection;
}

function notifySubscribers() {
  subscribers.forEach((subscriber) => {
    subscriber();
  });
}

function updateScrollState() {
  animationFrame = 0;

  const nextState = {
    activeSection: getCurrentSection(),
    isScrolled: window.scrollY > 24,
    scrollProgress: getDocumentScrollProgress(),
  };

  if (
    nextState.activeSection ===
      scrollState.activeSection &&
    nextState.isScrolled === scrollState.isScrolled &&
    nextState.scrollProgress ===
      scrollState.scrollProgress
  ) {
    return;
  }

  scrollState = nextState;
  notifySubscribers();
}

function scheduleScrollStateUpdate() {
  if (animationFrame) {
    return;
  }

  animationFrame = window.requestAnimationFrame(
    updateScrollState
  );
}

export function getScrollStateSnapshot() {
  return scrollState;
}

export function subscribeToScrollState(subscriber) {
  subscribers.add(subscriber);

  return () => {
    subscribers.delete(subscriber);
  };
}

export function startScrollStateTracking() {
  if (typeof window === "undefined") {
    return () => {};
  }

  activeTrackerCount += 1;

  if (activeTrackerCount === 1) {
    window.addEventListener(
      "scroll",
      scheduleScrollStateUpdate,
      {
        passive: true,
      }
    );

    window.addEventListener(
      "resize",
      scheduleScrollStateUpdate
    );

    window.addEventListener(
      "hashchange",
      scheduleScrollStateUpdate
    );
  }

  scheduleScrollStateUpdate();

  return () => {
    activeTrackerCount -= 1;

    if (activeTrackerCount > 0) {
      return;
    }

    activeTrackerCount = 0;

    if (animationFrame) {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = 0;
    }

    window.removeEventListener(
      "scroll",
      scheduleScrollStateUpdate
    );

    window.removeEventListener(
      "resize",
      scheduleScrollStateUpdate
    );

    window.removeEventListener(
      "hashchange",
      scheduleScrollStateUpdate
    );
  };
}
