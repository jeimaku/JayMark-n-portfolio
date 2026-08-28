export default function SiteBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-neutral-950"
    >
      {/* Base depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.035),transparent_32rem),radial-gradient(circle_at_top_right,rgba(163,163,163,0.025),transparent_34rem),linear-gradient(180deg,#050505_0%,#050505_45%,#020202_100%)]" />

      {/* Soft accent glows */}
      <div className="absolute left-[-12rem] top-[-10rem] h-[32rem] w-[32rem] rounded-full bg-neutral-300/[0.055] blur-3xl" />
      <div className="absolute right-[-14rem] top-[8rem] h-[36rem] w-[36rem] rounded-full bg-neutral-600/[0.045] blur-3xl" />
      <div className="absolute bottom-[-18rem] left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-neutral-100/5 blur-3xl" />

      {/* Minimal grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(163,163,163,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(163,163,163,0.045)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_72%)]" />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(5,5,5,0.28)_55%,rgba(5,5,5,0.95)_100%)]" />
    </div>
  );
}
