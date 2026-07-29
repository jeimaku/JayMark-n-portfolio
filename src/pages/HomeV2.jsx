import HeroExperience from "../components/v2/HeroExperience";
import { heroContent } from "../data/heroContent";

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className="h-4 w-4"
    >
      <path
        d="M4.5 10h11m-4.25-4.25L15.5 10l-4.25 4.25"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DocumentIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className="h-4 w-4"
    >
      <path
        d="M6 2.75h5.25L15 6.5v10.75H6V2.75Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      <path
        d="M11 2.75V6.5h4M8.25 10h4.5M8.25 13h4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ContactIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className="h-4 w-4"
    >
      <path
        d="M3 5.25h14v9.5H3v-9.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      <path
        d="m3.75 6 6.25 4.75L16.25 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function HomeV2() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="min-h-screen bg-slate-950 text-slate-50 focus:outline-none"
    >
      <section
        id="home"
        aria-labelledby="hero-title"
        className="relative min-h-screen overflow-hidden pt-20 sm:pt-24"
      >
        {/* Background atmosphere */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
        >
          <div className="absolute left-[8%] top-[20%] h-80 w-80 rounded-full bg-cyan-400/[0.045] blur-3xl" />

          <div className="absolute right-[7%] top-[16%] h-96 w-96 rounded-full bg-indigo-400/[0.04] blur-3xl" />

          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-300/20 to-transparent" />
        </div>

        <div className="relative mx-auto grid min-h-[calc(100vh-5rem)] w-full max-w-7xl items-center gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[0.88fr_1.12fr] lg:gap-12 lg:px-8 lg:py-12">
          {/* Professional hero content */}
          <div className="relative z-10 min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200 sm:text-sm">
                {heroContent.eyebrow}
              </p>

              <span
                aria-hidden="true"
                className="hidden h-1 w-1 rounded-full bg-slate-600 sm:block"
              />

              <div
                role="status"
                className="inline-flex items-center gap-2 text-xs font-medium text-slate-400"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50 motion-reduce:animate-none" />

                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>

                Available for opportunities
              </div>
            </div>

            <h1
              id="hero-title"
              className="mt-6 max-w-2xl tracking-[-0.055em]"
            >
              <span className="block text-4xl font-semibold text-white sm:text-5xl lg:text-6xl lg:leading-[0.98]">
                {heroContent.name}
              </span>

              <span className="mt-4 block max-w-xl text-xl font-medium leading-tight text-cyan-100 sm:text-2xl lg:text-3xl">
                {heroContent.role}
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
              {heroContent.summary}
            </p>

            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-500">
              {heroContent.availability}
            </p>

            {/* Calls to action */}
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={heroContent.primaryAction.href}
                className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-950/20 transition duration-300 hover:bg-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200 focus-visible:ring-offset-4 focus-visible:ring-offset-slate-950"
              >
                {heroContent.primaryAction.label}

                <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                  <ArrowIcon />
                </span>
              </a>

              <a
                href={heroContent.resumeAction.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white transition duration-300 hover:border-cyan-200/40 hover:bg-cyan-300/[0.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200 focus-visible:ring-offset-4 focus-visible:ring-offset-slate-950"
              >
                <DocumentIcon />

                {heroContent.resumeAction.label}
              </a>

              <a
                href={heroContent.contactAction.href}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-slate-300 transition duration-300 hover:border-white/25 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200 focus-visible:ring-offset-4 focus-visible:ring-offset-slate-950"
              >
                <ContactIcon />

                {heroContent.contactAction.label}
              </a>
            </div>

            {/* Professional focus areas */}
            <ul
              aria-label="Professional focus areas"
              className="mt-8 flex flex-wrap gap-2.5"
            >
              {heroContent.specialties.map((specialty, index) => (
                <li
                  key={specialty}
                  className={[
                    "rounded-full border px-4 py-2",
                    "text-[0.68rem] font-semibold uppercase",
                    "tracking-[0.18em]",
                    index === 0
                      ? "border-cyan-300/25 bg-cyan-300/[0.07] text-cyan-100"
                      : "border-white/10 bg-white/[0.025] text-slate-300",
                  ].join(" ")}
                >
                  {specialty}
                </li>
              ))}
            </ul>
          </div>

          {/* Interactive workspace */}
          <div className="relative min-w-0">
            <div className="mb-3 flex items-center justify-between px-1">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Interactive Systems Workspace
                </p>

                <p className="mt-1 text-xs text-slate-600">
                  Software • AI • Infrastructure
                </p>
              </div>

              <div className="hidden items-center gap-2 text-xs text-emerald-300/80 sm:flex">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Systems online
              </div>
            </div>

            <div
              aria-label="Interactive 3D workspace representing software development, AI systems, and IT infrastructure"
              className="relative h-[30rem] overflow-hidden rounded-[2rem] border border-cyan-300/15 bg-slate-900/30 shadow-2xl shadow-black/40 sm:h-[36rem] lg:h-[42rem]"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_60%_38%,rgba(34,211,238,0.07),transparent_24rem)]"
              />

              <HeroExperience />
            </div>

            <div className="pointer-events-none absolute bottom-4 left-1/2 z-10 -translate-x-1/2 rounded-full border border-white/10 bg-slate-950/75 px-4 py-2 text-center text-xs text-slate-400 backdrop-blur">
              Drag to explore
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}