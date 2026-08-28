import {
  useEffect,
  useMemo,
  useRef,
} from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

import CreativeArtworkItem from "./CreativeArtworkItem";

const POINTER_SPRING = {
  stiffness: 125,
  damping: 24,
  mass: 0.45,
};

function ArtworkSequence({
  artworks,
  duplicate = false,
  label,
  onArtworkOpen,
}) {
  return (
    <ul
      aria-hidden={duplicate || undefined}
      aria-label={duplicate ? undefined : label}
      className="creative-3d-sequence"
    >
      {artworks.map((artwork) => (
        <CreativeArtworkItem
          key={`${artwork.id}-${duplicate ? "duplicate" : "primary"}`}
          artwork={artwork}
          duplicate={duplicate}
          onOpen={onArtworkOpen}
          variant="wall"
        />
      ))}
    </ul>
  );
}

function ArtworkColumn({
  artworkById,
  column,
  onOpen,
  paused,
}) {
  const artworks = column.imageIds
    .map((id) => artworkById.get(id))
    .filter(Boolean);

  if (artworks.length === 0) {
    return null;
  }

  return (
    <div
      data-paused={paused ? "true" : undefined}
      className="creative-3d-column"
      style={{
        "--creative-column-duration": `${column.duration}s`,
        "--creative-column-width": `${column.width}px`,
      }}
    >
      <div
        className={[
          "creative-3d-column-track",
          column.direction === "down"
            ? "creative-3d-column-track--down"
            : "creative-3d-column-track--up",
        ].join(" ")}
      >
        <ArtworkSequence
          artworks={artworks}
          label={column.label}
          onArtworkOpen={onOpen}
        />
        <ArtworkSequence
          artworks={artworks}
          duplicate
          label={column.label}
          onArtworkOpen={onOpen}
        />
      </div>
    </div>
  );
}

function StaticArtworkGallery({
  allowEntranceMotion,
  artworks,
  onOpen,
}) {
  return (
    <motion.div
      initial={
        allowEntranceMotion
          ? { opacity: 0, y: 20 }
          : false
      }
      whileInView={
        allowEntranceMotion
          ? { opacity: 1, y: 0 }
          : undefined
      }
      viewport={{ once: true, amount: 0.08 }}
      transition={{
        duration: 0.66,
        ease: [0.22, 1, 0.36, 1],
      }}
      data-lenis-prevent-horizontal=""
      className="creative-artwork-static-viewport"
    >
      <ul
        aria-label="Selected visual work"
        className="creative-artwork-static-grid"
      >
        {artworks.map((artwork) => (
          <CreativeArtworkItem
            key={artwork.id}
            artwork={artwork}
            onOpen={onOpen}
            variant="static"
          />
        ))}
      </ul>
    </motion.div>
  );
}

function ThreeDArtworkWall({
  allowDepthMotion = true,
  allowEntranceMotion = true,
  allowPointerMotion = true,
  artworks = [],
  isPageVisible = true,
  layout = [],
  onOpen,
  paused = false,
}) {
  const stageRef = useRef(null);
  const isInView = useInView(stageRef, {
    amount: 0.06,
    margin: "160px 0px 160px 0px",
  });
  const artworkById = useMemo(
    () => new Map(
      artworks.map((artwork) => [artwork.id, artwork])
    ),
    [artworks]
  );

  const pointerRotateX = useMotionValue(0);
  const pointerRotateZ = useMotionValue(0);
  const smoothRotateX = useSpring(
    pointerRotateX,
    POINTER_SPRING
  );
  const smoothRotateZ = useSpring(
    pointerRotateZ,
    POINTER_SPRING
  );
  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start end", "end start"],
  });
  const scrollDepth = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [18, 0, -18]
  );

  const shouldPause =
    paused || !isInView || !isPageVisible;
  const canUsePointerMotion =
    allowPointerMotion && !shouldPause;

  useEffect(() => {
    if (canUsePointerMotion) {
      return;
    }

    pointerRotateX.set(0);
    pointerRotateZ.set(0);
  }, [
    canUsePointerMotion,
    pointerRotateX,
    pointerRotateZ,
  ]);

  const resetPointerTilt = () => {
    pointerRotateX.set(0);
    pointerRotateZ.set(0);
  };

  const handlePointerMove = (event) => {
    if (!canUsePointerMotion) {
      return;
    }

    const bounds =
      event.currentTarget.getBoundingClientRect();
    const normalizedX =
      ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
    const normalizedY =
      ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;

    pointerRotateX.set(normalizedY * -1.15);
    pointerRotateZ.set(normalizedX * 0.8);
  };

  return (
    <motion.div
      initial={
        allowEntranceMotion
          ? { opacity: 0, y: 30, scale: 0.985 }
          : false
      }
      whileInView={
        allowEntranceMotion
          ? { opacity: 1, y: 0, scale: 1 }
          : undefined
      }
      viewport={{ once: true, amount: 0.08 }}
      transition={{
        duration: 0.78,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative"
    >
      <div
        ref={stageRef}
        role="region"
        aria-label="Selected visual work in a three-dimensional gallery"
        onPointerMove={handlePointerMove}
        onPointerLeave={resetPointerTilt}
        className="creative-3d-stage"
      >
        <motion.div
          style={{
            rotateX: smoothRotateX,
            rotateZ: smoothRotateZ,
            y:
              allowDepthMotion && isPageVisible && !paused
                ? scrollDepth
                : 0,
          }}
          className="creative-3d-wall-parallax"
        >
          <div className="creative-3d-wall">
            {layout.map((column) => (
              <ArtworkColumn
                key={column.id}
                artworkById={artworkById}
                column={column}
                onOpen={onOpen}
                paused={shouldPause}
              />
            ))}
          </div>
        </motion.div>

        <p className="sr-only">
          Artwork columns loop continuously while this gallery is in view.
          Focus an artwork and press Enter to open the fullscreen viewer.
        </p>
      </div>
    </motion.div>
  );
}

export default function CreativeMarquee({
  allowDepthMotion = true,
  allowEntranceMotion = true,
  allowPointerMotion = true,
  artworks = [],
  isPageVisible = true,
  layout = [],
  onOpen,
  paused = false,
  staticLayout = false,
}) {
  if (staticLayout) {
    return (
      <StaticArtworkGallery
        allowEntranceMotion={allowEntranceMotion}
        artworks={artworks}
        onOpen={onOpen}
      />
    );
  }

  return (
    <ThreeDArtworkWall
      allowDepthMotion={allowDepthMotion}
      allowEntranceMotion={allowEntranceMotion}
      allowPointerMotion={allowPointerMotion}
      artworks={artworks}
      isPageVisible={isPageVisible}
      layout={layout}
      onOpen={onOpen}
      paused={paused}
    />
  );
}
