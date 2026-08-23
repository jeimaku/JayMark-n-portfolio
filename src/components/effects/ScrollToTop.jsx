import {
  useEffect,
  useLayoutEffect,
  useRef,
} from "react";
import { useLocation } from "react-router";

const LAST_SECTION_KEY = "jaymark-portfolio:last-section";

const SECTION_IDS = [
  "home",
  "about",
  "skills",
  "projects",
  "experience",
  "education",
  "certifications",
  "contact",
];

function readLastSection() {
  try {
    const sectionId = window.sessionStorage.getItem(
      LAST_SECTION_KEY
    );

    return SECTION_IDS.includes(sectionId)
      ? sectionId
      : null;
  } catch {
    return null;
  }
}

function writeLastSection(sectionId) {
  try {

    window.sessionStorage.setItem(
      LAST_SECTION_KEY,
      sectionId
    );
  } catch {
    // Storage can be unavailable in private browsing modes.
  }
}

function getCurrentSection() {
  const marker = window.innerHeight * 0.34;
  let currentSection = "home";

  for (const sectionId of SECTION_IDS) {
    const section = document.getElementById(sectionId);

    if (section && section.getBoundingClientRect().top <= marker) {
      currentSection = sectionId;
    }
  }

  return currentSection;
}

function isDocumentReload() {
  const navigationEntry =
    window.performance?.getEntriesByType?.(
      "navigation"
    )?.[0];

  return navigationEntry?.type === "reload";
}

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const initialPositionHandledRef =
    useRef(false);

  const restoreTimeoutRef =
    useRef(null);
    useRef(false);

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
    const hashSection = hash
      ? decodeURIComponent(hash.replace("#", ""))
      : null;
    const isInitialAppEntry =
      !initialPositionHandledRef.current;
    const shouldRestoreLastSection =
      isInitialAppEntry &&
      pathname === "/" &&
      !hashSection &&
      isDocumentReload();
    const restoredSection = null;
    const targetSection =
      hashSection || restoredSection;
    let frameId = 0;
    let secondFrameId = 0;

    const restorePosition = () => {
      initialPositionHandledRef.current =
        true;

      const element = targetSection
        ? document.getElementById(targetSection)
        : null;

      if (element) {
        element.scrollIntoView({
          behavior: "auto",
          block: "start",
        });
        writeLastSection(targetSection);
        return;
      }

      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "auto",
      });
      writeLastSection("home");
    };

    frameId = window.requestAnimationFrame(() => {
      secondFrameId = window.requestAnimationFrame(() => {
        restoreTimeoutRef.current =
          window.setTimeout(() => {
            restorePosition();
          }, 500);
      });
    });

    return () => {
      window.cancelAnimationFrame(frameId);
      window.cancelAnimationFrame(secondFrameId);

      if (restoreTimeoutRef.current) {
        window.clearTimeout(
          restoreTimeoutRef.current
        );
      }
    };
  }, [pathname, hash]);

  useEffect(() => {
    if (pathname !== "/" || hash) {
      return undefined;
    }

    let frameId = 0;

    const rememberCurrentSection = () => {
      frameId = 0;
      writeLastSection(getCurrentSection());
    };

    const handleScroll = () => {
      if (frameId === 0) {
        frameId = window.requestAnimationFrame(
          rememberCurrentSection
        );
      }
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.cancelAnimationFrame(frameId);
    };
  }, [pathname, hash]);

  return null;
}
