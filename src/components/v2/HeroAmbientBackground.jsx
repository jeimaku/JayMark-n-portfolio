import {
  useEffect,
  useRef,
} from "react";

import {
  useReducedMotion,
} from "motion/react";

import {
  usePageVisibility,
} from "../../hooks/useHeroRuntime";

const PARTICLE_COUNT_DESKTOP = 38;
const PARTICLE_COUNT_MOBILE = 18;
const CONNECTION_DISTANCE = 140;
const MAX_CONNECTIONS = 3;
const MOBILE_FRAME_INTERVAL = 1000 / 30;

const CYAN = "34, 211, 238";
const CYAN_LINE = "103, 232, 249";

function createParticle(width, height) {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.28,
    vy: (Math.random() - 0.5) * 0.22,
    radius: Math.random() * 1.6 + 0.6,
    opacity: Math.random() * 0.45 + 0.15,
  };
}

function drawFrame(context, state) {
  const {
    width,
    height,
    particles,
  } = state;

  context.clearRect(0, 0, width, height);

  for (const particle of particles) {
    particle.x += particle.vx;
    particle.y += particle.vy;

    if (particle.x < 0) {
      particle.x = width;
    }

    if (particle.x > width) {
      particle.x = 0;
    }

    if (particle.y < 0) {
      particle.y = height;
    }

    if (particle.y > height) {
      particle.y = 0;
    }
  }

  for (let index = 0; index < particles.length; index += 1) {
    const source = particles[index];
    let connections = 0;

    for (
      let targetIndex = index + 1;
      targetIndex < particles.length;
      targetIndex += 1
    ) {
      if (connections >= MAX_CONNECTIONS) {
        break;
      }

      const target = particles[targetIndex];
      const xDistance = source.x - target.x;
      const yDistance = source.y - target.y;
      const distance = Math.sqrt(
        xDistance * xDistance +
          yDistance * yDistance
      );

      if (distance < CONNECTION_DISTANCE) {
        const alpha =
          (1 -
            distance / CONNECTION_DISTANCE) *
          0.22;

        context.beginPath();
        context.moveTo(source.x, source.y);
        context.lineTo(target.x, target.y);
        context.strokeStyle = `rgba(${CYAN_LINE}, ${alpha})`;
        context.lineWidth = 0.7;
        context.stroke();
        connections += 1;
      }
    }
  }

  for (const particle of particles) {
    context.beginPath();
    context.arc(
      particle.x,
      particle.y,
      particle.radius,
      0,
      Math.PI * 2
    );
    context.fillStyle = `rgba(${CYAN}, ${particle.opacity})`;
    context.fill();
  }
}

function useAmbientCanvas(canvasRef, active) {
  const activeRef = useRef(active);
  const stateRef = useRef({
    animId: null,
    frameInterval: 0,
    height: 0,
    lastFrame: 0,
    particles: [],
    start: null,
    stop: null,
    width: 0,
  });

  useEffect(() => {
    activeRef.current = active;

    if (active) {
      stateRef.current.start?.();
      return;
    }

    stateRef.current.stop?.();
  }, [active]);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return undefined;
    }

    const context = canvas.getContext("2d");

    if (!context) {
      return undefined;
    }

    const state = stateRef.current;

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      const devicePixelRatio = Math.min(
        window.devicePixelRatio || 1,
        2
      );

      state.width = Math.max(1, bounds.width);
      state.height = Math.max(1, bounds.height);
      state.frameInterval =
        window.innerWidth < 768
          ? MOBILE_FRAME_INTERVAL
          : 0;

      canvas.width = Math.round(
        state.width * devicePixelRatio
      );
      canvas.height = Math.round(
        state.height * devicePixelRatio
      );

      context.setTransform(
        devicePixelRatio,
        0,
        0,
        devicePixelRatio,
        0,
        0
      );
    };

    const seed = () => {
      const particleCount =
        window.innerWidth < 768
          ? PARTICLE_COUNT_MOBILE
          : PARTICLE_COUNT_DESKTOP;

      state.particles = Array.from(
        {
          length: particleCount,
        },
        () =>
          createParticle(
            state.width,
            state.height
          )
      );
    };

    const loop = (timestamp) => {
      state.animId = null;

      if (!activeRef.current) {
        return;
      }

      const shouldDraw =
        state.frameInterval === 0 ||
        timestamp - state.lastFrame >=
          state.frameInterval;

      if (shouldDraw) {
        drawFrame(context, state);
        state.lastFrame = timestamp;
      }

      state.animId = window.requestAnimationFrame(loop);
    };

    state.stop = () => {
      if (state.animId !== null) {
        window.cancelAnimationFrame(state.animId);
        state.animId = null;
      }
    };

    state.start = () => {
      if (
        activeRef.current &&
        state.animId === null
      ) {
        state.animId =
          window.requestAnimationFrame(loop);
      }
    };

    resize();
    seed();

    let resizeTimer = 0;

    const resizeObserver = new ResizeObserver(() => {
      window.clearTimeout(resizeTimer);

      resizeTimer = window.setTimeout(() => {
        resize();
        seed();
      }, 120);
    });

    resizeObserver.observe(canvas);
    state.start();

    return () => {
      state.stop?.();
      state.start = null;
      state.stop = null;
      resizeObserver.disconnect();
      window.clearTimeout(resizeTimer);
    };
  }, [canvasRef]);
}

/*
 * A single fixed environment for the full V2 portfolio. Hero-specific
 * parallax is layered separately in HomeV2 so this canvas never restarts.
 */
export default function HeroAmbientBackground() {
  const canvasRef = useRef(null);
  const pageVisible = usePageVisibility();
  const reducedMotion = Boolean(
    useReducedMotion()
  );

  useAmbientCanvas(
    canvasRef,
    pageVisible && !reducedMotion
  );

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <div className="absolute left-[8%] top-[20%] h-[28rem] w-[28rem] rounded-full bg-cyan-400/[0.045] blur-3xl" />
      <div className="absolute right-[6%] top-[15%] h-[24rem] w-[24rem] rounded-full bg-indigo-400/[0.035] blur-3xl" />
      <div className="absolute bottom-[10%] left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-cyan-300/[0.028] blur-3xl" />

      <div className="absolute inset-0 opacity-[0.025] [background-image:linear-gradient(rgba(148,163,184,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.5)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_40%,black_30%,transparent_100%)]" />

      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full motion-reduce:hidden"
      />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_65%_at_50%_50%,transparent_0%,rgba(2,6,23,0.14)_55%,rgba(2,6,23,0.56)_100%)]" />
    </div>
  );
}
