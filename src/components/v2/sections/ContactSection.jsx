import {
  useEffect,
  useRef,
  useState,
} from "react";

import { contactContent } from "../../../data/contactContent";
import { getHomepageSection } from "../../../data/homepageSections";

import PageSection from "./PageSection";
import SectionHeading from "./SectionHeading";
import SectionPanel from "./SectionPanel";

function ArrowIcon() {
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

function MailIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className="h-5 w-5"
    >
      <path
        d="M3 5.25h14v9.5H3v-9.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      <path
        d="m3.75 6 6.25 4.75L16.25 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DocumentIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className="h-4 w-4"
    >
      <path
        d="M6 2.75h5.25L15 6.5v10.75H6V2.75Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      <path
        d="M11 2.75V6.5h4M8.25 10h4.5M8.25 13h4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className="h-4 w-4"
    >
      <path
        d="M11 4h5v5M9 11l7-7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M16 11.5v3A1.5 1.5 0 0 1 14.5 16h-10A1.5 1.5 0 0 1 3 14.5v-10A1.5 1.5 0 0 1 4.5 3h3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className="h-4 w-4"
    >
      <rect
        x="6.25"
        y="6.25"
        width="9"
        height="9"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />

      <path
        d="M13.75 6.25v-1.5a1.5 1.5 0 0 0-1.5-1.5h-7.5a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h1.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function ContactDetail({
  label,
  value,
}) {
  return (
    <li className="border-t border-white/10 py-4 first:border-t-0 first:pt-0 last:pb-0">
      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-slate-500">
        {label}
      </p>

      <p className="mt-2 text-sm font-medium leading-6 text-slate-200">
        {value}
      </p>
    </li>
  );
}

function SocialCard({ item }) {
  return (
    <a
      href={item.href}
      target={item.external ? "_blank" : undefined}
      rel={
        item.external
          ? "noopener noreferrer"
          : undefined
      }
      className="group relative block rounded-2xl border border-white/10 bg-white/[0.025] p-5 transition duration-300 hover:-translate-y-0.5 hover:border-cyan-300/25 hover:bg-cyan-300/[0.045] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200 focus-visible:ring-offset-4 focus-visible:ring-offset-slate-950"
    >
      <div className="flex items-start justify-between gap-5">
        <div>
          <p className="text-base font-semibold text-white">
            {item.label}
          </p>

          <p className="mt-2 text-xs leading-6 text-slate-400">
            {item.description}
          </p>
        </div>

        <span className="text-slate-500 transition group-hover:text-cyan-200">
          <ExternalLinkIcon />
        </span>
      </div>
    </a>
  );
}

export default function ContactSection() {
  const section = getHomepageSection("contact");

  const [copyState, setCopyState] =
    useState("idle");

  const timeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleCopyEmail = async () => {
    if (!navigator.clipboard) {
      window.location.href =
        contactContent.email.href;

      return;
    }

    try {
      await navigator.clipboard.writeText(
        contactContent.email.value
      );

      setCopyState("copied");
    } catch (error) {
      console.error(
        "Unable to copy the email address:",
        error
      );

      setCopyState("failed");
    }

    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      setCopyState("idle");
    }, 2500);
  };

  const copyLabel =
    copyState === "copied"
      ? "Email copied"
      : copyState === "failed"
        ? "Open email instead"
        : "Copy email";

  return (
    <PageSection
      id="contact"
      labelledBy="contact-heading"
      tone="elevated"
      containerClassName="pb-16 sm:pb-20 lg:pb-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_78%_35%,rgba(34,211,238,0.07),transparent_30rem)]"
      />

      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-14 xl:gap-20">
        <div>
          <SectionHeading
            id="contact-heading"
            eyebrow={
              section?.eyebrow ??
              "Let’s Connect"
            }
            title={contactContent.title}
            description={contactContent.introduction}
          />

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={contactContent.primaryAction.href}
              className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-cyan-300 px-6 py-3 text-sm font-semibold text-slate-950 shadow-[0_14px_42px_rgba(8,145,178,0.2)] transition duration-300 hover:-translate-y-0.5 hover:bg-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200 focus-visible:ring-offset-4 focus-visible:ring-offset-slate-950 sm:w-auto"
            >
              <MailIcon />

              {contactContent.primaryAction.label}

              <span className="transition-transform group-hover:translate-x-0.5">
                <ArrowIcon />
              </span>
            </a>

            <a
              href={contactContent.resumeAction.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.035] px-6 py-3 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:border-cyan-200/40 hover:bg-cyan-300/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200 focus-visible:ring-offset-4 focus-visible:ring-offset-slate-950 sm:w-auto"
            >
              <DocumentIcon />

              {contactContent.resumeAction.label}
            </a>
          </div>

          <p className="mt-7 max-w-xl text-sm leading-7 text-slate-500">
            {contactContent.closing}
          </p>
        </div>

        <SectionPanel className="p-5 sm:p-6 lg:p-7">
          <div className="flex items-start justify-between gap-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200">
                Direct contact
              </p>

              <h3 className="mt-3 text-xl font-semibold tracking-[-0.03em] text-white sm:text-2xl">
                Start a conversation.
              </h3>
            </div>

            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-40 motion-reduce:animate-none" />

              <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-400" />
            </span>
          </div>

          <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950/35 p-4 sm:p-5">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-slate-500">
              Email address
            </p>

            <a
              href={contactContent.email.href}
              className="mt-2 block break-all text-base font-semibold leading-7 text-cyan-100 transition hover:text-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200"
            >
              {contactContent.email.value}
            </a>

            <button
              type="button"
              onClick={handleCopyEmail}
              className="mt-4 inline-flex min-h-10 items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-semibold text-slate-300 transition hover:border-white/20 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200"
            >
              <CopyIcon />

              {copyLabel}
            </button>

            <p
              role="status"
              aria-live="polite"
              className="sr-only"
            >
              {copyState === "copied"
                ? "Email address copied to the clipboard."
                : copyState === "failed"
                  ? "The email address could not be copied."
                  : ""}
            </p>
          </div>

          <ul className="mt-6">
            <ContactDetail
              label={
                contactContent.availability.label
              }
              value={
                contactContent.availability.value
              }
            />

            <ContactDetail
              label={contactContent.location.label}
              value={contactContent.location.value}
            />

            <ContactDetail
              label={contactContent.response.label}
              value={contactContent.response.value}
            />
          </ul>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {contactContent.socialLinks.map(
              (item) => (
                <SocialCard
                  key={item.id}
                  item={item}
                />
              )
            )}
          </div>
        </SectionPanel>
      </div>
    </PageSection>
  );
}