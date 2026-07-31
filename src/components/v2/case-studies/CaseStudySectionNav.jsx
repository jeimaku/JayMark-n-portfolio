import {
  useEffect,
  useState,
} from "react";

function getInitialSectionId(sections) {
  if (typeof window === "undefined") {
    return sections[0]?.id ?? "";
  }

  const hashId = window.location.hash.replace(
    "#",
    ""
  );

  return sections.some(
    (section) => section.id === hashId
  )
    ? hashId
    : sections[0]?.id ?? "";
}

export default function CaseStudySectionNav({
  sections = [],
}) {
  const [activeId, setActiveId] = useState(() =>
    getInitialSectionId(sections)
  );

  useEffect(() => {
    const sectionElements = sections
      .map((section) =>
        document.getElementById(section.id)
      )
      .filter(Boolean);

    if (sectionElements.length === 0) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (first, second) =>
              second.intersectionRatio -
              first.intersectionRatio
          );

        if (visibleEntries.length > 0) {
          setActiveId(visibleEntries[0].target.id);
        }
      },
      {
        root: null,
        rootMargin: "-22% 0px -62% 0px",
        threshold: [
          0,
          0.1,
          0.25,
          0.5,
          0.75,
        ],
      }
    );

    sectionElements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, [sections]);

  if (sections.length === 0) {
    return null;
  }

  return (
    <nav
      aria-label="Case study sections"
      className="sticky top-16 z-40 border-y border-white/10 bg-slate-950/90 backdrop-blur-xl"
    >
      <div className="mx-auto w-full max-w-[90rem] overflow-x-auto px-4 sm:px-6 lg:px-10">
        <ul className="flex min-w-max items-center gap-1 py-2">
          {sections.map((section, index) => {
            const active =
              section.id === activeId;

            return (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  aria-current={
                    active ? "location" : undefined
                  }
                  onClick={() =>
                    setActiveId(section.id)
                  }
                  className={[
                    "inline-flex min-h-10 items-center",
                    "gap-2 rounded-full px-4 py-2",
                    "text-xs font-semibold transition",
                    "focus-visible:outline-none",
                    "focus-visible:ring-2",
                    "focus-visible:ring-cyan-200",
                    active
                      ? "bg-cyan-300/[0.1] text-cyan-100"
                      : "text-slate-500 hover:bg-white/[0.035] hover:text-slate-200",
                  ].join(" ")}
                >
                  <span
                    aria-hidden="true"
                    className={[
                      "font-mono text-[0.6rem]",
                      active
                        ? "text-cyan-300"
                        : "text-slate-700",
                    ].join(" ")}
                  >
                    {String(index + 1).padStart(
                      2,
                      "0"
                    )}
                  </span>

                  {section.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}