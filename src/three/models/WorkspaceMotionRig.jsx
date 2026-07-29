import {
  useEffect,
  useRef,
} from "react";
import {
  useFrame,
  useThree,
} from "@react-three/fiber";
import * as THREE from "three";

export default function WorkspaceMotionRig({
  children,
  enabled = true,
}) {
  const groupRef = useRef(null);
  const elapsedRef = useRef(0);
  const invalidate = useThree(
    (state) => state.invalidate
  );

  useEffect(() => {
    const group = groupRef.current;

    if (!group || enabled) {
      return;
    }

    group.rotation.set(0, 0, 0);
    invalidate();
  }, [enabled, invalidate]);

  useFrame((state, delta) => {
    const group = groupRef.current;

    if (!group || !enabled) {
      return;
    }

    elapsedRef.current += delta;

    const elapsed = elapsedRef.current;
    const pointerX = state.pointer.x;
    const pointerY = state.pointer.y;

    const pointerRotationY = pointerX * 0.035;
    const pointerRotationX = -pointerY * 0.018;

    const idleRotationY =
      Math.sin(elapsed * 0.35) * 0.009;

    const idleRotationX =
      Math.cos(elapsed * 0.28) * 0.004;

    const smoothing =
      1 - Math.exp(-3.5 * delta);

    group.rotation.y = THREE.MathUtils.lerp(
      group.rotation.y,
      pointerRotationY + idleRotationY,
      smoothing
    );

    group.rotation.x = THREE.MathUtils.lerp(
      group.rotation.x,
      pointerRotationX + idleRotationX,
      smoothing
    );
  });

  return <group ref={groupRef}>{children}</group>;
}