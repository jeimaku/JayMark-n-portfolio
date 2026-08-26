import { motion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1];

function InfrastructureIcon({ type }) {
  const iconClass = "h-7 w-7";

  if (type === "networking") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        className={iconClass}
      >
        <path
          d="M12 5.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM5.5 21.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM18.5 21.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
          stroke="currentColor"
          strokeWidth="1.55"
        />
        <path
          d="M12 5.5v5.25M5.5 17.5v-2.25A2.5 2.5 0 0 1 8 12.75h8a2.5 2.5 0 0 1 2.5 2.5v2.25M12 10.75v2"
          stroke="currentColor"
          strokeWidth="1.55"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (type === "systems") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        className={iconClass}
      >
        <rect
          x="4"
          y="3.5"
          width="16"
          height="6.5"
          rx="1.5"
          stroke="currentColor"
          strokeWidth="1.55"
        />
        <rect
          x="4"
          y="14"
          width="16"
          height="6.5"
          rx="1.5"
          stroke="currentColor"
          strokeWidth="1.55"
        />
        <path
          d="M7.5 6.75h.01M7.5 17.25h.01M11 6.75h5.5M11 17.25h5.5"
          stroke="currentColor"
          strokeWidth="1.55"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className={iconClass}
    >
      <rect
        x="4"
        y="5"
        width="16"
        height="11"
        rx="1.75"
        stroke="currentColor"
        strokeWidth="1.55"
      />
      <path
        d="M8 19h8M12 16v3M7.75 8.5h.01M10.75 8.5h5.5M7.75 12.5h.01M10.75 12.5h3.5"
        stroke="currentColor"
        strokeWidth="1.55"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ConsoleModule({ capability, index, allowMotion }) {
  const accent = capability.accent ?? "#67E8F9";

  return (
    <motion.article
      initial={
        allowMotion
          ? { opacity: 0, y: 18, filter: "blur(4px)" }
          : false
      }
      whileInView={
        allowMotion
          ? { opacity: 1, y: 0, filter: "blur(0px)" }
          : undefined
      }
      whileHover={
        allowMotion
          ? { y: -4, transition: { duration: 0.24, ease: EASE } }
          : undefined
      }
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        delay: index * 0.08,
        duration: 0.55,
        ease: EASE,
      }}
      className="group relative min-w-0 overflow-hidden border border-white/[0.09] bg-slate-950/55 p-5 transition-colors duration-300 hover:border-white/[0.18] sm:p-6"
      style={{ boxShadow: `inset 0 1px 0 ${accent}12` }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px"
        style={{ backgroundColor: accent }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
        style={{ backgroundColor: `${accent}2B` }}
      />

      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <span
            className="flex h-12 w-12 shrink-0 items-center justify-center border bg-slate-900/90"
            style={{
              borderColor: `${accent}55`,
              color: accent,
              boxShadow: `0 0 24px ${accent}14`,
            }}
          >
            <InfrastructureIcon type={capability.icon} />
          </span>

          <span className="font-mono text-[0.62rem] font-semibold tracking-[0.2em] text-slate-600">
            MODULE {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <p
          className="mt-6 text-[0.62rem] font-semibold uppercase tracking-[0.2em]"
          style={{ color: accent }}
        >
          {capability.status}
        </p>

        <h4 className="mt-2 text-xl font-semibold tracking-[-0.035em] text-white sm:text-2xl">
          {capability.label}
        </h4>

        <ul className="mt-5 space-y-3 border-t border-white/[0.08] pt-4">
          {capability.skills.map((skill) => (
            <li
              key={skill}
              className="flex items-start gap-3 text-sm leading-6 text-slate-400"
            >
              <span
                aria-hidden="true"
                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ backgroundColor: accent }}
              />
              <span>{skill}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}

export default function InfrastructurePanel({
  capabilities = [],
  allowMotion = false,
}) {
  return (
    <section
      aria-labelledby="skills-operations-title"
      className="relative overflow-hidden rounded-[1.75rem] border border-cyan-300/[0.17] bg-slate-950/75 p-4 shadow-[0_26px_80px_rgba(0,0,0,0.27)] sm:p-6 lg:p-8"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.24] [background-image:linear-gradient(rgba(148,163,184,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.16)_1px,transparent_1px)] [background-size:28px_28px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-36 top-0 h-64 w-64 rounded-full bg-cyan-300/[0.08] blur-3xl"
      />

      <div className="relative">
        <header className="border-b border-white/[0.1] px-1 pb-6 sm:px-2">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="inline-flex items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-cyan-100">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300/50 motion-reduce:animate-none" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-300" />
              </span>
              Operations console
            </p>

            <span className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-slate-500">
              {String(capabilities.length).padStart(2, "0")} modules online
            </span>
          </div>

          <div className="mt-5 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h3
                id="skills-operations-title"
                className="text-2xl font-semibold tracking-[-0.045em] text-white sm:text-3xl"
              >
                IT OPERATIONS
              </h3>

              <p className="mt-2 text-sm font-medium tracking-[0.06em] text-cyan-100/85">
                Hardware <span aria-hidden="true">•</span> Networking{" "}
                <span aria-hidden="true">•</span> Infrastructure
              </p>
            </div>

            <p className="max-w-md text-sm leading-6 text-slate-400">
              Practical support experience behind dependable day-to-day systems.
            </p>
          </div>
        </header>

        <div className="grid border-l border-t border-white/[0.09] sm:grid-cols-3">
          {capabilities.map((capability, index) => (
            <ConsoleModule
              key={capability.id ?? capability.label}
              capability={capability}
              index={index}
              allowMotion={allowMotion}
            />
          ))}
        </div>

        <footer className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.1] px-1 pt-5 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-slate-600 sm:px-2">
          <span>Console status: ready</span>
          <span>Support layer / hands-on</span>
        </footer>
      </div>
    </section>
  );
}
