import { homepageSections } from "../../data/homepageSections";

const FOOTER_SECTIONS = homepageSections.filter(
  (section) =>
    section.id !== "education"
);

function ArrowUpIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className="h-4 w-4"
    >
      <path
        d="M10 15.5v-11m-4.25 4.25L10 4.5l4.25 4.25"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Footer() {
  const currentYear =
    new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/10 bg-slate-950 text-slate-300">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/20 to-transparent"
      />

      <div className="mx-auto w-full max-w-[90rem] px-4 py-8 sm:px-6 sm:py-10 lg:px-10">
        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-start">
          <div>
            <a
              href="#home"
              className="inline-flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200 focus-visible:ring-offset-4 focus-visible:ring-offset-slate-950"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-300/20 bg-cyan-300/[0.06] text-sm font-semibold text-cyan-100">
                JM
              </span>

              <span>
                <span className="block text-sm font-semibold text-white">
                  Jay Mark Apelado
                </span>

                <span className="mt-0.5 block text-xs text-slate-500">
                  Full-Stack Developer &amp; IT Support Specialist
                </span>
              </span>
            </a>

            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-500">
              Building practical software, AI-assisted platforms,
              and dependable technical systems.
            </p>
          </div>

          <nav
            aria-label="Footer navigation"
            className="md:text-right"
          >
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-600">
              Navigate
            </p>

            <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-3 md:max-w-md md:justify-end">
              <li>
                <a
                  href="#home"
                  className="text-sm text-slate-400 transition hover:text-cyan-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200"
                >
                  Home
                </a>
              </li>

              {FOOTER_SECTIONS.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="text-sm text-slate-400 transition hover:text-cyan-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200"
                  >
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs leading-6 text-slate-600">
            © {currentYear} Jay Mark Apelado. Built with React,
            Three.js, and careful attention to accessibility and
            performance.
          </p>

          <a
            href="#home"
            aria-label="Back to the top of the page"
            className="group inline-flex min-h-10 w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.025] px-4 py-2 text-xs font-semibold text-slate-400 transition hover:border-cyan-300/25 hover:text-cyan-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200 focus-visible:ring-offset-4 focus-visible:ring-offset-slate-950"
          >
            Back to top

            <span className="transition-transform group-hover:-translate-y-0.5">
              <ArrowUpIcon />
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}