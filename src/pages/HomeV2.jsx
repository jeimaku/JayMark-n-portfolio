import ThreeCanvas from "../three/canvas/ThreeCanvas";
import HeroSceneTest from "../three/scenes/HeroSceneTest";

export default function HomeV2() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="min-h-screen bg-slate-950 text-slate-50 focus:outline-none"
    >
      <section
        id="home"
        className="relative min-h-screen overflow-hidden pt-24"
      >
        <div className="mx-auto grid min-h-[calc(100vh-6rem)] w-full max-w-7xl items-center gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div className="relative z-10">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-200">
              Version 2 Development Preview
            </p>

            <h1 className="mt-5 text-4xl font-semibold tracking-[-0.05em] text-white sm:text-5xl lg:text-6xl">
              Interactive Systems Workspace
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-slate-400 sm:text-lg">
              This preview validates the first GLB model, the React Three
              Fiber canvas, and the selected HDRI environment.
            </p>

            <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="text-sm leading-7 text-slate-300">
                Rotate the model by dragging it. Use the mouse wheel to
                test zooming. These controls are temporary development
                tools.
              </p>
            </div>
          </div>

          <div className="relative h-[28rem] overflow-hidden rounded-[2rem] border border-cyan-300/15 bg-slate-900/40 shadow-2xl shadow-black/40 sm:h-[34rem] lg:h-[42rem]">
            <ThreeCanvas>
              <HeroSceneTest />
            </ThreeCanvas>
          </div>
        </div>
      </section>
    </main>
  );
}