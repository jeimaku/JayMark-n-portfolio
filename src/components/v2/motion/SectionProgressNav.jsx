import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";

import useMotionRuntime from "../../../hooks/useMotionRuntime";

const sectionItems = [
  {
    id: "home",
    label: "Home",
  },
  {
    id: "about",
    label: "About",
  },
  {
    id: "skills",
    label: "Skills",
  },
  {
    id: "projects",
    label: "Projects",
  },
  {
    id: "experience",
    label: "Experience",
  },
  {
    id: "education",
    label: "Education",
  },
  {
    id: "contact",
    label: "Contact",
  },
];

export default function SectionProgressNav() {
  const [activeSection, setActiveSection] =
    useState("home");

  const sectionElementsRef =
    useRef([]);

  const {
    scrollY,
    scrollYProgress,
  } = useScroll();

  const {
    allowScrollLinkedMotion,
    prefersReducedMotion,
  } = useMotionRuntime();

  const navOpacity = useTransform(
    scrollYProgress,
    [0, 0.035, 1],
    [0, 1, 1]
  );

  const updateActiveSection =
    useCallback(() => {
      const elements =
        sectionElementsRef.current;

      if (elements.length === 0) {
        return;
      }

      const viewportMarker =
        window.innerHeight * 0.34;

      let nextSection =
        elements[0]?.id ?? "home";

      for (const element of elements) {
        const bounds =
          element.node.getBoundingClientRect();

        if (
          bounds.top <= viewportMarker
        ) {
          nextSection = element.id;
        }

        if (
          bounds.top <= viewportMarker &&
          bounds.bottom > viewportMarker
        ) {
          nextSection = element.id;
          break;
        }
      }

      setActiveSection(
        (currentSection) =>
          currentSection === nextSection
            ? currentSection
            : nextSection
      );
    }, []);

  useEffect(() => {
    sectionElementsRef.current =
      sectionItems
        .map((item) => ({
          id: item.id,
          node:
            document.getElementById(
              item.id
            ),
        }))
        .filter((item) =>
          Boolean(item.node)
        );

    const hashSection =
      window.location.hash.replace(
        "#",
        ""
      );

    if (
      sectionItems.some(
        (item) =>
          item.id === hashSection
      )
    ) {
      setActiveSection(hashSection);
    }

    const frameId =
      window.requestAnimationFrame(
        updateActiveSection
      );

    return () => {
      window.cancelAnimationFrame(
        frameId
      );
    };
  }, [updateActiveSection]);

  useMotionValueEvent(
    scrollY,
    "change",
    updateActiveSection
  );

  return (
    <motion.nav
      aria-label="Portfolio sections"
      style={
        allowScrollLinkedMotion
          ? {
              opacity: navOpacity,
            }
          : undefined
      }
      className={[
        "pointer-events-none fixed",
        "right-4 top-1/2 z-[55]",
        "hidden -translate-y-1/2",
        "xl:block 2xl:right-6",
      ].join(" ")}
    >
      <ol className="grid gap-2">
        {sectionItems.map(
          (item, index) => {
            const active =
              activeSection === item.id;

            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-label={`Go to ${item.label}`}
                  aria-current={
                    active
                      ? "location"
                      : undefined
                  }
                  className={[
                    "group pointer-events-auto",
                    "flex h-8 items-center",
                    "justify-end gap-3",
                    "focus-visible:outline-none",
                    "focus-visible:ring-2",
                    "focus-visible:ring-cyan-200",
                  ].join(" ")}
                >
                  <span
                    className={[
                      "rounded-full",
                      "border border-white/10",
                      "bg-slate-950/75",
                      "px-2.5 py-1",
                      "text-[0.6rem]",
                      "font-semibold uppercase",
                      "tracking-[0.14em]",
                      "backdrop-blur",
                      "transition duration-300",
                      active
                        ? [
                            "translate-x-0",
                            "text-cyan-100",
                            "opacity-100",
                          ].join(" ")
                        : [
                            "translate-x-2",
                            "text-slate-500",
                            "opacity-0",
                            "group-hover:translate-x-0",
                            "group-hover:opacity-100",
                            "group-focus-visible:translate-x-0",
                            "group-focus-visible:opacity-100",
                          ].join(" "),
                    ].join(" ")}
                  >
                    {item.label}
                  </span>

                  <motion.span
                    aria-hidden="true"
                    animate={{
                      scale: active
                        ? 1.45
                        : 1,
                    }}
                    transition={
                      prefersReducedMotion
                        ? {
                            duration: 0,
                          }
                        : {
                            duration: 0.24,
                            ease: [
                              0.22,
                              1,
                              0.36,
                              1,
                            ],
                          }
                    }
                    className={[
                      "relative flex h-3 w-3",
                      "items-center justify-center",
                      "rounded-full border",
                      "transition duration-300",
                      active
                        ? [
                            "border-cyan-100/80",
                            "bg-cyan-300",
                            "shadow-[0_0_16px_rgba(34,211,238,0.75)]",
                          ].join(" ")
                        : [
                            "border-white/20",
                            "bg-slate-950",
                            "group-hover:border-cyan-200/50",
                          ].join(" "),
                    ].join(" ")}
                  >
                    <span
                      className={[
                        "h-1 w-1 rounded-full",
                        active
                          ? "bg-slate-950"
                          : "bg-slate-600",
                      ].join(" ")}
                    />
                  </motion.span>

                  <span className="sr-only">
                    Section{" "}
                    {index + 1} of{" "}
                    {sectionItems.length}
                  </span>
                </a>
              </li>
            );
          }
        )}
      </ol>
    </motion.nav>
  );
}