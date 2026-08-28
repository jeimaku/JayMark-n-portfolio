import { useEffect, useMemo } from "react";
import { useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

import { getMonitorInterfaceTexture } from "../materials/monitorInterfaceTexture";

function getReferenceDimension(size, fit) {
  switch (fit) {
    case "width":
      return size.x;

    case "depth":
      return size.z;

    case "height":
      return size.y;

    default:
      return Math.max(size.x, size.y, size.z);
  }
}

export default function MonitorAssembly({
  url,
  layout,
  screen,
  materialStyler,
}) {
  const { scene } = useGLTF(url);
  const { gl } = useThree();

  const monitorData = useMemo(() => {
    const clonedScene = scene.clone(true);

    clonedScene.traverse((object) => {
      if (!object.isMesh) {
        return;
      }

      object.castShadow = true;
      object.receiveShadow = true;

      const originalMaterials = Array.isArray(object.material)
        ? object.material
        : [object.material];

      const clonedMaterials = originalMaterials.map(
        (originalMaterial) => {
          const clonedMaterial = originalMaterial.clone();

          materialStyler?.({
            object,
            material: clonedMaterial,
          });

          return clonedMaterial;
        }
      );

      object.material = Array.isArray(object.material)
        ? clonedMaterials
        : clonedMaterials[0];
    });

    clonedScene.updateMatrixWorld(true);

    const originalBox = new THREE.Box3().setFromObject(clonedScene);
    const originalSize = new THREE.Vector3();
    const originalCenter = new THREE.Vector3();

    originalBox.getSize(originalSize);
    originalBox.getCenter(originalCenter);

    const referenceDimension = getReferenceDimension(
      originalSize,
      layout.fit
    );

    const scale =
      referenceDimension > 0
        ? layout.targetSize / referenceDimension
        : 1;

    const offset = [
      -originalCenter.x * scale,
      -originalBox.min.y * scale,
      -originalCenter.z * scale,
    ];

    /*
     * Calculate the normalized front surface of the monitor.
     * The approved monitor's screen faces its local -Z direction.
     */
    const normalizedFrontZ =
      originalBox.min.z * scale + offset[2];

    return {
      scene: clonedScene,
      scale,
      offset,
      frontZ: normalizedFrontZ,
    };
  }, [
    layout.fit,
    layout.targetSize,
    materialStyler,
    scene,
  ]);

  const interfaceTexture = useMemo(
    () => getMonitorInterfaceTexture(),
    []
  );

  useEffect(() => {
    /*
     * Anisotropic filtering improves texture sharpness when the monitor
     * is viewed at an angle.
     */
    const maximumAnisotropy =
      gl.capabilities.getMaxAnisotropy();

    interfaceTexture.anisotropy = Math.min(
      maximumAnisotropy,
      8
    );

    interfaceTexture.needsUpdate = true;
  }, [gl, interfaceTexture]);

  const screenZ =
    monitorData.frontZ - screen.surfaceOffset;

  return (
    <group
      position={layout.position}
      rotation={layout.rotation}
      visible={layout.visible ?? true}
    >
      {/* Physical monitor model */}
      <group position={monitorData.offset}>
        <primitive
          object={monitorData.scene}
          scale={monitorData.scale}
        />
      </group>

      {/* Dashboard attached directly to the monitor */}
      <mesh
        position={[
          screen.centerX,
          screen.centerY,
          screenZ,
        ]}
        rotation={screen.rotation}
        renderOrder={2}
      >
        <planeGeometry
          args={[
            screen.width,
            screen.height,
          ]}
        />

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

      {/* Glow also follows the monitor */}
      <pointLight
        position={[
          screen.centerX,
          screen.centerY,
          screenZ - 0.28,
        ]}
        color="#f5f5f5"
        intensity={0.32}
        distance={1.8}
        decay={2}
      />
    </group>
  );
}