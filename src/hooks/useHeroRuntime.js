import {
  useEffect,
  useRef,
  useState,
} from "react";

export function useMediaQuery(query) {
  const getInitialValue = () => {
    if (typeof window === "undefined") {
      return false;
    }

    return window.matchMedia(query).matches;
  };

  const [matches, setMatches] = useState(getInitialValue);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);

    const updateMatches = () => {
      setMatches(mediaQuery.matches);
    };

    updateMatches();

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", updateMatches);

      return () => {
        mediaQuery.removeEventListener(
          "change",
          updateMatches
        );
      };
    }

    mediaQuery.addListener(updateMatches);

    return () => {
      mediaQuery.removeListener(updateMatches);
    };
  }, [query]);

  return matches;
}

export function usePageVisibility() {
  const getInitialValue = () => {
    if (typeof document === "undefined") {
      return true;
    }

    return document.visibilityState === "visible";
  };

  const [isVisible, setIsVisible] =
    useState(getInitialValue);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(
        document.visibilityState === "visible"
      );
    };

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange
    );

    return () => {
      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );
    };
  }, []);

  return isVisible;
}

export function useElementInView({
  rootMargin = "160px",
  threshold = 0.01,
} = {}) {
  const elementRef = useRef(null);
  const [isInView, setIsInView] = useState(true);

  useEffect(() => {
    const element = elementRef.current;

    if (!element) {
      return undefined;
    }

    if (!("IntersectionObserver" in window)) {
      setIsInView(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin,
        threshold,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [rootMargin, threshold]);

  return {
    elementRef,
    isInView,
  };
}