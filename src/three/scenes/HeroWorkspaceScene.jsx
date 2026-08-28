import { Suspense } from "react";
import {
  ContactShadows,
  Environment,
  OrbitControls,
} from "@react-three/drei";

import { HERO_HDRI_PATH } from "../config/heroSceneConfig";
import HeroWorkspace from "../models/HeroWorkspace";

export default function HeroWorkspaceScene({
  quality = "high",
  isMobile = false,
  reducedMotion = false,
  active = true,
  activeContextId,
  onContextChange,
}) {
  const useEnvironment = quality !== "low";

  const useContactShadows =
    quality === "high" && !isMobile;

  const motionEnabled =
    active &&
    !isMobile &&
    !reducedMotion &&
    quality !== "low";

  const showHotspots = !isMobile;

  return (
    <>
      <color attach="background" args={["#050505"]} />

      {useEnvironment ? (
        <Suspense fallback={null}>
          <Environment
            files={HERO_HDRI_PATH}
            background={false}
            environmentIntensity={
              quality === "high" ? 0.55 : 0.38
            }
          />
        </Suspense>
      ) : null}

      <ambientLight
        intensity={quality === "low" ? 0.95 : 0.7}
      />

      <hemisphereLight
        color="#e5e5e5"
        groundColor="#050505"
        intensity={quality === "low" ? 0.9 : 0.7}
      />

      <directionalLight
        position={[4.5, 6, 5]}
        intensity={quality === "low" ? 1.6 : 1.4}
        color="#ffffff"
      />

      {quality !== "low" ? (
        <>
          <pointLight
            position={[-2.8, 2.2, 2.8]}
            intensity={3.5}
            distance={7}
            decay={2}
            color="#f5f5f5"
          />

          <pointLight
            position={[2.6, 2, -2]}
            intensity={2}
            distance={6}
            decay={2}
            color="#b8b8b8"
          />
        </>
      ) : null}

      <HeroWorkspace
        motionEnabled={motionEnabled}
        activeContextId={activeContextId}
        onContextChange={onContextChange}
        showHotspots={showHotspots}
      />
      
      {useContactShadows ? (
        <ContactShadows
          position={[0, 0.025, 0]}
          opacity={0.28}
          scale={[5.25, 3.2]}
          blur={2.8}
          far={2.5}
          resolution={256}
          color="#000000"
          frames={1}
        />
      ) : null}

      {!isMobile && !reducedMotion ? (
        <OrbitControls
          makeDefault
          enablePan={false}
          enableZoom={false}
          enableDamping
          dampingFactor={0.07}
          rotateSpeed={0.42}
          minAzimuthAngle={-0.32}
          maxAzimuthAngle={0.32}
          minPolarAngle={Math.PI / 3.25}
          maxPolarAngle={Math.PI / 2.3}
          target={[-0.35, 0.72, 0]}
        />
      ) : null}
    </>
  );
}