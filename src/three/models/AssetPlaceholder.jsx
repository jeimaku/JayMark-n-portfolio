export default function AssetPlaceholder({
  position = [0, 0, 0],
  size = [0.4, 0.4, 0.4],
  color = "#164e63",
}) {
  return (
    <mesh position={position}>
      <boxGeometry args={size} />

      <meshStandardMaterial
        color={color}
        emissive="#22d3ee"
        emissiveIntensity={0.15}
        transparent
        opacity={0.45}
        wireframe
      />
    </mesh>
  );
}