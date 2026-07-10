import { useLayoutEffect } from "react";
import { useLocation } from "react-router";

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useLayoutEffect(() => {
    if (hash) {
      const elementId = decodeURIComponent(hash.replace("#", ""));

      requestAnimationFrame(() => {
        const element = document.getElementById(elementId);

        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      });

      return;
    }

    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}