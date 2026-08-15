import {
  ArrowRight,
  Download,
  Mail,
  MapPin,
  MessageSquare,
  Send,
  Sparkles,
} from "lucide-react";

import { motion } from "motion/react";

import Container from "../../layout/Container";
import Section from "../../layout/Section";
import SectionHeading from "../../ui/SectionHeading";
import SocialLink from "../../ui/SocialLink";

import {
  StaggerItem,
  StaggerReveal,
} from "../motion";

import { profile } from "../../../data";

import useContactMotion from "../../../hooks/useContactMotion";

const contactCards = [
  {
    label: "Personal Email",
    value: profile.emails?.personal,
    href: profile.emails?.personal
      ? `mailto:${profile.emails.personal}`
      : null,
    icon: Mail,
  },
  {
    label: "Secondary Email",
    value: profile.emails?.secondary,
    href: profile.emails?.secondary
      ? `mailto:${profile.emails.secondary}`
      : null,
    icon: Mail,
  },
  {
    label: "Location",
    value: profile.location,
    href:
      "https://maps.google.com/?q=Dasmarinas+City+Cavite",
    icon: MapPin,
  },
].filter(
  (item) =>
    Boolean(item.value) &&
    Boolean(item.href)
);

function ContactCard({
  item,
  index,
  allowComplexMotion,
}) {
  const Icon = item.icon;

  const isExternal =
    item.href.startsWith("http");

  return (
    <motion.a
      href={item.href}
      target={
        isExternal
          ? "_blank"
          : undefined
      }
      rel={
        isExternal
          ? "noopener noreferrer"
          : undefined
      }
      whileHover={
        allowComplexMotion
          ? {
              x: 5,
              scale: 1.006,
            }
          : undefined
      }
      transition={{
        duration: 0.24,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={[
        "group relative block",
        "overflow-hidden rounded-[1.5rem]",
        "border border-white/10",
        "bg-white/[0.025]",
        "p-5",
        "transition duration-300",
        "hover:border-cyan-300/30",
        "hover:bg-white/[0.05]",
        "focus-visible:outline-none",
        "focus-visible:ring-2",
        "focus-visible:ring-cyan-200",
      ].join(" ")}
    >
      <div
        aria-hidden="true"
        className={[
          "pointer-events-none",
          "absolute inset-y-0 left-0",
          "w-px",
          "bg-gradient-to-b",
          "from-transparent",
          "via-cyan-200/60",
          "to-transparent",
          "opacity-0",
          "transition-opacity duration-300",
          "group-hover:opacity-100",
          "group-focus-visible:opacity-100",
        ].join(" ")}
      />

      <div className="relative flex items-start gap-4">
        <div
          className={[
            "flex h-12 w-12 shrink-0",
            "items-center justify-center",
            "rounded-2xl border",
            "border-cyan-300/20",
            "bg-cyan-300/10",
            "text-cyan-200",
            "transition duration-300",
            "group-hover:border-cyan-200/40",
            "group-hover:bg-cyan-300/[0.16]",
          ].join(" ")}
        >
          <Icon
            aria-hidden="true"
            size={21}
          />
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-3">
            <p className="text-sm font-medium text-slate-500">
              {item.label}
            </p>

            <span className="font-mono text-[0.58rem] text-slate-700">
              {String(index + 1).padStart(
                2,
                "0"
              )}
            </span>
          </div>

          <p className="break-safe mt-1 font-semibold leading-6 text-white">
            {item.value}
          </p>
        </div>
      </div>
    </motion.a>
  );
}

function PrimaryContactActions({
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
            "bg-cyan-300",
            "px-6 py-3",
            "text-sm font-semibold",
            "text-slate-950",
            "shadow-[0_14px_38px_rgba(8,145,178,0.2)]",
            "transition duration-300",
            "hover:-translate-y-0.5",
            "hover:bg-cyan-200",
            "focus-visible:outline-none",
            "focus-visible:ring-2",
            "focus-visible:ring-cyan-200",
            "focus-visible:ring-offset-4",
            "focus-visible:ring-offset-slate-950",
            "sm:w-auto",
          ].join(" ")}
        >
          Send Email

          <Send
            aria-hidden="true"
            size={16}
            className="transition-transform duration-300 group-hover:translate-x-0.5"
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
            "gap-2 rounded-full border",
            "border-white/15",
            "bg-white/[0.035]",
            "px-6 py-3",
            "text-sm font-semibold",
            "text-white",
            "transition duration-300",
            "hover:-translate-y-0.5",
            "hover:border-cyan-200/40",
            "hover:bg-cyan-300/[0.07]",
            "focus-visible:outline-none",
            "focus-visible:ring-2",
            "focus-visible:ring-cyan-200",
            "focus-visible:ring-offset-4",
            "focus-visible:ring-offset-slate-950",
            "sm:w-auto",
          ].join(" ")}
        >
          View Resume

          <Download
            aria-hidden="true"
            size={16}
          />
        </a>
      ) : null}

      <a
        href="#projects"
        className={[
          "group inline-flex min-h-12",
          "w-full items-center justify-center",
          "gap-2 rounded-full border",
          "border-transparent",
          "px-5 py-3",
          "text-sm font-semibold",
          "text-slate-300",
          "transition duration-300",
          "hover:border-white/10",
          "hover:bg-white/[0.035]",
          "hover:text-white",
          "focus-visible:outline-none",
          "focus-visible:ring-2",
          "focus-visible:ring-cyan-200",
          "sm:w-auto",
        ].join(" ")}
      >
        View Work

        <ArrowRight
          aria-hidden="true"
          size={16}
          className="transition-transform duration-300 group-hover:translate-x-0.5"
        />
      </a>
    </div>
  );
}

export default function ContactSection() {
  const {
    sectionRef,

    shellStyle,
    leftPanelStyle,
    rightPanelStyle,
    glowStyle,
    lineStyle,

    allowEntranceMotion,
    allowComplexMotion,
  } = useContactMotion();

  const primaryEmail =
    profile.emails?.personal ?? null;

  const resumeUrl =
    profile.resume?.primary ?? null;

  const contactLinks =
    Array.isArray(profile.contactLinks)
      ? profile.contactLinks
      : [];

  const highlights =
    Array.isArray(profile.highlights)
      ? profile.highlights.slice(0, 4)
      : [];

  return (
    <Section
      id="contact"
      spacing="compact"
      className="relative pb-20 sm:pb-24 lg:pb-28"
    >
      <div
        ref={sectionRef}
        data-contact-motion-scene=""
        className="relative isolate overflow-hidden"
      >
        <motion.div
          aria-hidden="true"
          style={glowStyle}
          className={[
            "pointer-events-none",
            "absolute -right-40 top-[8%]",
            "-z-20 h-[34rem] w-[34rem]",
            "rounded-full",
            "bg-cyan-400/[0.09]",
            "blur-3xl",
            "will-change-transform",
          ].join(" ")}
        />

        <div
          aria-hidden="true"
          className={[
            "pointer-events-none",
            "absolute inset-0 -z-30",
            "opacity-[0.025]",
            "[background-image:linear-gradient(",
            "rgba(148,163,184,0.45)_1px,",
            "transparent_1px),",
            "linear-gradient(90deg,",
            "rgba(148,163,184,0.45)_1px,",
            "transparent_1px)]",
            "[background-size:72px_72px]",
          ].join("")}
        />

        <Container>
          <motion.div
            style={shellStyle}
            className={[
              "relative overflow-hidden",
              "rounded-[2rem]",
              "border border-white/10",
              "bg-white/[0.025]",
              "shadow-[0_34px_110px_rgba(0,0,0,0.32)]",
              "will-change-transform",
            ].join(" ")}
          >
            <div
              aria-hidden="true"
              className={[
                "pointer-events-none",
                "absolute inset-0",
                "bg-[radial-gradient(",
                "circle_at_top_right,",
                "rgba(34,211,238,0.15),",
                "transparent_30rem)]",
              ].join("")}
            />

            <div
              aria-hidden="true"
              className={[
                "pointer-events-none",
                "absolute inset-0",
                "rounded-[inherit]",
                "ring-1 ring-inset",
                "ring-white/[0.025]",
              ].join(" ")}
            />

            <motion.div
              aria-hidden="true"
              style={lineStyle}
              className={[
                "pointer-events-none",
                "absolute inset-x-6 bottom-0",
                "h-px origin-center",
                "bg-gradient-to-r",
                "from-transparent",
                "via-cyan-200/70",
                "to-transparent",
                "shadow-[0_0_22px_rgba(34,211,238,0.4)]",
              ].join(" ")}
            />

            <div className="relative z-10 grid gap-8 p-5 sm:p-7 md:p-9 lg:grid-cols-[0.92fr_1.08fr] lg:gap-12 lg:p-12">
              {/* Left contact introduction */}
              <motion.div
                style={leftPanelStyle}
                className="min-w-0 will-change-transform"
              >
                <motion.div
                  initial={
                    allowEntranceMotion
                      ? {
                          opacity: 0,
                          y: 26,
                          filter:
                            "blur(5px)",
                        }
                      : false
                  }
                  whileInView={
                    allowEntranceMotion
                      ? {
                          opacity: 1,
                          y: 0,
                          filter:
                            "blur(0px)",
                        }
                      : undefined
                  }
                  viewport={{
                    once: true,
                    amount: 0.16,
                  }}
                  transition={{
                    duration: 0.75,
                    ease: [
                      0.22,
                      1,
                      0.36,
                      1,
                    ],
                  }}
                >
                  <div
                    className={[
                      "mb-6 inline-flex",
                      "max-w-full items-center",
                      "gap-2 rounded-full border",
                      "border-cyan-300/20",
                      "bg-cyan-300/10",
                      "px-4 py-2",
                      "text-xs font-semibold",
                      "uppercase tracking-[0.22em]",
                      "text-cyan-200",
                      "sm:tracking-[0.28em]",
                    ].join(" ")}
                  >
                    <Sparkles
                      aria-hidden="true"
                      size={14}
                    />

                    Contact
                  </div>

                  <SectionHeading
                    title="Let’s build something practical and meaningful."
                    description="Interested in reviewing my work, discussing a project, or connecting professionally? You can reach me through email, GitHub, or LinkedIn."
                  />

                  <PrimaryContactActions
                    email={primaryEmail}
                    resumeUrl={resumeUrl}
                  />
                </motion.div>

                <motion.div
                  initial={
                    allowEntranceMotion
                      ? {
                          opacity: 0,
                          y: 28,
                          scale: 0.985,
                        }
                      : false
                  }
                  whileInView={
                    allowEntranceMotion
                      ? {
                          opacity: 1,
                          y: 0,
                          scale: 1,
                        }
                      : undefined
                  }
                  viewport={{
                    once: true,
                    amount: 0.2,
                  }}
                  transition={{
                    duration: 0.7,
                    delay: 0.08,
                    ease: [
                      0.22,
                      1,
                      0.36,
                      1,
                    ],
                  }}
                  className={[
                    "relative mt-8 overflow-hidden",
                    "rounded-[1.5rem]",
                    "border border-white/10",
                    "bg-slate-950/40",
                    "p-5 sm:p-6",
                  ].join(" ")}
                >
                  <div
                    aria-hidden="true"
                    className={[
                      "absolute left-0 top-0",
                      "h-full w-px",
                      "bg-gradient-to-b",
                      "from-cyan-300/60",
                      "via-cyan-200/10",
                      "to-transparent",
                    ].join(" ")}
                  />

                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-200">
                    Current Focus
                  </p>

                  <p className="mt-3 text-sm leading-7 text-slate-400">
                    I’m currently focused on improving
                    my full-stack development, IT
                    systems, AI integration, and clean
                    UI/UX skills through practical
                    projects and real workflow-based
                    systems.
                  </p>
                </motion.div>
              </motion.div>

              {/* Right contact details */}
              <motion.div
                style={rightPanelStyle}
                className="min-w-0 space-y-5 will-change-transform"
              >
                <StaggerReveal className="grid gap-4">
                  {contactCards.map(
                    (item, index) => (
                      <StaggerItem
                        key={item.label}
                      >
                        <ContactCard
                          item={item}
                          index={index}
                          allowComplexMotion={
                            allowComplexMotion
                          }
                        />
                      </StaggerItem>
                    )
                  )}
                </StaggerReveal>

                <motion.div
                  initial={
                    allowEntranceMotion
                      ? {
                          opacity: 0,
                          y: 28,
                          scale: 0.985,
                        }
                      : false
                  }
                  whileInView={
                    allowEntranceMotion
                      ? {
                          opacity: 1,
                          y: 0,
                          scale: 1,
                        }
                      : undefined
                  }
                  viewport={{
                    once: true,
                    amount: 0.18,
                  }}
                  transition={{
                    duration: 0.68,
                    delay: 0.14,
                    ease: [
                      0.22,
                      1,
                      0.36,
                      1,
                    ],
                  }}
                  className={[
                    "rounded-[1.5rem]",
                    "border border-white/10",
                    "bg-white/[0.025]",
                    "p-5",
                  ].join(" ")}
                >
                  <div className="flex items-start gap-3 sm:items-center">
                    <div
                      className={[
                        "flex h-12 w-12 shrink-0",
                        "items-center justify-center",
                        "rounded-2xl border",
                        "border-cyan-300/20",
                        "bg-cyan-300/10",
                        "text-cyan-200",
                      ].join(" ")}
                    >
                      <MessageSquare
                        aria-hidden="true"
                        size={21}
                      />
                    </div>

                    <div className="min-w-0">
                      <p className="font-semibold text-white">
                        Professional Links
                      </p>

                      <p className="mt-1 text-sm leading-6 text-slate-400">
                        Connect with me or review my
                        work online.
                      </p>
                    </div>
                  </div>

                  {contactLinks.length > 0 ? (
                    <div className="mt-5 flex flex-wrap gap-3">
                      {contactLinks.map(
                        (link) => (
                          <SocialLink
                            key={link.label}
                            link={link}
                          />
                        )
                      )}
                    </div>
                  ) : null}
                </motion.div>

                {highlights.length > 0 ? (
                  <StaggerReveal className="flex flex-wrap gap-2">
                    {highlights.map(
                      (highlight) => (
                        <StaggerItem
                          key={highlight}
                          className="inline-flex"
                        >
                          <span
                            className={[
                              "inline-flex rounded-full",
                              "border border-white/10",
                              "bg-white/[0.03]",
                              "px-3 py-1.5",
                              "text-xs font-semibold",
                              "leading-5 text-slate-200",
                            ].join(" ")}
                          >
                            {highlight}
                          </span>
                        </StaggerItem>
                      )
                    )}
                  </StaggerReveal>
                ) : null}
              </motion.div>
            </div>
          </motion.div>
        </Container>
      </div>
    </Section>
  );
}