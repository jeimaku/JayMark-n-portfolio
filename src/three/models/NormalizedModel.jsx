import { useMemo } from "react";
import * as THREE from "three";
import { Clone, useGLTF } from "@react-three/drei";

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

export default function NormalizedModel({
  url,
  targetSize = 1,
  fit = "height",
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  visible = true,
}) {
  const { scene } = useGLTF(url);

  const modelTransform = useMemo(() => {
    scene.updateMatrixWorld(true);

    const box = new THREE.Box3().setFromObject(scene);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();

    box.getSize(size);
    box.getCenter(center);

    const referenceDimension = getReferenceDimension(
      size,
      fit
    );

    if (
      !Number.isFinite(referenceDimension) ||
      referenceDimension <= 0
    ) {
      console.warn(
        `Unable to calculate dimensions for model: ${url}`
      );

      return {
        scale: 1,
        offset: [0, 0, 0],
      };
    }

    const scale = targetSize / referenceDimension;

    return {
      scale,
      offset: [
        -center.x * scale,
        -box.min.y * scale,
        -center.z * scale,
      ],
    };
  }, [fit, scene, targetSize, url]);

  return (
    <group
      position={position}
      rotation={rotation}
      visible={visible}
    >
      <group position={modelTransform.offset}>
        <Clone
          object={scene}
          scale={modelTransform.scale}
          castShadow
          receiveShadow
        />
      </group>
    </group>
  );
}