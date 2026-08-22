import { useEffect, useRef } from "react";

import {
  useElementInView,
  usePageVisibility,
} from "../../hooks/useHeroRuntime";

/* ─────────────────────────────────────────────
   Particle + network line animation on 2D canvas
   No WebGL. No Three.js. Pure canvas 2D API.
───────────────────────────────────────────── */

const PARTICLE_COUNT_DESKTOP = 38;
const PARTICLE_COUNT_MOBILE = 18;
const CONNECTION_DISTANCE = 140;
const MAX_CONNECTIONS = 3;

const CYAN = "34, 211, 238";
const CYAN_LINE = "103, 232, 249";

function createParticle(w, h) {
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.28,
    vy: (Math.random() - 0.5) * 0.22,
    radius: Math.random() * 1.6 + 0.6,
    opacity: Math.random() * 0.45 + 0.15,
  };
}

function drawFrame(ctx, state) {
  const { width, height, particles } = state;
  ctx.clearRect(0, 0, width, height);

  for (const p of particles) {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0) p.x = width;
    if (p.x > width) p.x = 0;
    if (p.y < 0) p.y = height;
    if (p.y > height) p.y = 0;
  }

  for (let i = 0; i < particles.length; i++) {
    const a = particles[i];
    let connections = 0;

    for (let j = i + 1; j < particles.length; j++) {
      if (connections >= MAX_CONNECTIONS) break;

      const b = particles[j];
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < CONNECTION_DISTANCE) {
        const alpha = (1 - dist / CONNECTION_DISTANCE) * 0.22;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = `rgba(${CYAN_LINE}, ${alpha})`;
        ctx.lineWidth = 0.7;
        ctx.stroke();
        connections++;
      }
    }
  }

  for (const p of particles) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${CYAN}, ${p.opacity})`;
    ctx.fill();
  }
}

function useAmbientCanvas(canvasRef, active) {
  const stateRef = useRef({ particles: [], animId: null, width: 0, height: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const state = stateRef.current;

    function resize() {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      state.width = rect.width;
      state.height = rect.height;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    }

    function seed() {
      const isMobile = window.innerWidth < 768;
      const count = isMobile ? PARTICLE_COUNT_MOBILE : PARTICLE_COUNT_DESKTOP;
      state.particles = Array.from({ length: count }, () =>
        createParticle(state.width, state.height)
      );
    }

    function loop() {
      drawFrame(ctx, state);
      state.animId = requestAnimationFrame(loop);
    }

    resize();
    seed();

    let resizeTimer;
    const ro = new ResizeObserver(() => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        resize();
        seed();
      }, 120);
    });
    ro.observe(canvas);

    if (active) loop();

    return () => {
      if (state.animId) {
        cancelAnimationFrame(state.animId);
        state.animId = null;
      }
      ro.disconnect();
      clearTimeout(resizeTimer);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /* Respond to active prop changes after initial mount */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const state = stateRef.current;

    if (active) {
      if (!state.animId) {
        function loop() {
          drawFrame(ctx, state);
          state.animId = requestAnimationFrame(loop);
        }
        loop();
      }
    } else {
      if (state.animId) {
        cancelAnimationFrame(state.animId);
        state.animId = null;
      }
    }
  }, [active, canvasRef]);
}

/* ─────────────────────────────────────────────
   HeroAmbientBackground
   Renders only ambient decoration — no content.
───────────────────────────────────────────── */

export default function HeroAmbientBackground() {
  const canvasRef = useRef(null);
  const wrapperRef = useRef(null);

  const pageVisible = usePageVisibility();

  const { elementRef, isInView } = useElementInView({
    rootMargin: "200px",
    threshold: 0.01,
  });

  const active = isInView && pageVisible;

  useAmbientCanvas(canvasRef, active);

  function setRefs(el) {
    wrapperRef.current = el;
    elementRef.current = el;
  }

  return (
    <div
      ref={setRefs}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Static cyan radial glows */}
      <div className="absolute left-[8%] top-[20%] h-[28rem] w-[28rem] rounded-full bg-cyan-400/[0.055] blur-3xl" />
      <div className="absolute right-[6%] top-[15%] h-[24rem] w-[24rem] rounded-full bg-indigo-400/[0.04] blur-3xl" />
      <div className="absolute bottom-[10%] left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-cyan-300/[0.035] blur-3xl" />

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.032] [background-image:linear-gradient(rgba(148,163,184,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.5)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_40%,black_30%,transparent_100%)]" />

      {/*
       * Particle canvas.
       * Hidden when prefers-reduced-motion is set — static glows remain.
       */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full motion-reduce:hidden"
      />

      {/* Radial vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_65%_at_50%_50%,transparent_0%,rgba(2,6,23,0.18)_55%,rgba(2,6,23,0.72)_100%)]" />

      {/* Bottom fade into next section */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-950 to-transparent" />
    </div>
  );
}

