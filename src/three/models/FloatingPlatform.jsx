export default function FloatingPlatform() {
  return (
    <group>
      {/* Main platform — top surface is approximately Y = 0 */}
      <mesh position={[0, -0.16, 0]} receiveShadow>
        <boxGeometry args={[5.6, 0.28, 3.5]} />

        <meshStandardMaterial
          color="#07111f"
          metalness={0.5}
          roughness={0.48}
        />
      </mesh>

      {/* Lower illuminated layer */}
      <mesh position={[0, -0.34, 0]}>
        <boxGeometry args={[5.25, 0.1, 3.2]} />

        <meshStandardMaterial
          color="#062b38"
          emissive="#0891b2"
          emissiveIntensity={0.25}
          metalness={0.35}
          roughness={0.5}
        />
      </mesh>

      {/* Thin top accent */}
      <mesh position={[0, -0.005, 0]}>
        <boxGeometry args={[5.35, 0.025, 3.25]} />

        <meshStandardMaterial
          color="#164e63"
          emissive="#22d3ee"
          emissiveIntensity={0.18}
          metalness={0.4}
          roughness={0.4}
        />
      </mesh>

      {/* Subtle technical ring */}
      <mesh
        position={[0.25, 0.012, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <ringGeometry args={[1.35, 1.38, 64]} />

        <meshBasicMaterial
          color="#22d3ee"
          transparent
          opacity={0.2}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}