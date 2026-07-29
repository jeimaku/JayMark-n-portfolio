import { Html, useProgress } from "@react-three/drei";

export default function SceneLoader() {
  const { progress } = useProgress();

  return (
    <Html center>
      <div className="min-w-40 rounded-2xl border border-white/10 bg-slate-950/90 px-5 py-4 text-center shadow-2xl backdrop-blur">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">
          Loading workspace
        </p>

        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-cyan-300 transition-[width]"
            style={{
              width: `${Math.round(progress)}%`,
            }}
          />
        </div>

        <p className="mt-2 text-xs text-slate-400">
          {Math.round(progress)}%
        </p>
      </div>
    </Html>
  );
}