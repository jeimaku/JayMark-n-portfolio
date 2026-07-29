import { Suspense } from "react";
import {
  AdaptiveDpr,
  ContactShadows,
  Environment,
  OrbitControls,
} from "@react-three/drei";

import { HERO_HDRI_PATH } from "../config/heroSceneConfig";
import HeroWorkspace from "../models/HeroWorkspace";

export default function HeroWorkspaceScene() {
  return (
    <>
      <color attach="background" args={["#020617"]} />

      {/* HDRI may load independently without hiding the models */}
      <Suspense fallback={null}>
        <Environment
          files={HERO_HDRI_PATH}
          background={false}
          environmentIntensity={0.55}
        />
      </Suspense>

      <ambientLight intensity={0.7} />

      <hemisphereLight
        color="#dbeafe"
        groundColor="#020617"
        intensity={0.7}
      />

      <directionalLight
        position={[4.5, 6, 5]}
        intensity={1.4}
        color="#ffffff"
      />

      <pointLight
        position={[-2.8, 2.2, 2.8]}
        intensity={3.5}
        distance={7}
        decay={2}
        color="#22d3ee"
      />

      <pointLight
        position={[2.6, 2, -2]}
        intensity={2}
        distance={6}
        decay={2}
        color="#818cf8"
      />

      <HeroWorkspace />

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

      <AdaptiveDpr pixelated />

      <OrbitControls
        makeDefault
        enablePan={false}
        enableZoom
        minDistance={6.2}
        maxDistance={10.5}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2.1}
        target={[-0.35, 0.72, 0]}
      />
    </>
  );
}