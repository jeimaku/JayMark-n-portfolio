export default function AssetPlaceholder({
  position = [0, 0, 0],
  size = [0.4, 0.4, 0.4],
  color = "#2a2a2a",
}) {
  return (
    <mesh position={position}>
      <boxGeometry args={size} />

      <meshStandardMaterial
        color={color}
        emissive="#f5f5f5"
        emissiveIntensity={0.15}
        transparent
        opacity={0.45}
        wireframe
      />
    </mesh>
  );
}