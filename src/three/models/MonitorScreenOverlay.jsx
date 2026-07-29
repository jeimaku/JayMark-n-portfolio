import { useMemo } from "react";

import { getMonitorInterfaceTexture } from "../materials/monitorInterfaceTexture";

export default function MonitorScreenOverlay({
  position,
  rotation,
  width,
  height,
}) {
  const interfaceTexture = useMemo(
    () => getMonitorInterfaceTexture(),
    []
  );

  return (
    <mesh
      position={position}
      rotation={rotation}
      renderOrder={2}
    >
      <planeGeometry args={[width, height]} />

      <meshBasicMaterial
        map={interfaceTexture}
        toneMapped={false}
        depthTest
        depthWrite={false}
        polygonOffset
        polygonOffsetFactor={-2}
        polygonOffsetUnits={-2}
      />
    </mesh>
  );
}