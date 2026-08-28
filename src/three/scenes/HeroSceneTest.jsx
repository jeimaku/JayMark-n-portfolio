import {
  Bounds,
  Center,
  Environment,
  OrbitControls,
} from "@react-three/drei";

import MonitorModel from "../models/MonitorModel";

const HDRI_PATH =
  "/old-portfolio-assets/3d/hero/environment/studio-small-08/studio_small_08_1k.hdr";

export default function HeroSceneTest() {
  return (
    <>
      <color attach="background" args={["#050505"]} />

      <ambientLight intensity={0.25} />

      <directionalLight
        position={[4, 6, 5]}
        intensity={1.2}
        castShadow={false}
      />

      <Environment
        files={HDRI_PATH}
        background={false}
        environmentIntensity={0.8}
      />

      <Bounds fit clip observe margin={1.35}>
        <Center>
          <MonitorModel />
        </Center>
      </Bounds>

      <OrbitControls
        makeDefault
        enablePan={false}
        enableZoom
        minDistance={2}
        maxDistance={8}
      />
    </>
  );
}