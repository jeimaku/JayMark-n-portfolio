import {
  useEffect,
  useMemo,
  useState,
} from "react";
import WebGL from "three/addons/capabilities/WebGL.js";

import {
  defaultHeroSceneContextId,
} from "../../data/heroSceneContext";

import {
  useElementInView,
  useMediaQuery,
  usePageVisibility,
} from "../../hooks/useHeroRuntime";

import ThreeCanvas from "../../three/canvas/ThreeCanvas";
import HeroWorkspaceScene from "../../three/scenes/HeroWorkspaceScene";

import HeroSceneContextOverlay from "./HeroSceneContextOverlay";
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

  const [activeContextId, setActiveContextId] =
    useState(defaultHeroSceneContextId);

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

  let experience;

  if (!webGLAvailable || forceStaticFallback) {
    experience = fallback;
  } else {
    experience = (
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
            activeContextId={activeContextId}
            onContextChange={setActiveContextId}
          />
        </ThreeCanvas>
      </ThreeErrorBoundary>
    );
  }

  return (
    <div
      ref={elementRef}
      className="relative h-full w-full"
    >
      {experience}

      <HeroSceneContextOverlay
        activeContextId={activeContextId}
        onContextChange={setActiveContextId}
      />
    </div>
  );
}