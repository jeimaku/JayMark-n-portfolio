import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function WorkspaceMotionRig({ children }) {
  const groupRef = useRef(null);
  const elapsedRef = useRef(0);

  useFrame((state, delta) => {
    const group = groupRef.current;

    if (!group) {
      return;
    }

    elapsedRef.current += delta;

    const elapsed = elapsedRef.current;
    const pointerX = state.pointer.x;
    const pointerY = state.pointer.y;

    /*
     * Pointer movement remains intentionally restrained.
     */
    const pointerRotationY = pointerX * 0.035;
    const pointerRotationX = -pointerY * 0.018;

    /*
     * Slow automatic drift prevents the scene from feeling static.
     */
    const idleRotationY = Math.sin(elapsed * 0.35) * 0.009;
    const idleRotationX = Math.cos(elapsed * 0.28) * 0.004;

    const targetRotationY =
      pointerRotationY + idleRotationY;

    const targetRotationX =
      pointerRotationX + idleRotationX;

    /*
     * Frame-rate-independent smoothing.
     */
    const smoothing = 1 - Math.exp(-3.5 * delta);

    group.rotation.y = THREE.MathUtils.lerp(
      group.rotation.y,
      targetRotationY,
      smoothing
    );

    group.rotation.x = THREE.MathUtils.lerp(
      group.rotation.x,
      targetRotationX,
      smoothing
    );
  });

  return <group ref={groupRef}>{children}</group>;
}