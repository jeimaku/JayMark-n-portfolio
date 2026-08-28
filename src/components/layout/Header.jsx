import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  AnimatePresence,
  motion,
} from "motion/react";

import {
  ArrowUpRight,
  Menu,
  X,
} from "lucide-react";

import {
  useNavigate,
} from "react-router";

import SocialLink from "../ui/SocialLink";
import Container from "./Container";

import { profile } from "../../data";
import useScrollState from "../../hooks/useScrollState";
import {
  markPortfolioNavigation,
  scrollToPortfolioSection,
  startSmoothScroll,
  stopSmoothScroll,
  PORTFOLIO_SECTIONS,
} from "../../lib/smoothScroll";

const HEADER_NAVIGATION =
  PORTFOLIO_SECTIONS;

function BrandMark() {
  return (
    <span
      className={[
        "relative flex",
        "h-10 w-10 shrink-0",
        "items-center justify-center",
        "overflow-hidden",
        "rounded-xl",
        "transition duration-300",
        "group-hover:scale-[1.04]",
      ].join(" ")}
    >
      <img
        src="/branding/jm-logo.png"
        alt=""
        aria-hidden="true"
        className="h-full w-full object-cover"
      />

      <span
        aria-hidden="true"
        className={[
          "absolute -right-0.5 -top-0.5",
          "flex h-3 w-3",
          "items-center justify-center",
          "rounded-full",
          "border-2 border-neutral-950",
          "bg-emerald-400",
        ].join(" ")}
      >
        <span className="h-1.5 w-1.5 animate-ping rounded-full bg-emerald-300 opacity-60 motion-reduce:animate-none" />
      </span>
    </span>
  );
}

function DesktopNavigation({
  activeSection,
  onNavigate,
}) {
  return (
    <nav
      aria-label="Primary navigation"
      className={[
        "hidden items-center",
        "rounded-2xl border",
        "border-white/[0.08]",
        "bg-white/[0.025]",
        "p-1 xl:flex",
      ].join(" ")}
    >
      {HEADER_NAVIGATION.map(
        (item, index) => {
          const active =
            activeSection ===
            item.id;

          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(event) =>
                onNavigate(
                  event,
                  item.id
                )
              }
              aria-current={
                active
                  ? "location"
                  : undefined
              }
              className={[
                "group relative isolate",
                "inline-flex h-9",
                "items-center gap-1.5",
                "rounded-xl",
                "px-2.5",
                "text-[0.72rem]",
                "font-semibold",
                "transition-colors",
                "duration-300",
                active
                  ? "text-white"
                  : [
                      "text-neutral-500",
                      "hover:text-neutral-200",
                    ].join(" "),
              ].join(" ")}
            >
              {active ? (
                <motion.span
                  layoutId="header-active-section"
                  transition={{
                    type: "spring",
                    stiffness: 420,
                    damping: 34,
                    mass: 0.7,
                  }}
                  className={[
                    "absolute inset-0",
                    "-z-10 rounded-xl",
                    "border",
                    "border-neutral-100/20",
                    "bg-neutral-100/[0.085]",
                    "shadow-[0_8px_24px_rgba(0,0,0,0.36)]",
                  ].join(" ")}
                />
              ) : null}

              <span
                className={[
                  "hidden font-mono",
                  "text-[0.52rem]",
                  "transition-colors",
                  "2xl:inline",
                  active
                    ? "text-white"
                    : [
                        "text-neutral-700",
                        "group-hover:text-neutral-500",
                      ].join(" "),
                ].join(" ")}
              >
                {String(
                  index + 1
                ).padStart(2, "0")}
              </span>

              <span className="relative">
                {item.label}
              </span>

              {active ? (
                <span
                  aria-hidden="true"
                  className="absolute bottom-1 left-1/2 h-0.5 w-3 -translate-x-1/2 rounded-full bg-neutral-100 shadow-[0_0_8px_rgba(255,255,255,0.22)]"
                />
              ) : null}
            </a>
          );
        }
      )}
    </nav>
  );
}

function MobileNavigation({
  activeSection,
  onNavigate,
  onClose,
}) {
  return (
    <motion.div
      id="mobile-navigation"
      initial={{
        opacity: 0,
        y: -12,
        scale: 0.985,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      exit={{
        opacity: 0,
        y: -10,
        scale: 0.99,
      }}
      transition={{
        duration: 0.25,
        ease: [
          0.22,
          1,
          0.36,
          1,
        ],
      }}
      className={[
        "pointer-events-auto",
        "mx-auto mt-2",
        "w-full",
        "rounded-[1.5rem]",
        "border border-white/10",
        "bg-neutral-950/95",
        "p-3",
        "shadow-[0_30px_90px_rgba(0,0,0,0.5)]",
        "backdrop-blur-2xl",
        "xl:hidden",
      ].join(" ")}
    >
      <div className="flex items-center justify-between gap-4 border-b border-white/[0.07] px-2 pb-3">
        <div>
          <p className="text-[0.58rem] font-semibold uppercase tracking-[0.2em] text-white">
            Navigation
          </p>

          <p className="mt-1 text-xs text-neutral-600">
            Current section:{" "}
            <span className="text-neutral-300">
              {
                HEADER_NAVIGATION.find(
                  (item) =>
                    item.id ===
                    activeSection
                )?.label
              }
            </span>
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close navigation menu"
          className={[
            "inline-flex h-9 w-9",
            "items-center justify-center",
            "rounded-full border",
            "border-white/10",
            "bg-white/[0.025]",
            "text-neutral-400",
            "transition",
            "hover:border-neutral-100/35",
            "hover:text-white",
            "focus-visible:outline-none",
            "focus-visible:ring-2",
            "focus-visible:ring-white",
          ].join(" ")}
        >
          <X size={18} />
        </button>
      </div>

      <nav
        aria-label="Mobile navigation"
        className="mt-3 grid grid-cols-2 gap-2"
      >
        {HEADER_NAVIGATION.map(
          (item, index) => {
            const active =
              item.id ===
              activeSection;

            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(event) =>
                  onNavigate(
                    event,
                    item.id
                  )
                }
                aria-current={
                  active
                    ? "location"
                    : undefined
                }
                className={[
                  "group relative",
                  "min-h-[4.5rem]",
                  "overflow-hidden",
                  "rounded-2xl border",
                  "px-4 py-3",
                  "transition duration-300",
                  "focus-visible:outline-none",
                  "focus-visible:ring-2",
                  "focus-visible:ring-white",
                  active
                    ? [
                        "border-neutral-100/30",
                        "bg-neutral-100/[0.075]",
                      ].join(" ")
                    : [
                        "border-white/[0.07]",
                        "bg-white/[0.02]",
                        "hover:border-white/15",
                        "hover:bg-white/[0.045]",
                      ].join(" "),
                ].join(" ")}
              >
                <span
                  className={[
                    "block font-mono",
                    "text-[0.56rem]",
                    active
                      ? "text-white"
                      : "text-neutral-700",
                  ].join(" ")}
                >
                  {String(
                    index + 1
                  ).padStart(2, "0")}
                </span>

                <span
                  className={[
                    "mt-2 block",
                    "text-sm font-semibold",
                    active
                      ? "text-white"
                      : [
                          "text-neutral-400",
                          "group-hover:text-neutral-200",
                        ].join(" "),
                  ].join(" ")}
                >
                  {item.label}
                </span>

                {active ? (
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-neutral-100 to-transparent"
                  />
                ) : null}
              </a>
            );
          }
        )}
      </nav>

      <div className="mt-3 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-3">
        <a
          href="#contact"
          onClick={(event) =>
            onNavigate(
              event,
              "contact"
            )
          }
          className={[
            "group inline-flex",
            "min-h-12 w-full",
            "items-center justify-center",
            "gap-2 rounded-xl",
            "bg-neutral-100",
            "px-5 py-3",
            "text-sm font-semibold",
            "text-neutral-950",
            "transition duration-300",
            "hover:bg-white",
            "focus-visible:outline-none",
            "focus-visible:ring-2",
            "focus-visible:ring-white",
          ].join(" ")}
        >
          Start a conversation

          <ArrowUpRight
            size={16}
            className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </a>

        {profile.contactLinks?.length >
        0 ? (
          <div className="mt-3 flex items-center justify-center gap-2">
            {profile.contactLinks.map(
              (link) => (
                <SocialLink
                  key={link.label}
                  link={link}
                />
              )
            )}
          </div>
        ) : null}
      </div>
    </motion.div>
  );
}

export default function Header() {
  const navigate = useNavigate();

  const [
    isOpen,
    setIsOpen,
  ] = useState(false);

  const {
    activeSection,
    isScrolled,
    scrollProgress,
  } = useScrollState();

  const menuButtonRef =
    useRef(null);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow =
      "hidden";

    stopSmoothScroll();

    const handleKeyDown = (
      event
    ) => {
      if (event.key === "Escape") {
        setIsOpen(false);

        window.requestAnimationFrame(
          () => {
            menuButtonRef.current?.focus();
          }
        );
      }
    };

    const desktopQuery =
      window.matchMedia(
        "(min-width: 1280px)"
      );

    const handleDesktopChange = (
      event
    ) => {
      if (event.matches) {
        setIsOpen(false);
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    desktopQuery.addEventListener(
      "change",
      handleDesktopChange
    );

    return () => {
      document.body.style.overflow =
        previousOverflow;

      startSmoothScroll();

      window.removeEventListener(
        "keydown",
        handleKeyDown
      );

      desktopQuery.removeEventListener(
        "change",
        handleDesktopChange
      );
    };
  }, [isOpen]);

  const closeMenu = () => {
    setIsOpen(false);
  };

  const navigateToSection = (
    event,
    sectionId
  ) => {
    event.preventDefault();

    setIsOpen(false);
    markPortfolioNavigation(sectionId);
    navigate({
      pathname: "/",
      hash: `#${sectionId}`,
    });
    scrollToPortfolioSection(sectionId);
  };

  return (
    <header
      className={[
        "pointer-events-none",
        "fixed inset-x-0 top-0",
        "z-50 py-3",
      ].join(" ")}
    >
      <Container>
        <div
          className={[
            "pointer-events-auto",
            "relative flex",
            "h-16 items-center",
            "justify-between gap-3",
            "overflow-hidden",
            "rounded-[1.4rem]",
            "border px-3",
            "transition-all",
            "duration-500",
            "sm:h-[4.5rem]",
            "sm:px-4",
            isScrolled
              ? [
                  "border-white/12",
                  "bg-neutral-950/90",
                  "shadow-[0_18px_55px_rgba(0,0,0,0.36)]",
                  "backdrop-blur-2xl",
                ].join(" ")
              : [
                  "border-white/[0.08]",
                  "bg-neutral-950/65",
                  "shadow-[0_14px_45px_rgba(0,0,0,0.22)]",
                  "backdrop-blur-xl",
                ].join(" "),
          ].join(" ")}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_left,rgba(255,255,255,0.075),transparent_24rem)]"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.018),transparent)]"
          />

          <a
            href="#home"
            onClick={(event) =>
              navigateToSection(
                event,
                "home"
              )
            }
            className={[
              "group relative z-10",
              "inline-flex min-w-0",
              "items-center gap-3",
              "rounded-xl",
              "focus-visible:outline-none",
              "focus-visible:ring-2",
              "focus-visible:ring-white",
            ].join(" ")}
          >
            <BrandMark />

            <span className="hidden min-w-0 sm:block">
              <span className="block truncate text-sm font-semibold tracking-[-0.01em] text-white">
                {profile.name}
              </span>

              <span className="mt-0.5 block text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-neutral-600">
                Developer Portfolio
              </span>
            </span>
          </a>

          <div className="relative z-10 flex min-w-0 flex-1 justify-center">
            <DesktopNavigation
              activeSection={
                activeSection
              }
              onNavigate={
                navigateToSection
              }
            />
          </div>

          <div className="relative z-10 flex shrink-0 items-center gap-2">
            <div className="hidden items-center gap-1.5 2xl:flex">
              {profile.contactLinks?.map(
                (link) => (
                  <SocialLink
                    key={link.label}
                    link={link}
                  />
                )
              )}
            </div>

            <a
              href="#contact"
              onClick={(event) =>
                navigateToSection(
                  event,
                  "contact"
                )
              }
              className={[
                "group hidden",
                "min-h-10 items-center",
                "justify-center gap-2",
                "rounded-full",
                "bg-neutral-100",
                "px-4 py-2",
                "text-xs font-semibold",
                "text-neutral-950",
                "shadow-[0_10px_30px_rgba(0,0,0,0.42)]",
                "transition duration-300",
                "hover:-translate-y-0.5",
                "hover:bg-white",
                "hover:shadow-[0_14px_36px_rgba(0,0,0,0.5)]",
                "focus-visible:outline-none",
                "focus-visible:ring-2",
                "focus-visible:ring-white",
                "xl:inline-flex",
              ].join(" ")}
            >
              Let&apos;s Talk

              <ArrowUpRight
                size={15}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>

            <button
              ref={menuButtonRef}
              type="button"
              onClick={() =>
                setIsOpen(
                  (current) =>
                    !current
                )
              }
              aria-label={
                isOpen
                  ? "Close navigation menu"
                  : "Open navigation menu"
              }
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
              className={[
                "inline-flex h-10 w-10",
                "items-center justify-center",
                "rounded-full border",
                "border-white/10",
                "bg-white/[0.025]",
                "text-white",
                "transition duration-300",
                "hover:border-neutral-100/40",
                "hover:bg-neutral-100/[0.07]",
                "focus-visible:outline-none",
                "focus-visible:ring-2",
                "focus-visible:ring-white",
                "xl:hidden",
              ].join(" ")}
            >
              {isOpen ? (
                <X size={19} />
              ) : (
                <Menu size={19} />
              )}
            </button>
          </div>

          <div
            aria-hidden="true"
            className="absolute inset-x-4 bottom-0 h-px overflow-hidden bg-white/[0.05]"
          >
            <motion.div
              animate={{
                scaleX:
                  scrollProgress,
              }}
              transition={{
                duration: 0.12,
                ease: "linear",
              }}
              className={[
                "absolute inset-0",
                "origin-left",
                "bg-gradient-to-r",
                "from-neutral-300",
                "via-white",
                "to-neutral-400",
                "shadow-[0_0_12px_rgba(255,255,255,0.18)]",
              ].join(" ")}
            />
          </div>
        </div>

        <AnimatePresence>
          {isOpen ? (
            <MobileNavigation
              activeSection={
                activeSection
              }
              onNavigate={
                navigateToSection
              }
              onClose={closeMenu}
            />
          ) : null}
        </AnimatePresence>
      </Container>
    </header>
  );
}
