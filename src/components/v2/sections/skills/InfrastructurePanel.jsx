import { motion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1];

function InfrastructureIcon({ type }) {
  const iconClass = "h-6 w-6";

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

function CapabilityBlock({ capability, index, allowMotion }) {
  const accent = capability.accent ?? "#F5F5F5";

  return (
    <motion.article
      initial={allowMotion ? { opacity: 0, y: 12 } : false}
      whileInView={allowMotion ? { opacity: 1, y: 0 } : undefined}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        delay: allowMotion ? index * 0.06 : 0,
        duration: allowMotion ? 0.45 : 0,
        ease: EASE,
      }}
      className="min-w-0 px-1 py-8 sm:px-2 md:px-8"
    >
      <span
        className="flex h-9 w-9 items-center justify-center"
        style={{ color: accent }}
      >
        <InfrastructureIcon type={capability.icon} />
      </span>

      <h4 className="mt-5 text-xl font-semibold tracking-[-0.035em] text-white">
        {capability.label}
      </h4>

      <ul className="mt-5 space-y-2.5">
        {capability.skills.map((skill) => (
          <li
            key={skill}
            className="flex items-start gap-3 text-sm leading-6 text-neutral-400"
          >
            <span
              aria-hidden="true"
              className="mt-3 h-px w-3 shrink-0 bg-neutral-600"
            />
            <span>{skill}</span>
          </li>
        ))}
      </ul>
    </motion.article>
  );
}

export default function InfrastructurePanel({
  capabilities = [],
  allowMotion = false,
}) {
  return (
    <section aria-labelledby="skills-support-title">
      <header className="max-w-2xl">
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-neutral-400">
          Hands-on support
        </p>

        <h3
          id="skills-support-title"
          className="mt-5 text-3xl font-semibold tracking-[-0.045em] text-white sm:text-4xl"
        >
          Hardware, networks, and systems.
        </h3>
      </header>

      <div className="mt-9 grid divide-y divide-white/[0.1] border-y border-white/[0.1] md:grid-cols-3 md:divide-x md:divide-y-0">
        {capabilities.map((capability, index) => (
          <CapabilityBlock
            key={capability.id ?? capability.label}
            capability={capability}
            index={index}
            allowMotion={allowMotion}
          />
        ))}
      </div>
    </section>
  );
}
