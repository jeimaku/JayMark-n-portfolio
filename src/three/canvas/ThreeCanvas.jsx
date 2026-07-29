import { Canvas } from "@react-three/fiber";

export default function ThreeCanvas({
  children,
  className = "",
}) {
  return (
    <div className={`relative h-full w-full ${className}`}>
      <Canvas
        shadows="basic"
        dpr={[1, 1.5]}
        camera={{
          position: [6.8, 3.7, 7.8],
          fov: 38,
          near: 0.1,
          far: 100,
        }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        performance={{
          min: 0.5,
        }}
      >
        {children}
      </Canvas>
    </div>
  );
}