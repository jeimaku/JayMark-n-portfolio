import { useState } from "react";
import * as THREE from "three";
import {
  Billboard,
  Html,
  Line,
  useCursor,
} from "@react-three/drei";

export default function ProfessionalHotspot({
  item,
  active = false,
  onActivate,
}) {
  const [hovered, setHovered] = useState(false);

  useCursor(hovered);

  const showLabel = active || hovered;

  const handlePointerOver = (event) => {
    event.stopPropagation();
    setHovered(true);
  };

  const handlePointerOut = (event) => {
    event.stopPropagation();
    setHovered(false);
  };

  const handleClick = (event) => {
    event.stopPropagation();
    onActivate?.(item.id);
  };

  return (
    <group position={item.position}>
      {/* Small line connecting the marker to the object */}
      <Line
        points={[
          [0, -0.2, 0],
          [0, 0, 0],
        ]}
        color={item.accent}
        lineWidth={1}
        transparent
        opacity={active ? 0.8 : 0.32}
      />

      <Billboard follow>
        {/* Clickable center marker */}
        <mesh
          scale={active ? 1.15 : 1}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
          onClick={handleClick}
        >
          <circleGeometry args={[0.065, 24]} />

          <meshBasicMaterial
            color={item.accent}
            toneMapped={false}
            depthWrite={false}
          />
        </mesh>

        {/* Outer marker ring */}
        <mesh scale={active ? 1.55 : 1.3}>
          <ringGeometry args={[0.09, 0.108, 32]} />

          <meshBasicMaterial
            color={item.accent}
            transparent
            opacity={active ? 0.8 : 0.38}
            side={THREE.DoubleSide}
            toneMapped={false}
            depthWrite={false}
          />
        </mesh>
      </Billboard>

      {showLabel ? (
        <Html
          center
          position={[0, 0.22, 0]}
          distanceFactor={8}
          zIndexRange={[40, 20]}
          style={{
            pointerEvents: "none",
          }}
        >
          <div className="whitespace-nowrap rounded-full border border-white/10 bg-neutral-950/90 px-3 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-white shadow-xl backdrop-blur">
            {item.shortLabel}
          </div>
        </Html>
      ) : null}
    </group>
  );
}