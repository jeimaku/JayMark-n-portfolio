import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";

import Container from "../../layout/Container";
import Section from "../../layout/Section";
import SectionHeading from "../../ui/SectionHeading";

import {
  certificationShowcase,
  certifications,
  getCertificationNeighbors,
} from "../../../data/certifications";

const MOTION_EASE = [
  0.22,
  1,
  0.36,
  1,
];

function ArrowLeftIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className="h-4 w-4"
    >
      <path
        d="M15.5 10h-11m4.25-4.25L4.5 10l4.25 4.25"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowRightIcon() {
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

function ExpandIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className="h-4 w-4"
    >
      <path
        d="M7.25 3.75h-3.5v3.5M12.75 3.75h3.5v3.5M7.25 16.25h-3.5v-3.5M12.75 16.25h3.5v-3.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className="h-4 w-4"
    >
      <path
        d="M10 3.5v8m-3-3 3 3 3-3M4.5 14.5v2h11v-2"
        stroke="currentColor"
        strokeWidth="1.65"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className="h-5 w-5"
    >
      <path
        d="m5 5 10 10M15 5 5 15"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CertificateListItem({
  certificate,
  index,
  active,
  onSelect,
  reducedMotion,
}) {
  return (
    <motion.button
      type="button"
      role="tab"
      aria-selected={active}
      aria-controls={`certificate-panel-${certificate.id}`}
      id={`certificate-tab-${certificate.id}`}
      onClick={onSelect}
      initial={
        reducedMotion
          ? false
          : {
              opacity: 0,
              x: -24,
              y: 10,
            }
      }
      whileInView={
        reducedMotion
          ? undefined
          : {
              opacity: 1,
              x: 0,
              y: 0,
            }
      }
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        duration: 0.55,
        delay: Math.min(
          index * 0.055,
          0.25
        ),
        ease: MOTION_EASE,
      }}
      className={[
        "group relative w-full",
        "overflow-hidden rounded-2xl",
        "border p-3 text-left",
        "transition duration-300",
        "focus-visible:outline-none",
        "focus-visible:ring-2",
        "focus-visible:ring-white",
        active
          ? [
              "border-neutral-100/40",
              "bg-neutral-100/[0.065]",
              "shadow-[0_16px_45px_rgba(0,0,0,0.36)]",
            ].join(" ")
          : [
              "border-white/10",
              "bg-white/[0.02]",
              "hover:border-white/25",
              "hover:bg-white/[0.04]",
            ].join(" "),
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
          "via-white/60",
          "to-transparent",
          "transition-opacity duration-300",
          active
            ? "opacity-100"
            : "opacity-0",
        ].join(" ")}
      />

      <div className="relative flex items-center gap-3">
        <div
          className={[
            "h-16 w-20 shrink-0",
            "overflow-hidden rounded-xl",
            "border bg-neutral-950",
            active
              ? "border-neutral-100/25"
              : "border-white/10",
          ].join(" ")}
        >
          <img
            src={certificate.image}
            alt=""
            loading="lazy"
            decoding="async"
            draggable={false}
            className="h-full w-full object-cover object-top"
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-3">
            <p
              className={[
                "font-mono text-[0.58rem]",
                active
                  ? "text-white"
                  : "text-neutral-700",
              ].join(" ")}
            >
              {String(index + 1).padStart(
                2,
                "0"
              )}
            </p>

            <span
              className={[
                "h-1.5 w-1.5",
                "shrink-0 rounded-full",
                "transition duration-300",
                active
                  ? [
                      "bg-neutral-100",
                      "shadow-[0_0_12px_rgba(255,255,255,0.22)]",
                    ].join(" ")
                  : "bg-neutral-700",
              ].join(" ")}
            />
          </div>

          <p
            className={[
              "mt-1 line-clamp-2",
              "text-sm font-semibold",
              "leading-5",
              active
                ? "text-white"
                : "text-neutral-400 group-hover:text-neutral-200",
            ].join(" ")}
          >
            {certificate.name}
          </p>

          <p className="mt-1 text-[0.65rem] text-neutral-600">
            {certificate.category}
          </p>
        </div>
      </div>
    </motion.button>
  );
}

function CertificatePreview({
  certificate,
  selectedIndex,
  certificateCount,
  direction,
  onPrevious,
  onNext,
  onOpen,
  reducedMotion,
}) {
  return (
    <div
      id={`certificate-panel-${certificate.id}`}
      role="tabpanel"
      tabIndex={0}
      aria-labelledby={`certificate-tab-${certificate.id}`}
      className={[
        "relative overflow-hidden",
        "rounded-[2rem] border",
        "border-white/10",
        "bg-neutral-950/45",
        "shadow-[0_30px_100px_rgba(0,0,0,0.32)]",
        "focus-visible:outline-none",
        "focus-visible:ring-2",
        "focus-visible:ring-white",
      ].join(" ")}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.085),transparent_30rem)]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(163,163,163,0.055),transparent_28rem)]"
      />

      <div className="relative">
        <div
          className={[
            "flex flex-col gap-4",
            "border-b border-white/[0.07]",
            "px-4 py-4 sm:px-5",
            "md:flex-row",
            "md:items-center",
            "md:justify-between",
          ].join(" ")}
        >
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-neutral-100/20 bg-neutral-100/[0.07] px-3 py-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-neutral-100">
                Verified Credential
              </span>

              <span className="rounded-full border border-white/10 bg-white/[0.025] px-3 py-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-neutral-400">
                {certificate.year}
              </span>
            </div>

            <h3 className="mt-4 max-w-3xl text-xl font-semibold tracking-[-0.035em] text-white sm:text-2xl">
              {certificate.name}
            </h3>

            <p className="mt-2 text-sm text-neutral-500">
              {certificate.provider}
              {" · "}
              {certificate.category}
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <button
              type="button"
              onClick={onPrevious}
              aria-label="Show previous certificate"
              className={[
                "inline-flex h-10 w-10",
                "items-center justify-center",
                "rounded-full border",
                "border-white/15",
                "bg-white/[0.035]",
                "text-neutral-300",
                "transition duration-300",
                "hover:border-white/40",
                "hover:bg-neutral-100/[0.08]",
                "hover:text-white",
                "focus-visible:outline-none",
                "focus-visible:ring-2",
                "focus-visible:ring-white",
              ].join(" ")}
            >
              <ArrowLeftIcon />
            </button>

            <div className="min-w-[6rem] text-center">
              <p className="font-mono text-xs font-semibold text-neutral-100">
                {String(
                  selectedIndex + 1
                ).padStart(2, "0")}
                {" / "}
                {String(
                  certificateCount
                ).padStart(2, "0")}
              </p>

              <p className="mt-1 text-[0.56rem] font-semibold uppercase tracking-[0.14em] text-neutral-600">
                Credential
              </p>
            </div>

            <button
              type="button"
              onClick={onNext}
              aria-label="Show next certificate"
              className={[
                "inline-flex h-10 w-10",
                "items-center justify-center",
                "rounded-full border",
                "border-white/15",
                "bg-white/[0.035]",
                "text-neutral-300",
                "transition duration-300",
                "hover:border-white/40",
                "hover:bg-neutral-100/[0.08]",
                "hover:text-white",
                "focus-visible:outline-none",
                "focus-visible:ring-2",
                "focus-visible:ring-white",
              ].join(" ")}
            >
              <ArrowRightIcon />
            </button>
          </div>
        </div>

        <div className="p-3 sm:p-4 lg:p-5">
          <AnimatePresence
            initial={false}
            mode="wait"
            custom={direction}
          >
            <motion.div
              key={certificate.id}
              custom={direction}
              initial={
                reducedMotion
                  ? false
                  : {
                      opacity: 0,
                      x:
                        direction > 0
                          ? 34
                          : -34,
                      scale: 0.985,
                      filter:
                        "blur(5px)",
                    }
              }
              animate={{
                opacity: 1,
                x: 0,
                scale: 1,
                filter: "blur(0px)",
              }}
              exit={
                reducedMotion
                  ? undefined
                  : {
                      opacity: 0,
                      x:
                        direction > 0
                          ? -28
                          : 28,
                      scale: 0.99,
                      filter:
                        "blur(3px)",
                    }
              }
              transition={{
                duration:
                  reducedMotion
                    ? 0
                    : 0.55,
                ease: MOTION_EASE,
              }}
              drag={
                reducedMotion
                  ? false
                  : "x"
              }
              dragConstraints={{
                left: 0,
                right: 0,
              }}
              dragElastic={0.14}
              onDragEnd={(
                event,
                information
              ) => {
                if (
                  information.offset.x <
                    -80 ||
                  information.velocity.x <
                    -500
                ) {
                  onNext();
                  return;
                }

                if (
                  information.offset.x >
                    80 ||
                  information.velocity.x >
                    500
                ) {
                  onPrevious();
                }
              }}
              className="cursor-grab active:cursor-grabbing"
            >
              <button
                type="button"
                onClick={onOpen}
                aria-label={`Open ${certificate.name} in a larger viewer`}
                className={[
                  "group relative block",
                  "w-full overflow-hidden",
                  "rounded-2xl border",
                  "border-white/10",
                  "bg-neutral-900/40",
                  "focus-visible:outline-none",
                  "focus-visible:ring-2",
                  "focus-visible:ring-white",
                ].join(" ")}
              >
                <img
                  src={certificate.image}
                  alt={`${certificate.name} certificate issued by ${certificate.provider}`}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  className={[
                    "aspect-[16/10]",
                    "w-full object-contain",
                    "bg-neutral-950",
                    "transition duration-500",
                    "group-hover:scale-[1.01]",
                  ].join(" ")}
                />

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/[0.035]"
                />

                <div className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-neutral-950/85 px-4 py-2 text-xs font-semibold text-white backdrop-blur">
                  <ExpandIcon />

                  View certificate
                </div>
              </button>
            </motion.div>
          </AnimatePresence>
        </div>

        <div
          className={[
            "flex flex-col gap-4",
            "border-t border-white/[0.07]",
            "px-4 py-4 sm:px-5",
            "md:flex-row",
            "md:items-center",
            "md:justify-between",
          ].join(" ")}
        >
          <div>
            <p className="text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-neutral-600">
              Credential category
            </p>

            <p className="mt-1 text-sm font-medium text-neutral-300">
              {certificate.category}
            </p>
          </div>

          {certificate.download ? (
            <a
              href={certificate.download}
              target="_blank"
              rel="noopener noreferrer"
              className={[
                "inline-flex min-h-11",
                "w-full items-center justify-center",
                "gap-2 rounded-full",
                "border border-neutral-100/25",
                "bg-neutral-100/[0.07]",
                "px-5 py-2.5",
                "text-sm font-semibold",
                "text-neutral-100",
                "transition duration-300",
                "hover:-translate-y-0.5",
                "hover:border-white/45",
                "hover:bg-neutral-100/[0.12]",
                "focus-visible:outline-none",
                "focus-visible:ring-2",
                "focus-visible:ring-white",
                "sm:w-auto",
              ].join(" ")}
            >
              <DownloadIcon />

              Open PDF
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function CertificateLightbox({
  certificate,
  onClose,
}) {
  useEffect(() => {
    if (!certificate) {
      return undefined;
    }

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow =
      "hidden";

    const handleKeyDown = (
      event
    ) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.body.style.overflow =
        previousOverflow;

      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [
    certificate,
    onClose,
  ]);

  if (!certificate) {
    return null;
  }

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      data-lenis-prevent=""
      aria-label={`${certificate.name} certificate preview`}
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      transition={{
        duration: 0.22,
      }}
      className={[
        "fixed inset-0 z-[120]",
        "flex items-center justify-center",
        "bg-neutral-950/92 p-4",
        "backdrop-blur-xl",
        "sm:p-6",
      ].join(" ")}
      onMouseDown={(event) => {
        if (
          event.target ===
          event.currentTarget
        ) {
          onClose();
        }
      }}
    >
      <motion.div
        initial={{
          opacity: 0,
          y: 24,
          scale: 0.97,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        exit={{
          opacity: 0,
          y: 16,
          scale: 0.98,
        }}
        transition={{
          duration: 0.35,
          ease: MOTION_EASE,
        }}
        className={[
          "relative flex max-h-[92vh]",
          "w-full max-w-6xl",
          "flex-col overflow-hidden",
          "rounded-[1.75rem]",
          "border border-white/10",
          "bg-neutral-950",
          "shadow-[0_35px_120px_rgba(0,0,0,0.65)]",
        ].join(" ")}
      >
        <div
          className={[
            "flex items-start",
            "justify-between gap-5",
            "border-b border-white/10",
            "px-4 py-4 sm:px-6",
          ].join(" ")}
        >
          <div className="min-w-0">
            <p className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-white">
              Certificate Preview
            </p>

            <h3 className="mt-2 truncate text-lg font-semibold text-white">
              {certificate.name}
            </h3>

            <p className="mt-1 text-xs text-neutral-500">
              {certificate.provider}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close certificate preview"
            autoFocus
            className={[
              "inline-flex h-10 w-10",
              "shrink-0 items-center",
              "justify-center",
              "rounded-full border",
              "border-white/15",
              "bg-white/[0.035]",
              "text-neutral-300",
              "transition duration-300",
              "hover:border-white/40",
              "hover:text-white",
              "focus-visible:outline-none",
              "focus-visible:ring-2",
              "focus-visible:ring-white",
            ].join(" ")}
          >
            <CloseIcon />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-auto bg-black/20 p-3 sm:p-5">
          <img
            src={certificate.image}
            alt={`${certificate.name} certificate issued by ${certificate.provider}`}
            draggable={false}
            className="mx-auto max-h-[72vh] w-auto max-w-full rounded-xl object-contain"
          />
        </div>

        {certificate.download ? (
          <div className="border-t border-white/10 px-4 py-4 sm:px-6">
            <a
              href={certificate.download}
              target="_blank"
              rel="noopener noreferrer"
              className={[
                "inline-flex min-h-11",
                "w-full items-center justify-center",
                "gap-2 rounded-full",
                "bg-neutral-100 px-5 py-2.5",
                "text-sm font-semibold",
                "text-neutral-950",
                "transition duration-300",
                "hover:bg-white",
                "focus-visible:outline-none",
                "focus-visible:ring-2",
                "focus-visible:ring-white",
                "sm:w-auto",
              ].join(" ")}
            >
              <DownloadIcon />

              Open PDF Certificate
            </a>
          </div>
        ) : null}
      </motion.div>
    </motion.div>
  );
}

export default function CertificationsSection() {
  const reducedMotion =
    useReducedMotion();

  const defaultCertification =
    certifications.find(
      (certificate) =>
        certificate.id ===
        certificationShowcase.defaultCertificationId
    ) ??
    certifications[0] ??
    null;

  const [
    selectedCertificateId,
    setSelectedCertificateId,
  ] = useState(
    defaultCertification?.id ?? ""
  );

  const [direction, setDirection] =
    useState(1);

  const [
    previewCertificate,
    setPreviewCertificate,
  ] = useState(null);

  const selectedIndex = Math.max(
    0,
    certifications.findIndex(
      (certificate) =>
        certificate.id ===
        selectedCertificateId
    )
  );

  const selectedCertificate =
    certifications[selectedIndex] ??
    defaultCertification;

  const providerCount =
    useMemo(
      () =>
        new Set(
          certifications
            .map(
              (certificate) =>
                certificate.provider
            )
            .filter(Boolean)
        ).size,
      []
    );

  const selectCertificate = (
    certificateId
  ) => {
    const nextIndex =
      certifications.findIndex(
        (certificate) =>
          certificate.id ===
          certificateId
      );

    if (nextIndex < 0) {
      return;
    }

    setDirection(
      nextIndex >= selectedIndex
        ? 1
        : -1
    );

    setSelectedCertificateId(
      certificateId
    );
  };

  const showPrevious = () => {
    if (!selectedCertificate) {
      return;
    }

    const {
      previousCertification,
    } = getCertificationNeighbors(
      selectedCertificate.id
    );

    if (!previousCertification) {
      return;
    }

    setDirection(-1);

    setSelectedCertificateId(
      previousCertification.id
    );
  };

  const showNext = () => {
    if (!selectedCertificate) {
      return;
    }

    const {
      nextCertification,
    } = getCertificationNeighbors(
      selectedCertificate.id
    );

    if (!nextCertification) {
      return;
    }

    setDirection(1);

    setSelectedCertificateId(
      nextCertification.id
    );
  };

  const handleKeyDown = (
    event
  ) => {
    switch (event.key) {
      case "ArrowLeft":
      case "ArrowUp":
        event.preventDefault();
        showPrevious();
        break;

      case "ArrowRight":
      case "ArrowDown":
        event.preventDefault();
        showNext();
        break;

      case "Home":
        event.preventDefault();

        setDirection(-1);

        setSelectedCertificateId(
          certifications[0]?.id ?? ""
        );
        break;

      case "End":
        event.preventDefault();

        setDirection(1);

        setSelectedCertificateId(
          certifications[
            certifications.length - 1
          ]?.id ?? ""
        );
        break;

      default:
        break;
    }
  };

  if (!selectedCertificate) {
    return null;
  }

  return (
    <>
      <Section
        id="certifications"
        optimize={false}
        className="relative overflow-hidden"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-48 top-[15%] -z-10 h-[32rem] w-[32rem] rounded-full bg-neutral-300/[0.06] blur-3xl"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-48 bottom-[5%] -z-10 h-[30rem] w-[30rem] rounded-full bg-neutral-500/[0.055] blur-3xl"
        />

        <Container>
          <motion.div
            initial={
              reducedMotion
                ? false
                : {
                    opacity: 0,
                    y: 30,
                    filter:
                      "blur(5px)",
                  }
            }
            whileInView={
              reducedMotion
                ? undefined
                : {
                    opacity: 1,
                    y: 0,
                    filter:
                      "blur(0px)",
                  }
            }
            viewport={{
              once: true,
              amount: 0.15,
            }}
            transition={{
              duration: 0.72,
              ease: MOTION_EASE,
            }}
            className="max-w-4xl"
          >
            <SectionHeading
              eyebrow={
                certificationShowcase.eyebrow
              }
              title={
                certificationShowcase.title
              }
              description={
                certificationShowcase.description
              }
            />
          </motion.div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-4">
              <p className="font-mono text-2xl font-semibold text-neutral-100">
                {String(
                  certifications.length
                ).padStart(2, "0")}
              </p>

              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">
                Certificates
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-4">
              <p className="font-mono text-2xl font-semibold text-neutral-100">
                {String(
                  providerCount
                ).padStart(2, "0")}
              </p>

              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">
                Credential provider
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-4">
              <p className="font-mono text-2xl font-semibold text-neutral-100">
                {selectedCertificate.year}
              </p>

              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">
                Completion year
              </p>
            </div>
          </div>

          <div
            role="region"
            aria-label="Professional certificate gallery"
            tabIndex={0}
            onKeyDown={handleKeyDown}
            className={[
              "mt-8 grid gap-6",
              "lg:grid-cols-[20rem_minmax(0,1fr)]",
              "focus-visible:outline-none",
            ].join(" ")}
          >
            <div
              role="tablist"
              aria-label="Certificate selection"
              aria-orientation="vertical"
              data-lenis-prevent=""
              className={[
                "grid gap-3",
                "sm:grid-cols-2",
                "lg:max-h-[48rem]",
                "lg:grid-cols-1",
                "lg:overflow-y-auto",
                "lg:pr-2",
              ].join(" ")}
            >
              {certifications.map(
                (
                  certificate,
                  index
                ) => (
                  <CertificateListItem
                    key={
                      certificate.id
                    }
                    certificate={
                      certificate
                    }
                    index={index}
                    active={
                      certificate.id ===
                      selectedCertificate.id
                    }
                    onSelect={() =>
                      selectCertificate(
                        certificate.id
                      )
                    }
                    reducedMotion={
                      reducedMotion
                    }
                  />
                )
              )}
            </div>

            <CertificatePreview
              certificate={
                selectedCertificate
              }
              selectedIndex={
                selectedIndex
              }
              certificateCount={
                certifications.length
              }
              direction={direction}
              onPrevious={
                showPrevious
              }
              onNext={showNext}
              onOpen={() =>
                setPreviewCertificate(
                  selectedCertificate
                )
              }
              reducedMotion={
                reducedMotion
              }
            />
          </div>

          <p className="mt-4 text-center text-xs leading-6 text-neutral-600">
            Select a credential, use
            the arrows, drag the preview,
            or use the keyboard arrow
            keys.
          </p>
        </Container>
      </Section>

      <AnimatePresence>
        {previewCertificate ? (
          <CertificateLightbox
            certificate={
              previewCertificate
            }
            onClose={() =>
              setPreviewCertificate(
                null
              )
            }
          />
        ) : null}
      </AnimatePresence>
    </>
  );
}
