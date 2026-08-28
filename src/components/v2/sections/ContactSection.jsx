import {
  ArrowUpRight,
  Download,
  Mail,
  MapPin,
} from "lucide-react";

import { motion } from "motion/react";

import Container from "../../layout/Container";
import Section from "../../layout/Section";
import SocialLink from "../../ui/SocialLink";

import { profile } from "../../../data";

const EASE = [0.22, 1, 0.36, 1];

const reveal = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: EASE,
    },
  },
};

function Eyebrow() {
  return (
    <div className="flex items-center gap-3">
      <span
        aria-hidden="true"
        className="h-px w-8 bg-white/35"
      />

      <span className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-neutral-400">
        Contact
      </span>
    </div>
  );
}

function PrimaryEmail({ email }) {
  if (!email) return null;

  return (
    <motion.a
      href={`mailto:${email}`}
      whileHover={{
        x: 4,
      }}
      transition={{
        duration: 0.22,
        ease: EASE,
      }}
      className={[
        "group relative block",
        "border-b border-white/10",
        "pb-5 sm:pb-6",
        "focus-visible:outline-none",
        "focus-visible:ring-2",
        "focus-visible:ring-white",
        "focus-visible:ring-offset-4",
        "focus-visible:ring-offset-black",
      ].join(" ")}
    >
      <span className="mb-3 block text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-neutral-500">
        Primary email
      </span>

      <span className="flex items-end justify-between gap-5">
        <span
          className={[
            "min-w-0 break-all",
            "text-xl font-medium tracking-[-0.025em]",
            "text-white",
            "sm:text-2xl",
            "md:text-[1.75rem]",
            "lg:text-[2rem]",
          ].join(" ")}
        >
          {email}
        </span>

        <ArrowUpRight
          aria-hidden="true"
          size={24}
          className={[
            "mb-1 shrink-0",
            "text-neutral-500",
            "transition duration-300",
            "group-hover:-translate-y-0.5",
            "group-hover:translate-x-0.5",
            "group-hover:text-white",
          ].join(" ")}
        />
      </span>

      <span
        aria-hidden="true"
        className={[
          "absolute bottom-0 left-0",
          "h-px w-0",
          "bg-white",
          "transition-[width]",
          "duration-500",
          "ease-out",
          "group-hover:w-full",
          "group-focus-visible:w-full",
        ].join(" ")}
      />
    </motion.a>
  );
}

function SecondaryEmail({ email }) {
  if (!email) return null;

  return (
    <div>
      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-neutral-600">
        Alternative
      </p>

      <a
        href={`mailto:${email}`}
        className={[
          "mt-2 inline-flex items-center gap-2",
          "text-sm text-neutral-400",
          "transition-colors duration-200",
          "hover:text-white",
          "focus-visible:outline-none",
          "focus-visible:ring-2",
          "focus-visible:ring-white",
          "focus-visible:ring-offset-4",
          "focus-visible:ring-offset-black",
        ].join(" ")}
      >
        <Mail
          aria-hidden="true"
          size={14}
        />

        <span className="break-all">
          {email}
        </span>
      </a>
    </div>
  );
}

function LocationBlock({ location }) {
  if (!location) return null;

  return (
    <div>
      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-neutral-600">
        Based in
      </p>

      <a
        href="https://maps.google.com/?q=Dasmarinas+City+Cavite"
        target="_blank"
        rel="noopener noreferrer"
        className={[
          "group mt-2 inline-flex items-start gap-2",
          "text-sm leading-6 text-neutral-400",
          "transition-colors duration-200",
          "hover:text-white",
          "focus-visible:outline-none",
          "focus-visible:ring-2",
          "focus-visible:ring-white",
          "focus-visible:ring-offset-4",
          "focus-visible:ring-offset-black",
        ].join(" ")}
      >
        <MapPin
          aria-hidden="true"
          size={15}
          className="mt-1 shrink-0"
        />

        <span>{location}</span>

        <ArrowUpRight
          aria-hidden="true"
          size={13}
          className={[
            "mt-1 shrink-0",
            "transition-transform duration-200",
            "group-hover:-translate-y-px",
            "group-hover:translate-x-px",
          ].join(" ")}
        />
      </a>
    </div>
  );
}

function ContactActions({
  email,
  resumeUrl,
}) {
  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
      {email ? (
        <a
          href={`mailto:${email}`}
          className={[
            "group inline-flex min-h-12",
            "w-full items-center justify-center",
            "gap-2 rounded-full",
            "bg-white px-6 py-3",
            "text-sm font-semibold text-black",
            "transition duration-300",
            "hover:-translate-y-0.5",
            "hover:bg-neutral-200",
            "focus-visible:outline-none",
            "focus-visible:ring-2",
            "focus-visible:ring-white",
            "focus-visible:ring-offset-4",
            "focus-visible:ring-offset-black",
            "sm:w-auto",
          ].join(" ")}
        >
          Send Email

          <ArrowUpRight
            aria-hidden="true"
            size={16}
            className={[
              "transition-transform duration-300",
              "group-hover:-translate-y-px",
              "group-hover:translate-x-px",
            ].join(" ")}
          />
        </a>
      ) : null}

      {resumeUrl ? (
        <a
          href={resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={[
            "inline-flex min-h-12",
            "w-full items-center justify-center",
            "gap-2 rounded-full",
            "border border-white/15",
            "px-6 py-3",
            "text-sm font-semibold text-neutral-200",
            "transition duration-300",
            "hover:-translate-y-0.5",
            "hover:border-white/30",
            "hover:bg-white/[0.04]",
            "hover:text-white",
            "focus-visible:outline-none",
            "focus-visible:ring-2",
            "focus-visible:ring-white",
            "focus-visible:ring-offset-4",
            "focus-visible:ring-offset-black",
            "sm:w-auto",
          ].join(" ")}
        >
          View Résumé

          <Download
            aria-hidden="true"
            size={15}
          />
        </a>
      ) : null}
    </div>
  );
}

function ProfessionalLinks({ links }) {
  if (!links.length) return null;

  return (
    <div>
      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-neutral-600">
        Elsewhere
      </p>

      <div className="mt-3 flex flex-wrap items-center gap-3">
        {links.map((link) => (
          <div
            key={link.label}
            className="group flex items-center gap-2"
          >
            <SocialLink link={link} />

            <span className="hidden text-xs font-medium text-neutral-500 transition-colors duration-200 group-hover:text-neutral-300 sm:inline">
              {link.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ContactSection() {
  const primaryEmail =
    profile.emails?.personal ?? null;

  const secondaryEmail =
    profile.emails?.secondary ?? null;

  const resumeUrl =
    profile.resume?.primary ?? null;

  const location =
    profile.location ?? null;

  const contactLinks =
    Array.isArray(profile.contactLinks)
      ? profile.contactLinks
      : [];

  return (
    <Section
      id="contact"
      spacing="compact"
      optimize={false}
      className="relative pb-20 pt-8 sm:pb-24 lg:pb-28"
    >
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.12,
          }}
          className={[
            "relative",
            "border-y border-white/[0.08]",
            "py-12 sm:py-16 lg:py-20",
          ].join(" ")}
        >
          {/* subtle top highlight */}
          <div
            aria-hidden="true"
            className={[
              "pointer-events-none",
              "absolute left-0 top-[-1px]",
              "h-px w-24",
              "bg-gradient-to-r",
              "from-white/60 to-transparent",
            ].join(" ")}
          />

          <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 xl:gap-28">
            {/* LEFT */}
            <motion.div
              variants={reveal}
              className="max-w-xl"
            >
              <Eyebrow />

              <h2
                className={[
                  "mt-6",
                  "max-w-[10ch]",
                  "text-[clamp(2.5rem,5vw,5.25rem)]",
                  "font-semibold",
                  "leading-[0.94]",
                  "tracking-[-0.055em]",
                  "text-white",
                ].join(" ")}
              >
                Let&apos;s build something worth using.
              </h2>

              <p
                className={[
                  "mt-7 max-w-lg",
                  "text-sm leading-7",
                  "text-neutral-400",
                  "sm:text-base sm:leading-8",
                ].join(" ")}
              >
                If you&apos;d like to discuss a project,
                an opportunity, or simply connect, feel
                free to reach out.
              </p>

              <ContactActions
                email={primaryEmail}
                resumeUrl={resumeUrl}
              />
            </motion.div>

            {/* RIGHT */}
            <motion.div
              variants={reveal}
              transition={{
                delay: 0.08,
              }}
              className="flex min-w-0 flex-col justify-between"
            >
              <div>
                <p className="mb-7 text-[0.65rem] font-semibold uppercase tracking-[0.26em] text-neutral-500">
                  Get in touch
                </p>

                <PrimaryEmail
                  email={primaryEmail}
                />

                <div className="mt-7 grid gap-7 sm:grid-cols-2">
                  <SecondaryEmail
                    email={secondaryEmail}
                  />

                  <LocationBlock
                    location={location}
                  />
                </div>
              </div>

              <div className="mt-12 border-t border-white/[0.07] pt-6">
                <div className="flex flex-col gap-7 sm:flex-row sm:items-end sm:justify-between">
                  <ProfessionalLinks
                    links={contactLinks}
                  />

                  <div className="flex items-center gap-2 text-xs text-neutral-500">
                    <span
                      aria-hidden="true"
                      className="h-1.5 w-1.5 rounded-full bg-emerald-400"
                    />

                    Available for opportunities
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}