import {
  useEffect,
  useMemo,
  useState,
} from "react";
import WebGL from "three/addons/capabilities/WebGL.js";

import {
  useElementInView,
  useMediaQuery,
  usePageVisibility,
} from "../../hooks/useHeroRuntime";

import ThreeCanvas from "../../three/canvas/ThreeCanvas";
import HeroWorkspaceScene from "../../three/scenes/HeroWorkspaceScene";

import HeroStaticFallback from "./HeroStaticFallback";
import ThreeErrorBoundary from "./ThreeErrorBoundary";

export default function HeroExperience() {
  const isMobile = useMediaQuery(
    "(max-width: 767px)"
  );

  const reducedMotion = useMediaQuery(
    "(prefers-reduced-motion: reduce)"
  );

  const pageVisible = usePageVisibility();

  const { elementRef, isInView } =
    useElementInView({
      rootMargin: "180px",
      threshold: 0.01,
    });

  const [quality, setQuality] = useState(
    isMobile ? "balanced" : "high"
  );

  useEffect(() => {
    setQuality(isMobile ? "balanced" : "high");
  }, [isMobile]);

  const webGLAvailable = useMemo(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return WebGL.isWebGL2Available();
  }, []);

  const forceStaticFallback =
    import.meta.env.DEV &&
    typeof window !== "undefined" &&
    new URLSearchParams(
      window.location.search
    ).get("static") === "1";

  const active = isInView && pageVisible;

  const fallback = (
    <HeroStaticFallback
      message={
        reducedMotion
          ? "A motion-free workspace preview is shown."
          : "The static workspace preview is shown because interactive 3D is unavailable."
      }
    />
  );

  if (!webGLAvailable || forceStaticFallback) {
    return (
      <div ref={elementRef} className="h-full w-full">
        {fallback}
      </div>
    );
  }

  return (
    <div ref={elementRef} className="h-full w-full">
      <ThreeErrorBoundary fallback={fallback}>
        <ThreeCanvas
          isMobile={isMobile}
          reducedMotion={reducedMotion}
          active={active}
          fallback={fallback}
          onQualityChange={setQuality}
        >
          <HeroWorkspaceScene
            quality={quality}
            isMobile={isMobile}
            reducedMotion={reducedMotion}
            active={active}
          />
        </ThreeCanvas>
      </ThreeErrorBoundary>
    </div>
  );
}