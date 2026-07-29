export default function MonitorScreenGlow() {
  return (
    <pointLight
      position={[-0.94, 1.55, 0.72]}
      color="#22d3ee"
      intensity={0.38}
      distance={2}
      decay={2}
    />
  );
}