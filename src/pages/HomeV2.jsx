import ThreeCanvas from "../three/canvas/ThreeCanvas";
import HeroWorkspaceScene from "../three/scenes/HeroWorkspaceScene";

export default function HomeV2() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="min-h-screen bg-slate-950 text-slate-50 focus:outline-none"
    >
      <section
        id="home"
        className="relative min-h-screen overflow-hidden pt-20 sm:pt-24"
      >
        {/* Subtle background decoration */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
        >
          <div className="absolute left-[10%] top-[25%] h-72 w-72 rounded-full bg-cyan-400/[0.04] blur-3xl" />

          <div className="absolute right-[8%] top-[18%] h-80 w-80 rounded-full bg-indigo-400/[0.04] blur-3xl" />
        </div>

        <div className="relative mx-auto grid min-h-[calc(100vh-5rem)] w-full max-w-7xl items-center gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[0.88fr_1.12fr] lg:gap-12 lg:px-8 lg:py-12">
          {/* Hero content */}
          <div className="relative z-10 min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200 sm:text-sm">
              Version 2 Development Preview
            </p>

            <h1 className="mt-6 max-w-2xl text-4xl font-semibold tracking-[-0.055em] text-white sm:text-5xl lg:text-6xl lg:leading-[0.98]">
              Interactive Systems Workspace
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-slate-400 sm:text-lg">
              This preview combines the selected workstation,
              infrastructure, TalkReady, and environment assets into the
              first complete hero-scene composition.
            </p>

            <div className="mt-8 max-w-xl rounded-2xl border border-white/10 bg-white/[0.025] p-5 shadow-xl shadow-black/10 sm:p-6">
              <p className="text-sm leading-7 text-slate-300">
                Drag to inspect the workspace. Use the mouse wheel to test
                the camera limits. These controls are temporary development
                tools.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <div className="rounded-full border border-cyan-300/20 bg-cyan-300/[0.06] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-100">
                Full-Stack Systems
              </div>

              <div className="rounded-full border border-white/10 bg-white/[0.025] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">
                AI Platforms
              </div>

              <div className="rounded-full border border-white/10 bg-white/[0.025] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">
                IT Infrastructure
              </div>
            </div>
          </div>

          {/* 3D preview */}
          <div className="relative min-w-0">
            <div className="relative h-[30rem] overflow-hidden rounded-[2rem] border border-cyan-300/15 bg-slate-900/30 shadow-2xl shadow-black/40 sm:h-[36rem] lg:h-[42rem]">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_60%_38%,rgba(34,211,238,0.07),transparent_24rem)]"
              />

              <ThreeCanvas>
                <HeroWorkspaceScene />
              </ThreeCanvas>
            </div>

            <div className="pointer-events-none absolute bottom-4 left-1/2 z-10 -translate-x-1/2 rounded-full border border-white/10 bg-slate-950/70 px-4 py-2 text-center text-xs text-slate-400 backdrop-blur">
              Interactive development preview
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}