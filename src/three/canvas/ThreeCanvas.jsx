import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";

import SceneLoader from "./SceneLoader";

export default function ThreeCanvas({ children, className = "" }) {
  return (
    <div className={`relative h-full w-full ${className}`}>
      <Canvas
        dpr={[1, 1.5]}
        camera={{
          position: [0, 1.2, 5],
          fov: 42,
          near: 0.1,
          far: 100,
        }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        performance={{
          min: 0.5,
        }}
      >
        <Suspense fallback={<SceneLoader />}>
          {children}
        </Suspense>
      </Canvas>
    </div>
  );
}