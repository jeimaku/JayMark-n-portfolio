import {
  useEffect,
  useState,
} from "react";
import { Canvas } from "@react-three/fiber";
import { PerformanceMonitor } from "@react-three/drei";

function getQualityFromFactor(factor) {
  if (factor < 0.28) {
    return "low";
  }

  if (factor < 0.66) {
    return "balanced";
  }

  return "high";
}

export default function ThreeCanvas({
  children,
  className = "",
  isMobile = false,
  reducedMotion = false,
  active = true,
  fallback = null,
  onQualityChange,
}) {
  const minimumDpr = 1;
  const maximumDpr = isMobile ? 1.2 : 1.5;

  const [dpr, setDpr] = useState(
    isMobile ? 1 : 1.25
  );

  useEffect(() => {
    setDpr(isMobile ? 1 : 1.25);
  }, [isMobile]);

  /*
   * Desktop receives the continuous loop needed for idle motion.
   * Mobile, reduced-motion, hidden, and off-screen modes render only
   * when something changes.
   */
  const continuousRendering =
    active && !isMobile && !reducedMotion;

  const frameloop = continuousRendering
    ? "always"
    : "demand";

  return (
    <div className={`relative h-full w-full ${className}`}>
      <Canvas
        fallback={fallback}
        frameloop={frameloop}
        shadows={isMobile ? false : "basic"}
        dpr={dpr}
        camera={{
          position: isMobile
            ? [7.7, 4.25, 8.9]
            : [6.8, 3.7, 7.8],
          fov: isMobile ? 44 : 38,
          near: 0.1,
          far: 100,
        }}
        gl={{
          antialias: !isMobile,
          alpha: true,
          powerPreference: "high-performance",
        }}
        performance={{
          min: 0.5,
          max: 1,
          debounce: 300,
        }}
      >
        {continuousRendering ? (
          <PerformanceMonitor
            factor={0.6}
            step={0.1}
            flipflops={5}
            bounds={(refreshRate) => {
              if (refreshRate > 90) {
                return [45, 82];
              }

              return [30, 55];
            }}
            onChange={({ factor }) => {
              const nextDpr =
                minimumDpr +
                (maximumDpr - minimumDpr) * factor;

              const roundedDpr =
                Math.round(nextDpr * 4) / 4;

              setDpr(roundedDpr);

              onQualityChange?.(
                getQualityFromFactor(factor)
              );
            }}
            onFallback={() => {
              setDpr(1);
              onQualityChange?.("low");
            }}
          />
        ) : null}

        {children}
      </Canvas>
    </div>
  );
}