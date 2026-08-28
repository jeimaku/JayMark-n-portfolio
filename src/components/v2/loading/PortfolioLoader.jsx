import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────

const EASE = [0.22, 1, 0.36, 1];
const EASE_IN = [0.4, 0, 1, 1];

// Boot log lines — appear sequentially during loading
const BOOT_LINES = [
  { id: "env",    text: "Initializing environment",          status: "ok"      },
  { id: "assets", text: "Loading static assets",             status: "ok"      },
  { id: "sys",    text: "Mounting application modules",      status: "ok"      },
  { id: "theme",  text: "Applying system theme",             status: "ok"      },
  { id: "ready",  text: "Portfolio ready",                   status: "ready"   },
];

// MS between each log line appearing (normal / low-perf)
const LINE_INTERVAL     = 220;
const LP_LINE_INTERVAL  = 120;

// Total sequence timing (ms)
const TIMING = {
  normal:  { readyDelay: 1550, exitDelay: 2100 },
  reduced: { readyDelay:  400, exitDelay:  700 },
};

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

function getPerformanceMode() {
  if (typeof navigator === "undefined") return false;
  const lowCPU = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;
  const lowMem = navigator.deviceMemory && navigator.deviceMemory <= 4;
  return Boolean(lowCPU || lowMem);
}

function useReducedMotion() {
  const [rm, setRm] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setRm(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return rm;
}

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────────────────────

// Blinking cursor
function Cursor({ visible }) {
  return (
    <motion.span
      aria-hidden="true"
      animate={{ opacity: visible ? [1, 0, 1] : 0 }}
      transition={visible ? { duration: 0.9, repeat: Infinity, ease: "linear" } : { duration: 0 }}
      className="ml-0.5 inline-block h-3 w-0.5 translate-y-[1px] bg-neutral-100"
    />
  );
}

// Single log line
function BootLine({ line, index, visible, isLast, lp }) {
  const statusColor = {
    ok:    "text-emerald-400",
    ready: "text-neutral-100",
    warn:  "text-amber-400",
    error: "text-rose-400",
  }[line.status] ?? "text-neutral-400";

  const statusLabel = {
    ok:    "OK",
    ready: "READY",
    warn:  "WARN",
    error: "ERR",
  }[line.status] ?? "—";

  return (
    <motion.div
      initial={{ opacity: 0, x: lp ? 0 : -6 }}
      animate={visible ? { opacity: 1, x: 0 } : { opacity: 0, x: lp ? 0 : -6 }}
      transition={{ duration: lp ? 0.15 : 0.32, ease: EASE }}
      className="flex items-center gap-3 font-mono"
    >
      {/* Line number */}
      <span className="w-5 shrink-0 text-right text-[0.6rem] text-neutral-700 select-none">
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Status badge */}
      <span className={["w-10 shrink-0 text-[0.6rem] font-bold tracking-widest", statusColor].join(" ")}>
        [{statusLabel}]
      </span>

      {/* Text */}
      <span className="text-[0.7rem] tracking-wide text-neutral-300">
        {line.text}
        {isLast && <Cursor visible={true} />}
      </span>
    </motion.div>
  );
}

// Horizontal scan sweep line (CSS animation, no JS loop)
function ScanLine({ active, lp }) {
  if (lp) return null;
  return (
    <motion.div
      aria-hidden="true"
      initial={{ scaleY: 0, opacity: 0 }}
      animate={active ? { scaleY: 1, opacity: 1 } : { scaleY: 0, opacity: 0 }}
      transition={{ duration: 0.4, ease: EASE }}
      className="pointer-events-none absolute inset-x-0 top-0 origin-top overflow-hidden"
      style={{ height: "100%" }}
    >
      <div className="scan-sweep" />
    </motion.div>
  );
}

// Corner bracket (pure CSS, no JS animation)
function Corner({ pos }) {
  const cls = {
    tl: "left-0 top-0 border-l border-t",
    tr: "right-0 top-0 border-r border-t",
    bl: "left-0 bottom-0 border-l border-b",
    br: "right-0 bottom-0 border-r border-b",
  }[pos];
  return (
    <span
      aria-hidden="true"
      className={["absolute h-8 w-8 border-neutral-100/50", cls].join(" ")}
    />
  );
}

// Progress bar
function ProgressBar({ progress, lp }) {
  return (
    <div className="relative h-px w-full overflow-hidden bg-white/[0.07]">
      <motion.div
        className="absolute left-0 top-0 h-full bg-gradient-to-r from-neutral-300 to-white"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: progress / 100 }}
        style={{ originX: 0, width: "100%" }}
        transition={{ duration: lp ? 0.2 : 0.55, ease: EASE }}
      />
    </div>
  );
}

// Identity block — name + role + version
function IdentityBlock({ visible, isExiting, lp }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: lp ? 0 : 14 }}
      animate={
        isExiting
          ? { opacity: 0, y: lp ? 0 : -20 }
          : visible
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: lp ? 0 : 14 }
      }
      transition={{ duration: lp ? 0.2 : 0.65, ease: EASE }}
      className="text-center"
    >
      <p className="font-mono text-[0.55rem] uppercase tracking-[0.35em] text-neutral-100/60">
        portfolio.v2 · initialized
      </p>
      <h1 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-white sm:text-3xl">
        Jay Mark Apelado
      </h1>
      <p className="mt-2 font-mono text-[0.62rem] uppercase tracking-[0.28em] text-neutral-400">
        Full-Stack Developer · IT Support Specialist
      </p>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Loader styles injected once
// ─────────────────────────────────────────────────────────────────────────────

const STYLES = `
@keyframes scan {
  0%   { transform: translateY(-100%); opacity: 0.18; }
  50%  { opacity: 0.22; }
  100% { transform: translateY(800%);  opacity: 0; }
}
.scan-sweep {
  position: absolute;
  inset-x: 0;
  top: 0;
  height: 12.5%;
  background: linear-gradient(to bottom, transparent, rgba(255,255,255,0.08) 40%, transparent);
  animation: scan 2.2s linear infinite;
}
`;

function InjectStyles() {
  useEffect(() => {
    const el = document.createElement("style");
    el.textContent = STYLES;
    document.head.appendChild(el);
    return () => document.head.removeChild(el);
  }, []);
  return null;
}

// ─────────────────────────────────────────────────────────────────────────────
// Main export
// ─────────────────────────────────────────────────────────────────────────────

export default function PortfolioLoader({ onComplete }) {
  const reducedMotion  = useReducedMotion();
  const lp             = useMemo(() => getPerformanceMode(), []);
  const skip           = reducedMotion;

  const timing = skip ? TIMING.reduced : TIMING.normal;
  const interval = lp ? LP_LINE_INTERVAL : LINE_INTERVAL;

  // Which log lines are currently visible
  const [visibleCount, setVisibleCount] = useState(0);

  // "ready" phase — all lines shown, progress 100%
  const [ready, setReady] = useState(false);

  // Exiting — slide the panel away
  const [exiting, setExiting] = useState(false);

  // Lock scroll + run sequence
  useEffect(() => {

    if (skip) {
      // Reduced motion: skip straight to ready → exit
      setVisibleCount(BOOT_LINES.length);
      setReady(true);
      const t = setTimeout(() => {
        setExiting(true);
        
        setTimeout(() => onComplete?.(), 150);
      }, timing.readyDelay);
      return () => { clearTimeout(t); };
    }

    // Stagger each boot line
    const lineTimers = BOOT_LINES.map((_, i) =>
      setTimeout(() => setVisibleCount(i + 1), i * interval + 80)
    );

    // Mark ready after all lines visible
    const readyTimer = setTimeout(() => setReady(true), timing.readyDelay);

    // Begin exit
    const exitTimer = setTimeout(() => {
      setExiting(true);
      
      setTimeout(() => onComplete?.(), reducedMotion ? 120 : 680);
    }, timing.exitDelay);

    return () => {
      lineTimers.forEach(clearTimeout);
      clearTimeout(readyTimer);
      clearTimeout(exitTimer);
      
    };
  }, [timing, interval, reducedMotion, skip, onComplete]);

  const progress = Math.round((visibleCount / BOOT_LINES.length) * 100);
  const lastVisible = visibleCount - 1;

  return (
    <>
      {!lp && !skip && <InjectStyles />}

      <motion.div
        className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#050505]"
        animate={{ y: exiting ? "-100%" : "0%" }}
        transition={{ duration: skip ? 0.18 : 0.72, ease: EASE_IN }}
      >

        {/* ── Static grid bg (no animation, zero cost) ── */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(to right,#ffffff 1px,transparent 1px)," +
              "linear-gradient(to bottom,#ffffff 1px,transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        {/* ── Ambient glow (static, no animation) ── */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 45% at 50% 50%, rgba(255,255,255,0.07) 0%, transparent 100%)",
          }}
        />

        {/* ── Scan sweep (CSS-only, GPU composited) ── */}
        <ScanLine active={!ready && !exiting} lp={lp} />

        {/* ── Corner brackets ── */}
        <Corner pos="tl" />
        <Corner pos="tr" />
        <Corner pos="bl" />
        <Corner pos="br" />

        {/* ── Top-left system label ── */}
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: exiting ? 0 : 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="absolute left-5 top-5 flex items-center gap-2 font-mono text-[0.55rem] uppercase tracking-[0.28em] text-neutral-600 sm:left-8 sm:top-8"
        >
          <span className="h-px w-4 bg-neutral-100/30" />
          SYS · BOOT
        </motion.div>

        {/* ── Top-right timestamp ── */}
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: exiting ? 0 : 1 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="absolute right-5 top-5 font-mono text-[0.55rem] uppercase tracking-[0.22em] text-neutral-700 sm:right-8 sm:top-8"
        >
          {new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "2-digit" })}
        </motion.div>

        {/* ── Main panel ── */}
        <motion.div
          initial={{ opacity: 0, y: lp ? 0 : 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: lp ? 0.2 : 0.55, ease: EASE }}
          className="relative z-10 w-full max-w-sm px-5 sm:max-w-md sm:px-0"
        >

          {/* Terminal window chrome */}
          <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-neutral-950/90 shadow-[0_32px_80px_rgba(0,0,0,0.6)]">

            {/* Window title bar */}
            <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-neutral-700" />
              <span className="h-2.5 w-2.5 rounded-full bg-neutral-700" />
              <span className="h-2.5 w-2.5 rounded-full bg-neutral-700" />
              <span className="ml-2 font-mono text-[0.58rem] uppercase tracking-[0.24em] text-neutral-600">
                portfolio — init
              </span>
              <span className="ml-auto font-mono text-[0.55rem] text-neutral-700">
                v2.0
              </span>
            </div>

            {/* Log lines area */}
            <div className="flex flex-col gap-2 px-5 py-5">
              <AnimatePresence>
                {BOOT_LINES.slice(0, visibleCount).map((line, i) => (
                  <BootLine
                    key={line.id}
                    line={line}
                    index={i}
                    visible={true}
                    isLast={i === lastVisible && !ready}
                    lp={lp}
                  />
                ))}
              </AnimatePresence>
            </div>

            {/* Progress bar */}
            <div className="px-5 pb-2">
              <ProgressBar progress={progress} lp={lp} />
            </div>

            {/* Bottom status bar */}
            <div className="flex items-center justify-between border-t border-white/[0.05] px-5 py-3">
              <motion.span
                className="font-mono text-[0.58rem] uppercase tracking-[0.22em]"
                animate={{
                  color: ready ? "rgb(52,211,153)" : "rgb(163,163,163)",
                }}
                transition={{ duration: 0.4 }}
              >
                {ready ? "● Ready" : "○ Loading"}
              </motion.span>
              <span className="font-mono text-[0.58rem] text-neutral-700">
                {progress}%
              </span>
            </div>
          </div>

          {/* Identity below the terminal */}
          <div className="mt-7">
            <IdentityBlock visible={ready} isExiting={exiting} lp={lp} />
          </div>

        </motion.div>

        {/* ── Bottom-right build label ── */}
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: exiting ? 0 : 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="absolute bottom-5 right-5 font-mono text-[0.52rem] uppercase tracking-[0.2em] text-neutral-700 sm:bottom-8 sm:right-8"
        >
          JayMark.dev · 2026
        </motion.div>

      </motion.div>
    </>
  );
}
