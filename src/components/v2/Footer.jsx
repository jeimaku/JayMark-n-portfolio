import { motion } from "motion/react";

import Container from "../layout/Container";
import SocialLink from "../ui/SocialLink";

import {
  footerNavigation,
  profile,
} from "../../data";

import useFooterMotion from "../../hooks/useFooterMotion";

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

  const contactLinks =
    Array.isArray(profile.contactLinks)
      ? profile.contactLinks
      : [];

  const navigationItems =
    Array.isArray(footerNavigation)
      ? footerNavigation
      : [];

  const {
    footerRef,
    footerStyle,
    brandStyle,
    linksStyle,
    dividerStyle,
    glowStyle,
  } = useFooterMotion();

  return (
    <footer
      ref={footerRef}
      data-footer-motion=""
      className={[
        "relative isolate overflow-hidden",
        "border-t border-white/[0.08]",
        "bg-slate-950/80",
        "py-10 sm:py-12",
      ].join(" ")}
    >
      <motion.div
        aria-hidden="true"
        style={glowStyle}
        className={[
          "pointer-events-none",
          "absolute bottom-[-15rem]",
          "left-1/2 -z-20",
          "h-[30rem] w-[min(70rem,95vw)]",
          "-translate-x-1/2",
          "rounded-full",
          "bg-cyan-400/[0.08]",
          "blur-3xl",
          "will-change-transform",
        ].join(" ")}
      />

      <div
        aria-hidden="true"
        className={[
          "pointer-events-none",
          "absolute inset-0 -z-30",
          "bg-gradient-to-b",
          "from-transparent",
          "via-slate-950/82",
          "to-slate-950/90",
        ].join(" ")}
      />

      <motion.div
        style={footerStyle}
        className="will-change-transform"
      >
        <Container>
          <div className="grid gap-10 md:grid-cols-[1fr_auto] md:items-start">
            <motion.div
              style={brandStyle}
              className="min-w-0 will-change-transform"
            >
              <a
                href="#home"
                className={[
                  "inline-flex",
                  "text-lg font-semibold",
                  "tracking-tight text-white",
                  "transition duration-300",
                  "hover:text-cyan-100",
                  "focus-visible:outline-none",
                  "focus-visible:ring-2",
                  "focus-visible:ring-cyan-200",
                ].join(" ")}
              >
                {profile.name}
              </a>

              <p className="mt-3 max-w-lg text-sm leading-7 text-slate-400">
                {profile.headline}
              </p>

              <a
                href="#home"
                className={[
                  "group mt-6 inline-flex",
                  "items-center gap-2",
                  "text-sm font-semibold",
                  "text-cyan-200",
                  "transition duration-300",
                  "hover:text-cyan-100",
                  "focus-visible:outline-none",
                  "focus-visible:ring-2",
                  "focus-visible:ring-cyan-200",
                ].join(" ")}
              >
                Back to top

                <span className="transition-transform duration-300 group-hover:-translate-y-0.5">
                  <ArrowUpIcon />
                </span>
              </a>
            </motion.div>

            <motion.div
              style={linksStyle}
              className="flex min-w-0 flex-col gap-6 md:items-end will-change-transform"
            >
              {navigationItems.length > 0 ? (
                <nav
                  aria-label="Footer navigation"
                  className="flex flex-wrap gap-x-5 gap-y-3 md:justify-end"
                >
                  {navigationItems.map(
                    (link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        className={[
                          "text-sm text-slate-400",
                          "transition duration-300",
                          "hover:text-cyan-200",
                          "focus-visible:outline-none",
                          "focus-visible:ring-2",
                          "focus-visible:ring-cyan-200",
                        ].join(" ")}
                      >
                        {link.label}
                      </a>
                    )
                  )}
                </nav>
              ) : null}

              {contactLinks.length > 0 ? (
                <div className="flex flex-wrap items-center gap-2">
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
          </div>

          <div className="relative mt-10 pt-7">
            <div className="absolute inset-x-0 top-0 h-px bg-white/[0.07]" />

            <motion.div
              aria-hidden="true"
              style={dividerStyle}
              className={[
                "absolute inset-x-0 top-0",
                "h-px origin-left",
                "bg-gradient-to-r",
                "from-cyan-300/70",
                "via-cyan-200/30",
                "to-transparent",
                "shadow-[0_0_16px_rgba(34,211,238,0.25)]",
              ].join(" ")}
            />

            <div className="flex flex-col gap-3 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
              <p>
                © {currentYear} {profile.name}.
                All rights reserved.
              </p>

              <p>
                Built with React, Motion, and
                Three.js.
              </p>
            </div>
          </div>
        </Container>
      </motion.div>
    </footer>
  );
}
